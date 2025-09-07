import axiosUser from "./axiosConfig";

export const registerUser = async (payload: any) => {
  console.log(payload, "created user payload");
  const res = await axiosUser.post("/create_account", payload);
  console.log(res, "created user payload");
  return res;
};
export const tokenUser = async (payload: any) => {
  console.log(payload, "token user payload");
  const res = await axiosUser.post("oauth/token", payload);
  console.log(res, "token user payload");
  return res;
};
export const loginUser = async (payload: any) => {
  console.log(payload, "login user payload");
  const res = await axiosUser.get("oauth/login", payload);
  console.log(res, "login user payload");
  return res;
};
