import axios from "axios";

const apiUrl = "http://3.34.86.186:8080"; //연동 후 수정 필요
const token = localStorage.getItem("token");

//전체 수혜신청목록 가져오기
export const getApplicationList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/receiver`); //endpoint 수정 필요
    return response.data;
  } catch (error) {
    console.error("Error fetching application list:", error);
    throw error;
  }
};
