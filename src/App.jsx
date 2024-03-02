import {useEffect, useRef} from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import SettingDialog from "./components/SettingDialog";

function App() {
  const settingRef = useRef();

  useEffect(() => {
    settingRef.current.showModal();
  }, [settingRef]);
  return (
    <div className="flex flex-col justify-start min-h-screen">
      <main>
        <Header />
        <Quiz />
        <SettingDialog ref={settingRef} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
