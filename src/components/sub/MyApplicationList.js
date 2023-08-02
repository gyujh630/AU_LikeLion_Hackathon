import { getMyApplicationList } from "../../services/api";
import { useState, useEffect } from "react";

export const MyApplicationList = () => {
  const [myApplicationList, setMyApplicationList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken"); // 로컬스토리지에서 토큰 가져오기
        const list = await getMyApplicationList(token); // 비동기 호출
        setMyApplicationList(list);
      } catch (error) {
        console.error("Error fetching myApplication list:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {myApplicationList.map((application) => (
        <div key={application.id}>{/* ui 구성 */}</div>
      ))}
    </div>
  );
};
