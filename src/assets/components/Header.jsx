import { Link, useLocation } from "react-router-dom";
import UseContextChangeThemeComponent from "../components/ChangeThemeComponent/UseContextChangeThemeComponent";

export default function Header() {
  const { pathname } = useLocation();
  const isChangeModePage = pathname === "/ChangeThemePage";
  return (
    <>
      <header>
        <h1>
          <Link to="/">rowanna react practice</Link>
        </h1>

        {!isChangeModePage ? (
          <div id="toggleMode">
            <UseContextChangeThemeComponent></UseContextChangeThemeComponent>
          </div>
        ) : (
          <></>
        )}
      </header>
    </>
  );
}
