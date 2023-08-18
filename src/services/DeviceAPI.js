import axios from "axios";
import SERVER_URL from "../constants/serverUrl";

export const fetchDevices = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${SERVER_URL}/device`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching device data:", error);
    return [];
  }
};

export const deleteDevice = async (deviceId) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${SERVER_URL}/device/${deviceId}/delete`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      console.log("기기 삭제 완료");
    } else {
      console.error("기기 삭제 실패");
    }
  } catch (error) {
    console.error("Error deleting device:", error);
  }
};
