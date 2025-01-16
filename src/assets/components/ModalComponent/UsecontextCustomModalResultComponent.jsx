import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  open: (content) => {},
  close: () => {},
});

const DEFAULT_CONTENT = <></>;

function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    isOpen: false,
    content: DEFAULT_CONTENT,
  });
  // const [content, setContent] = useState(DEFAULT_CONTENT)

  function open(content) {
    setModal({ isOpen: true, content });
    // setContent(content)
  }
  function close() {
    setModal({ isOpen: false, content: DEFAULT_CONTENT });
    // setContent(DEFAULT_CONTENT)
  }
  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}
      <dialog open={modal.isOpen}>
        {modal.content}
        <button onClick={(e) => close()}>닫기</button>
      </dialog>
    </ModalContext.Provider>
  );
}

function ModalButton() {
  const { open, close } = useContext(ModalContext);
  return (
    <>
      <button onClick={(e) => open(<h3>Custom, World!</h3>)}>
        Custom 열기
      </button>
      <button onClick={(e) => open(<h3>Hello, World!</h3>)}>Hello 열기</button>
      <button onClick={(e) => open(<h3>Aaron, World!</h3>)}>Aaron 열기</button>
      <button onClick={(e) => close()}>닫기</button>
    </>
  );
}

function CustomModalResult() {
  return (
    <>
      <ModalProvider>
        <div>Hello</div>
        <div>World</div>
        <ModalButton />
      </ModalProvider>
    </>
  );
}

export default CustomModalResult;
