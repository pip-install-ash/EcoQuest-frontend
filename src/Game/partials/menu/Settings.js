import { addButton, addCheckButton, addSlider, addText } from "../common";
import { organizeDialog, showDialog } from "./base";

/**
 * Shows a <Setting> dialog.
 *
 * @function createSettingDlg
 * @param {scene, deleteAcount}
 * @returns {void}
 */
const createSettingDlg = (scene, deleteAcount, userData) => {
  const dialogSetting = organizeDialog(scene, "SettingDialog", 672, 793);

  const notificationCheckBox = addCheckButton(
    scene,
    "RoundCheckOn",
    "RoundCheckOff",
    1,
    250,
    0,
    (val) => {
      console.log(val, "this.notificationCheckBox");
    }
  );

  const soundCheckBox = addCheckButton(
    scene,
    "RoundCheckOn",
    "RoundCheckOff",
    !scene.allSoundEffectMute,
    250,
    75,
    (val) => {
      // scene.sound.mute = val;
      scene.allSoundEffectMute = val;
    }
  );

  const guideCheckBox = addCheckButton(
    scene,
    "RoundCheckOn",
    "RoundCheckOff",
    1,
    250,
    150,
    (val) => {
      // console.log(val, "this.showTutorial", this.showTutorial);
    }
  );

  const deleteAccountButton = addButton(
    scene,
    "DeleteAccountButton",
    0,
    350,
    () => {
      deleteAcount();
    }
  );

  // const changeButton = addButton(scene, "ChangeButton", 210, -90, () => {
  //   console.log("Change Button Clicked", userNameText.text);
  // });

  const emailText = addText(
    scene,
    userData?.email || "",
    -285,
    -215,
    "Kreon",
    "20px",
    "bold",
    "#000",
    0,
    0.5
  );

  const userNameText = addText(
    scene,
    userData?.userName || "",
    -285,
    -100,
    "Kreon",
    "20px",
    "bold",
    "#000",
    0,
    0.5
  );
  // const inputText = scene.add.rexInputText(-105, -170, 355, 56, {
  //   type: 'password',
  //   fontSize: '20px',
  //   border: '6px solid gray !important',
  //   borderRadius: '18px',
  //   fontFamily: 'Kreon',
  //   color: '#000',
  //   backgroundColor: '#fff',
  //   placeholder: 'Enter your Password',
  // });

  const sliderPanel = addSlider(
    scene,
    parseFloat(localStorage.getItem("volume") || "0.5"),
    0,
    280,
    600,
    12,
    16,
    0x518f12,
    (val) => {
      scene.sound.volume = val;
      localStorage.setItem("volume", val);
    },
    1
  );

  scene.dialogContainer.add([
    ...dialogSetting,
    ...sliderPanel,
    notificationCheckBox,
    soundCheckBox,
    guideCheckBox,
    deleteAccountButton,
    // changeButton,
    // inputText,
    userNameText,
    emailText,
  ]);
  showDialog(scene);
};

export default createSettingDlg;
