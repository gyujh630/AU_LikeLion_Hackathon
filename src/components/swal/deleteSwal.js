import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const swalAlert = withReactContent(Swal);

export const deleteAlert = (applyId) => {
  swalAlert
    .fire({
      title: "신청을 취소하시겠습니까?",
      text: "취소 시 복구할 수 없습니다..",
      icon: "warning",
      confirmButtonColor: "var(--color-blue)",
      cancelButtonColor: "gray",
      iconColor: "var(--color-blue)",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      focusCancel: true,
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = { status: 204 };
          if (response.status === 204 || response.status === 200) {
            swalAlert.fire({
              title: "취소 완료",
              text: "취소가 완료되었습니다.",
              icon: "success",
              confirmButtonColor: "var(--color-blue)",
              cancelButtonColor: "gray",
              iconColor: "var(--color-blue)",
            });
          } else {
            swalAlert.fire({
              title: "실패",
              text: "취소를 실패하였습니다.",
              icon: "error",
              confirmButtonColor: "var(--color-blue)",
              cancelButtonColor: "gray",
              iconColor: "var(--color-blue)",
            });
          }
        } catch (error) {
          console.error("Error deleting user:", error);
          swalAlert.fire({
            title: "에러",
            text: "취소 중 에러가 발생하였습니다.",
            icon: "error",
            confirmButtonColor: "var(--color-blue)",
            cancelButtonColor: "gray",
            iconColor: "var(--color-blue)",
          });
        }
      }
    });
};
