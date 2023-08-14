import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// 라우팅 시 스크롤 위로 올리기

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
