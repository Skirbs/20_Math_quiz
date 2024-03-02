import {createContext, useRef} from "react";
import SettingDialog from "../components/SettingDialog";

export const MainContext = createContext({
  openSettingHandler: () => {},
  closeSettingHandler: () => {},
});

export default function MainContextComponent({children}) {
  const settingRef = useRef();

  function openSettingHandler() {
    settingRef.current.showModal();
  }
  function closeSettingHandler() {
    settingRef.current.close();
  }

  const contextData = {
    openSettingHandler,
    closeSettingHandler,
  };

  return (
    <MainContext.Provider value={contextData}>
      <SettingDialog ref={settingRef} />
      {children}
    </MainContext.Provider>
  );
}
