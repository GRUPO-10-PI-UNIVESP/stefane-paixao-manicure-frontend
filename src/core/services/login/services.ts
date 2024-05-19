import axiosInstance from "@/core/configs/axios";
import { ILogin, IValidateLoginResponse } from "./types";

const URL_CONTROLLER = `/validateLogin`;
const routes = {
  async validateLogin(params: ILogin) {
    const result = await axiosInstance.post<IValidateLoginResponse>(
      `${URL_CONTROLLER}`,
      {
        ...params,
      }
    );
    return result?.data;
  },
};
export default routes;
