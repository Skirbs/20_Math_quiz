import {useContext} from "react";
import {MainContext} from "../store/MainContext";

export default function SettingButton() {
  const mainCtx = useContext(MainContext);
  return (
    <button className="setting-button" onClick={mainCtx.openSettingHandler}>
      <span className="material-symbols-outlined">settings</span>
    </button>
  );
}
