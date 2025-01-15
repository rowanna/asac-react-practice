import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext({
  // 디폴트값
  theme: "light",
  setTheme: () => {},
});

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

function ChangeThemeBtn({ children, type }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const onClick = () => {
    const isClickedCurrentMode =
      localStorage.getItem("theme") === type &&
      window.matchMedia(`(prefers-color-scheme: ${type})`).matches;
    if (isClickedCurrentMode) return;
    setTheme((prev) => type);
    localStorage.setItem("theme", type);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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
