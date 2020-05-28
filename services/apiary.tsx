import Axios, { AxiosResponse, AxiosError } from "axios";

export const axios = Axios.create({
  baseURL: "https://polls.apiblueprint.org",
  responseType: "json",
  timeout: 5000,
});

// class Api {
//   async get(url: string, params?: any) {
//     try {
//       const response = await axios.get(url, {
//         params,
//       });
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// export default new Api();
