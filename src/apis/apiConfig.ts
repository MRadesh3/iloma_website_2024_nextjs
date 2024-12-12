import axios, { AxiosRequestConfig, AxiosResponse} from "axios";
import { API_URL, SECRET_KEY } from "../config/constants"
import { getAccessToken } from "../utils/utils"

type ApiResponse <T = any> = Promise<AxiosResponse<T>>;

const postMethod = <T = any> (url : string , data : any ) : ApiResponse<T>  => {
  const axiosConfig : AxiosRequestConfig = {
    url: `${API_URL}${url}`,
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-secret-key": SECRET_KEY,
      Authorization: `Bearer ${getAccessToken()}`,
    },
    data,
  };
  return axios(axiosConfig);
};

const getMethod = <T = any>(url : string, data : any) : ApiResponse<T> => {
  const axiosConfig : AxiosRequestConfig = {
    url: `${API_URL}${url}`,
    method: "get",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-secret-key": SECRET_KEY,
        Authorization: `Bearer ${getAccessToken()}`,
    },
    params: data,
  };

  return axios(axiosConfig);
};

const postFormDataMethod = <T = any>(url : string , data : FormData ) : ApiResponse<T> => {
  const axiosConfig : AxiosRequestConfig = {
    url: `${API_URL}${url}`,
    method: "post",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      "x-secret-key": SECRET_KEY,
      Authorization: `Bearer ${getAccessToken()}`,
    },
    data,
  };

  return axios(axiosConfig);
};

// response blob

const getFileResponse = (url : string ) : ApiResponse<Blob> => {
  const axiosConfig : AxiosRequestConfig = {
    url,
    method: "get",
    responseType: "blob",
  };

  return axios(axiosConfig);
};

export { postMethod, getMethod, postFormDataMethod, getFileResponse };
