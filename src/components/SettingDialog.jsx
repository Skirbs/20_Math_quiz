import {useContext, useEffect, useImperativeHandle} from "react";
import {useRef} from "react";
import {forwardRef} from "react";
import {createPortal} from "react-dom";
import {MainContext} from "../store/MainContext";

export default forwardRef(function SettingDialog(props, ref) {
  // const dialogRef = useRef()
  const mainCtx = useContext(MainContext);

  const digitsRef = useRef();
  const operationRef = useRef();
  const enabledSettingsRef = useRef();
  const durationRef = useRef();

  useEffect(() => {
    digitsRef.current.value = localStorage.getItem("digitsPerTerm") || 2;
    operationRef.current.value = localStorage.getItem("operation") || "mixed";
    durationRef.current.value = localStorage.getItem("quizDuration") || 10000;
  }, []);

  function saveSettings() {
    localStorage.setItem("digitsPerTerm", digitsRef.current.value);
    localStorage.setItem("operation", operationRef.current.value);
    localStorage.setItem("quizDuration", durationRef.current.value);
    mainCtx.closeSettingHandler();
  }
  return createPortal(
    <dialog className="card setting-dialog" ref={ref}>
      <h2 className="card">Settings</h2>
      <div className="setting-main">
        <section>
          <h3>Question Settings</h3>
          <div className="setting-option">
            <label htmlFor="digits-per-term">Digits Per Term</label>
            {/* <input type="number" min={1} max={10} id="digits-per-term" ref={digitsRef} /> */}
            <select id="digits-per-term" ref={digitsRef}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
          </div>
          <div className="setting-option">
            <label htmlFor="operation">Operation</label>
            <select id="operation" className="w-[75px]" ref={operationRef}>
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="x">×</option>
              <option value="÷">÷</option>
              <option value="mixed">mixed</option>
            </select>
          </div>
        </section>
        <section>
          <h3>Progress Bar Settings</h3>

          <div className="setting-option option-checkbox">
            <label htmlFor="enable-progress-bar">Enabled</label>
            <label className="relative h-full m-auto overflow-hidden border-2 rounded-sm cursor-pointer w-7 border-main-orange-vibrant">
              <input
                type="checkbox"
                id="enable-progress-bar"
                className="absolute inset-0 appearance-none [&:checked+span]:bg-main-orange-vibrant"
                ref={enabledSettingsRef}
              />
              <span className="absolute inset-0 m-[1px] rounded-sm transition-all"></span>
            </label>
          </div>

          <div className="setting-option">
            <label htmlFor="speed-progress-bar">Duration</label>
            <select id="speed-progress-bar" ref={durationRef}>
              <option value="750">0.75 second</option>
              <option value="1000">1 second</option>
              <option value="2000">2 seconds</option>
              <option value="3000">3 seconds</option>
              <option value="4000">4 seconds</option>
              <option value="5000">5 seconds</option>
              <option value="8000">8 seconds</option>
              <option value="10000">10 seconds</option>
              <option value="15000">15 seconds</option>
              <option value="30000">30 seconds</option>
              <option value="60000">60 seconds</option>
              <option value="120000">120 seconds</option>
              <option value="180000">180 seconds</option>
              <option value="240000">240 seconds</option>
              <option value="320000">320 seconds</option>
            </select>
          </div>
        </section>
      </div>
      <div className="setting-action">
        <h3>(Settings will be applied on the next attempt)</h3>
        <button
          className="border-2 bouncy-button drop-shadow-md border-main-orange-vibrant"
          onClick={mainCtx.closeSettingHandler}>
          Cancel
        </button>
        <button className="card bouncy-button bg-main-orange-vibrant" onClick={saveSettings}>
          Confirm
        </button>
      </div>
      <button className="close_dialog bouncy-button" onClick={mainCtx.closeSettingHandler}>
        <span className="material-symbols-outlined">close</span>
      </button>
    </dialog>,
    document.querySelector("#dialog")
  );
});
