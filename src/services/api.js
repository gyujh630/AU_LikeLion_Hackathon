import axios from "axios";

const apiUrl = ""; //연동 후 수정 필요

//전체 수혜신청목록 가져오기
export const getApplicationList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/`); //enpoint 수정 필요
    return response.data;
  } catch (error) {
    console.error("Error fetching application list:", error);
    throw error;
  }
};

//user token으로 user의 수혜신청목록 가져오기
export const getMyApplicationList = async (token) => {
  try {
    const response = await axios.get(`${apiUrl}/myApplications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching myApplication list:", error);
    throw error;
  }
};
