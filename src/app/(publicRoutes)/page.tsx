"use client";
import { useRouter } from "next/navigation";
import { useValidateLogin } from "@/core/services/login/hooks";
import { ILogin } from "@/core/services/login/types";
import { TextInput, PasswordInput, Button, Heading } from "@stick-ui/lib";
import { SubmitHandler, useForm } from "react-hook-form";
export default function Login() {
  const router = useRouter();
  const validateLogin = useValidateLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ILogin>();
  const onSubmit: SubmitHandler<ILogin> = async (data) => {
    const res = await validateLogin.mutateAsync(data);
    console.log({ res });
    if (res?.login) return router.push("/dashboard");

    setError("usuario", { message: res?.mensagem });
  };

  return (
    <form className="flex flex-col gap-y-11" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-3">
        <Heading level="h5" weight="bold">
          Login
        </Heading>
        <TextInput
          grow
          label={"e-mail"}
          placeholder="Digite seu e-mail"
          {...register("usuario")}
          error={{ description: errors?.usuario?.message || "" }}
        />
        <PasswordInput grow label={"senha"} {...register("senha")} />
      </div>

      <Button
        size="xs"
        grow
        label={"entrar"}
        disabled={validateLogin.isLoading}
      />
    </form>
  );
}
