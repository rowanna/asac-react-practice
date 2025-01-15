import { useState, createContext, useContext } from "react";

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

  const value = useContext(CreatedContext);

  return (
    <div className="component-box" style={{ padding: 10 }}>
      Third Component : {value.count}
      <LC />
    </div>
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

function ButtonComponent({ onClick }) {
  console.log("- B. Button Component");
  return (
    <div className="component-box" style={{ padding: 10 }}>
      Button Component
      <div>
        <button onClick={onClick}>증가</button>
      </div>
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

// 1. contextAPI 사용할거라고 선언.
const CreatedContext = createContext();

function UseContextResultComponent() {
  const [count, setCount] = useState(0);
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
      <CreatedContext.Provider value={{ count, setCount }}>
        <FC />
      </CreatedContext.Provider>
      <ButtonComponent onClick={() => setCount((prev) => prev + 1)} />
      <NonContextComponent count={count} />
    </div>
  );
}

export default UseContextResultComponent;
