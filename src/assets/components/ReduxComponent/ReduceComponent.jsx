import { createContext, useContext, useReducer, useState } from "react";

const DARK_THEME = { color: "red", desc: "검정검정테마" };
const WHITE_THEME = { color: "white", desc: "하양하양테마" };
const ThemeContext = createContext({
  theme: DARK_THEME,
  setTheme: (state) => {},
});

const reducer = (prev, action) => {
  const new_state = action.payload;
  return new_state;
};

const ThemeContextProvider = ({ children }) => {
  const [theme, dispatch] = useReducer(reducer, DARK_THEME);
  return (
    <ThemeContext.Provider value={{ theme, dispatch }}>
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
  const { dispatch } = useContext(ThemeContext);
  return (
    <div>
      <button onClick={() => dispatch({ type: "black", payload: DARK_THEME })}>
        다크테마
      </button>
      <button onClick={() => dispatch({ type: "white", payload: WHITE_THEME })}>
        라이트테마
      </button>
    </div>
  );
};

export default function Reducecomponent() {
  return (
    <>
      <h2>ReduceCompoenent</h2>
      <ThemeContextProvider>
        <ThemeText />
        <ThemeDescription />
        <ThemeChange />
      </ThemeContextProvider>
    </>
  );
}
