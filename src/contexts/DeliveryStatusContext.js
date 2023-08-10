import React, { createContext, useContext, useState } from "react";

// Context 생성
const DeliveryStatusContext = createContext();

// Provider 생성
export const DeliveryStatusProvider = ({ children }) => {
  const [status, setStatus] = useState(2); // 초기 상태값 설정

  return (
    <DeliveryStatusContext.Provider value={{ status, setStatus }}>
      {children}
    </DeliveryStatusContext.Provider>
  );
};

// 커스텀 Hook 생성
export const useDeliveryStatus = () => {
  return useContext(DeliveryStatusContext);
};
