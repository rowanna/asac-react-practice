import { createContext, useContext, useState } from "react";

const ModalContext = createContext({
  show: () => {},
  close: () => {},
  title: "",
});

function ModalContextProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  function show() {
    setOpen(true);
  }

  function close() {
    setOpen(false);
  }

  return (
    <ModalContext.Provider value={{ show, close, title, setTitle }}>
      {children}
      <dialog open={open}>
        <h3>{title}</h3>
        <button onClick={(e) => close()}>닫기</button>
      </dialog>
    </ModalContext.Provider>
  );
}

function ModalButton({ children, title }) {
  const { show, setTitle } = useContext(ModalContext);
  return (
    <button
      onClick={(e) => {
        show();
        setTitle(title);
      }}
    >
      {children}
    </button>
  );
}

function CustomModalResult() {
  return (
    <ModalContextProvider>
      <ModalButton title="모달1">모달1열기</ModalButton>
      <ModalButton title="모달2">모달2열기</ModalButton>
      <ModalButton title="모달3">모달3열기</ModalButton>
    </ModalContextProvider>
  );
}

export default CustomModalResult;
