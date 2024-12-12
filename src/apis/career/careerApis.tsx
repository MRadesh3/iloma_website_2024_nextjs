import { postMethod } from "../apiConfig";

interface CareerData {
  page?: number;
  limit?: number;
  search?: string;
}

export const getCareersApi = (data: CareerData): Promise<any> => {
  return postMethod("/career/get-all-careers", data);
};
