//HomeAPI.js
import axios from "axios";

const apiUrl = "http://3.34.86.186:8080";
const token = localStorage.getItem("token");

//전체 수혜신청목록 가져오기
export const getDeviceCount = async () => {
  try {
    const response = await axios.get(`${apiUrl}/main`);
    return response.data;
  } catch (error) {
    console.error("Error get device count list:", error);
    throw error;
  }
};
