import React, { createContext, useContext, useState } from "react";

// Context 생성
const DeliveryStatusContext = createContext();

// Provider 생성
export const DeliveryStatusProvider = ({ children }) => {
  const [status, setStatus] = useState("");

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
