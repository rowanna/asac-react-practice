import { useContext, createContext, useReducer } from "react";
// import { produce } from "immer";
import { createPortal } from "react-dom";

const ModalContext = createContext({
  open: (content) => {},
  close: () => {},
});

// 1. 모달은 일반적으로 제목과 내용이라는 템플릿을 갖는다.
function Modal({ type, open, title, content, onClose }) {
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
      <button onClick={onClose}>닫기</button>
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
      };
    case "WARN_TIMEOUT":
      return {
        isOpen: true,
        type: "WARN",
        title: "타임아웃 발생",
        content: "타임아웃이 발생했으니 다시 실행해주시기 바랍니다",
      };
    case "WARN":
      return {
        isOpen: true,
        type: "WARN",
        title: action.title,
        content: action.content,
      };
    case "CLOSED":
    default:
      return CLOSED;
  }
}

function ModalProvider({ children }) {
  const [modal, dispatch] = useReducer(reducer, CLOSED);

  function open({ type, title, content }) {
    dispatch({ type, title, content });
  }
  function close() {
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
          />,
          document.body
        )}
    </ModalContext.Provider>
  );
}

function ModalButton({ type, title = "", content = "", children }) {
  const { open, close } = useContext(ModalContext);
  return (
    <>
      <button onClick={(e) => open({ type, title, content })}>
        {children}
      </button>
    </>
  );
}

const ModalUseReducerComponent = () => {
  return (
    <>
      <ModalProvider>
        <ModalButton type={"WARN_TIMEOUT"}>타임아웃 경고</ModalButton>
        <ModalButton type={"WARN_TYPEERROR"}>타입에러 경고</ModalButton>
      </ModalProvider>
    </>
  );
};

export default ModalUseReducerComponent;
