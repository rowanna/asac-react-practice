import { createContext, useContext, useState } from "react";

const DARK_THEME = { color: "red", desc: "검정검정테마" };
const WHITE_THEME = { color: "white", desc: "하양하양테마" };
const ThemeContext = createContext({
  theme: DARK_THEME,
  setTheme: (state) => {},
});

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(DARK_THEME);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeText = () => {
  const { theme } = useContext(ThemeContext);
  return <div style={{ color: theme.color }}>Hello,World!</div>;
};

const ThemeDescription = () => {
  return (
    <div>
      <ThemeContext.Consumer>
        {({ theme }) => <div>{theme.desc}</div>}
      </ThemeContext.Consumer>
    </div>
  );
};

const ThemeChange = () => {
  const { setTheme } = useContext(ThemeContext);
  return (
    <div>
      <button onClick={() => setTheme(DARK_THEME)}>다크테마</button>
      <button onClick={() => setTheme(WHITE_THEME)}>라이트테마</button>
    </div>
  );
};

export default function StateComponent() {
  return (
    <>
      <ThemeContextProvider>
        <ThemeText />
        <ThemeDescription />
        <ThemeChange />
      </ThemeContextProvider>
    </>
  );
}
