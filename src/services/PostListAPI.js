import axios from "axios";

const apiUrl = ""; //연동 후 수정 필요

//전체 수혜신청목록 가져오기
export const getApplicationList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/`); //endpoint 수정 필요
    return response.data;
  } catch (error) {
    console.error("Error fetching application list:", error);
    throw error;
  }
};

//수혜신청
export const createApplication = async (data) => {
  try {
    const response = await axios.post(`${apiUrl}/apply/post`, data, {
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching create application:", error);
    throw error;
  }
};
