import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

const DARK_THEME = { color: "black", desc: "검정검정 테마" };
const LIGHT_THEME = { color: "white", desc: "검정검정 테마" };

// 1. createSlice한다. name, initialState, reducers // Slice 만들기 (createSlice)
// 2. store를 만든다. configureStore
// 3. Provider로 감싸기
// 3. state를 사용할 때는 useSelector를 사용한다.
// 4. 함수를 사용할 땐 usedispatch로 사용.

const themeSlice = createSlice({
  name: "theme",
  initialState: DARK_THEME,
  reducers: {
    change: (previous_state, action) => {
      const new_state = action.payload;
      return new_state;
    },
  },
});

const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
});

function ThemeContextProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

function ThemeText() {
  const color = useSelector((state) => state["theme"].color);
  console.log(" ThemeText 가 리렌더링 !!");
  return <div style={{ color }}>Hello, World !</div>;
}

function ThemeDescription() {
  const desc = useSelector((state) => state["theme"].desc);
  console.log(" ThemeDescription 가 리렌더링 !!");
  return <div>{desc}</div>;
}

// 4. 함수를 사용할 땐 usedispatch로 사용.
function ThemeChange() {
  const dispatch = useDispatch();
  console.log(" ThemeChange 가 리렌더링 !!");
  return (
    <div>
      <button onClick={() => dispatch(themeSlice.actions.change(DARK_THEME))}>
        검정
      </button>
      <button onClick={() => dispatch(themeSlice.actions.change(LIGHT_THEME))}>
        하양
      </button>
    </div>
  );
}

export default function ReduxComponent() {
  return (
    <>
      <h2>ReduxComponent</h2>
      <ThemeContextProvider>
        <ThemeText />
        <ThemeDescription />
        <ThemeChange />
      </ThemeContextProvider>
    </>
  );
}

// immer가 적용되니까 객체가 바뀌어도 다른 값만 바뀌는 것만 바뀜.
