import {
  useRef,
  useState,
  useEffect,
  forwardRef,
  memo,
  useContext,
  createContext,
  useReducer,
} from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext({
  open: (content) => {},
  close: () => {},
});

// 1. 모달은 일반적으로 제목과 내용이라는 템플릿을 갖는다.
function Modal({ type, open, title, content, onClose, closeButton }) {
  function color(type) {
    switch (type.toUpperCase()) {
      case "WARN":
        return "orange";
      case "ERROR":
        return "red";
      case "SUCCESS":
        return "green";
      case "INFO":
      default:
        return "black";
    }
  }

  return (
    // 2. 모달은 일반적으로 종류가 4가지 정도된다 (INFO, WARN, ERROR, SUCCESS)
    <dialog open={open} style={{ borderColor: color(type) }}>
      <h3>{title}</h3>
      <div>{content}</div>
      <button onClick={onClose}>{closeButton ?? "닫기"}</button>
    </dialog>
  );
}

const CLOSED = {
  type: "INFO",
  isOpen: false,
  title: "",
  content: "",
};

/**
 *
 * @param {*} previous
 * @param {*} action
 * @returns
 */
function reducer(previous, action) {
  switch (action.type.toUpperCase()) {
    case "WARN_TYPEERROR":
      return {
        isOpen: true,
        type: "WARN",
        title: "입력값의 타입이 다릅니다",
        content: "다시 입력하여 제출해주시기 바랍니다",
        onClose: action.onClose,
        closeButton: action.closeButton,
      };
    case "WARN_TIMEOUT":
      return {
        isOpen: true,
        type: "WARN",
        title: "타임아웃 발생",
        content: "타임아웃이 발생했으니 다시 실행해주시기 바랍니다",
        onClose: action.onClose,
        closeButton: action.closeButton,
      };
    case "WARN":
      return {
        isOpen: true,
        type: "WARN",
        title: action.title,
        content: action.content,
        onClose: action.onClose,
        closeButton: action.closeButton,
      };
    case "CLOSED":
    default:
      return CLOSED;
  }
}

function ModalProvider({ children }) {
  // const [modal, setModal] = useState(DEFAULT_MODAL)
  const [modal, dispatch] = useReducer(reducer, CLOSED);

  function open({ type, title, content, onClose, closeButton }) {
    dispatch({ type, title, content, onClose, closeButton });
  }
  function close() {
    modal.onClose && modal.onClose();
    dispatch({ type: "CLOSED" });
  }
  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      {modal.isOpen &&
        // Non-modal Dialog
        createPortal(
          <Modal
            type={modal.type}
            open={modal.isOpen}
            title={modal.title}
            content={modal.content}
            onClose={close}
            closeButton={modal.closeButton}
          />,
          document.body
        )}
    </ModalContext.Provider>
  );
}

function ModalButton({
  type,
  title = "",
  content = "",
  children,
  onClose = undefined,
  closeButton = undefined,
}) {
  const { open, close } = useContext(ModalContext);
  return (
    <>
      <button
        onClick={(e) => open({ type, title, content, onClose, closeButton })}
      >
        {children}
      </button>
    </>
  );
}

function handleRegistrationSuccess() {
  console.log("회원가입 축하 -> 메인 페이지로 이동시킴");
}

function handleUserUpdateSuccess() {
  console.log("회원정보 수정 성공 -> 회원 전체 리스트 API 조회");
}

function CustomCloseEventModalComponent() {
  return (
    <>
      <ModalProvider>
        <ModalButton
          type={"WARN_TIMEOUT"}
          onClose={handleUserUpdateSuccess}
          closeButton={"전체회원 다시 불러오기"}
        >
          타임아웃 경고
        </ModalButton>
        <ModalButton
          type={"WARN_TYPEERROR"}
          onClose={handleRegistrationSuccess}
          closeButton={"메인페이지로 이동"}
        >
          타입에러 경고
        </ModalButton>
      </ModalProvider>
    </>
  );
}

export default CustomCloseEventModalComponent;
