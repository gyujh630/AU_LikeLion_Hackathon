import axios from "axios";

const apiUrl = "http://3.34.86.186:8080";
const token = localStorage.getItem("token");

//user token으로 user의 수혜신청목록 가져오기
export const getMyApplicationList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/apply`, {
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

//user의 기부목록 가져오기
export const getDonationList = async () => {
  try {
    const response = await axios.get(`${apiUrl}/donatelist`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user Donation list:", error);
    throw error;
  }
};

// 사용자 정보 가져오기 - request url은 /users, get 요청, Authorization 헤더 필요
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${apiUrl}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

// 유저 정보 수정
export const updateUserInfo = async () => {
  try {
    const response = await axios.patch(`${apiUrl}/users/update`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

//유저 정보 삭제
export const deleteUser = async () => {
  try {
    const response = await axios.delete(`${apiUrl}/users/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

//수혜신청
export const createApplication = async (dataSet) => {
  try {
    const response = await axios.post(`${apiUrl}/apply/post`, dataSet, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      console.error(
        "Create application request failed with status:",
        response.status
      );
      throw new Error("Create application request failed");
    }
  } catch (error) {
    console.error("Error fetching create application:", error);
    throw error;
  }
};

//수혜신청 취소
export const cancelApplication = async () => {
  try {
    const response = await axios.delete(`${apiUrl}/:applyId`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting application:", error);
    throw error;
  }
};

//수혜신청 수정
export const updateApplication = async (dataSet) => {
  try {
    const response = await axios.patch(`${apiUrl}/:applyId`, dataSet, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error update application:", error);
    throw error;
  }
};
