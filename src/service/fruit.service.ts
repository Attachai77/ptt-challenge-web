import axios from "axios";
import config from "../config";

const api = axios.create({
  baseURL: config.BACKEND_URL,
  headers: {

  }
});

export const getFruitsService = async (search: string = '') => {
  try {
    const query = `?name=${search}`
    const res = await api.get(`/api/v1/fruits${query}`)
    return res?.data?.data ?? []
  } catch (error) {
    throw error
  }
};

export const createFruitService = async (data: any) => {
  try {
    
    let formData = new FormData();
    formData.append("image", data.image);
    formData.append("name", data.name);

    const res = await api.post("/api/v1/fruits", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return res
  } catch (error) {
    throw error
  }
}
