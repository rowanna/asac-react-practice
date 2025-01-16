import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  // 디폴트값
  theme: "light",
  setTheme: () => {},
});

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const mql = window.matchMedia("(prefers-color-scheme: dark)");

  mql.addEventListener("change", (e) => {
    setTheme((prev) => (e.matches ? "dark" : "light"));
  });

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

function ChangeThemeBtn({ children, type }) {
  const { setTheme } = useContext(ThemeContext);

  const onClick = () => {
    const isClickedCurrentMode =
      localStorage.getItem("theme") === type &&
      window.matchMedia(`(prefers-color-scheme: ${type})`).matches;
    if (isClickedCurrentMode) return;
    setTheme((prev) => type);
    localStorage.setItem("theme", type);
  };

  return (
    <>
      <button onClick={onClick}>{children}</button>
    </>
  );
}

function UseContextChangeThemeComponent() {
  return (
    <>
      <ThemeContextProvider>
        <ChangeThemeBtn type="light">라이트모드로 바꾸기</ChangeThemeBtn>
        <ChangeThemeBtn type="dark">다크모드로 바꾸기</ChangeThemeBtn>
      </ThemeContextProvider>
    </>
  );
}

export default UseContextChangeThemeComponent;
