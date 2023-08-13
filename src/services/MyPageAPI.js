import axios from "axios";

const apiUrl = ""; //연동 후 수정 필요

//user token으로 user의 수혜신청목록 가져오기 - endpoint 수정 필요
export const getMyApplicationList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/myApplications`, {
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching myApplication list:", error);
    throw error;
  }
};

//user의 기부목록 가져오기 - endpoint 수정 필요
export const getDonationList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/`, {
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user Donation list:", error);
    throw error;
  }
};
