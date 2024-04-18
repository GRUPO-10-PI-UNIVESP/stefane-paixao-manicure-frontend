"use client";
import { TextInput, PasswordInput, Button, Heading } from "@stick-ui/lib";
export default function Login() {
  return (
    <div className="flex flex-col gap-y-11">
      <div className="flex flex-col gap-y-3">
        <Heading level='h5' weight='bold' >Login</Heading>
        <TextInput grow label={"e-mail"} />
        <PasswordInput grow label={"senha"} />
      </div>

      <Button size="xs" grow label={"entrar"} />
    </div>
  );
}
