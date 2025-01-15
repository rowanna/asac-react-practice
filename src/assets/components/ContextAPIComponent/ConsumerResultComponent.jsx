import { useState, createContext } from "react";

function LC() {
  console.log("- A.4. Fourth Component");
  return (
    <div className="component-box" style={{ padding: 10 }}>
      Fourth Component
    </div>
  );
}

function TC() {
  console.log("- A.3. Third Component");

  return (
    // 3. 쓸거라고 Consumer이용해서 쓴다.
    <CreatedContext.Consumer>
      {({ count }) => (
        <div className="component-box" style={{ padding: 10 }}>
          Third Component : {count}
          <LC />
        </div>
      )}
    </CreatedContext.Consumer>
  );
}

function SC() {
  console.log("- A.2. Second Component");
  return (
    <div className="component-box" style={{ padding: 10 }}>
      Second Component
      <TC />
    </div>
  );
}

function FC() {
  console.log("- A.1. First Component");
  return (
    <div className="component-box" style={{ padding: 10 }}>
      First Component
      <SC />
    </div>
  );
}

function ButtonComponent() {
  console.log("- B. Button Component");
  // 3. 쓸거라고 Consumer이용해서 쓴다.
  return (
    <div className="component-box" style={{ padding: 10 }}>
      Button Component
      <CreatedContext.Consumer>
        {({ setCount }) => (
          <div>
            <button onClick={() => setCount((prev) => prev + 1)}>증가</button>
          </div>
        )}
      </CreatedContext.Consumer>
    </div>
  );
}

function NonContextComponent({ count }) {
  console.log("- C. Non-Context Component");
  return (
    <div className="component-box" style={{ padding: 10 }}>
      Non-Context Component : {count}
    </div>
  );
}

// 1. context를 쓸거라고 선언.
const CreatedContext = createContext({
  count: -10,
  setCount: (state) => {},
});

// 2. provider 컴포넌트 만들기
function CountContextProvider({ children }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <CreatedContext.Provider value={{ count, setCount }}>
        {children}
      </CreatedContext.Provider>
    </>
  );
}

function ConsumerResultComponent() {
  return (
    <div
      className="section-box"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        padding: 10,
      }}
    >
      <CountContextProvider>
        <FC />
        <ButtonComponent />
      </CountContextProvider>

      <NonContextComponent />
    </div>
  );
}

export default ConsumerResultComponent;
