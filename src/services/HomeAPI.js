import axios from "axios";

const apiUrl = ""; //연동 후 수정 필요

//전체 수혜신청목록 가져오기
export const getDeviceCount = async () => {
  try {
    const response = await axios.get(`${apiUrl}/main`); //endpoint 수정 필요
    return response.data;
  } catch (error) {
    console.error("Error fetching application list:", error);
    throw error;
  }
};
