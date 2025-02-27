import MiddlewareComponent from "../components/ReduxComponent/middlewareComponent";
import Reducecomponent from "../components/ReduxComponent/ReduceComponent";
import ReduxComponent from "../components/ReduxComponent/ReduxComponent";
import StateComponent from "../components/ReduxComponent/StateComponent";

export default function ReduxPage() {
  return (
    <>
      <StateComponent></StateComponent>
      <Reducecomponent></Reducecomponent>
      <ReduxComponent></ReduxComponent>
      <MiddlewareComponent></MiddlewareComponent>
    </>
  );
}
