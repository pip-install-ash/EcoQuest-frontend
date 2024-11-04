import { addButton, addCheckButton, addSlider, addText } from "../common";
import { organizeDialog, showDialog } from "./base";

/**
 * Shows a <Setting> dialog.
 *
 * @function createSettingDlg
 * @param {scene, deleteAcount}
 * @returns {void}
 */
const createSettingDlg = (scene, deleteAcount) => {
    const dialogSetting = organizeDialog(scene, "SettingDialog", 672, 793);
  
    const notificationCheckBox = addCheckButton(
      scene,
      "RoundCheckOn",
      "RoundCheckOff",
      1,
      250,
      0,
      (val) => {}
    );
  
    const soundCheckBox = addCheckButton(
      scene,
      "RoundCheckOn",
      "RoundCheckOff",
      1,
      250,
      75,
      (val) => {}
    );
  
    const guideCheckBox = addCheckButton(
      scene,
      "RoundCheckOn",
      "RoundCheckOff",
      1,
      250,
      150,
      (val) => {}
    );
  
    const deleteAccountButton = addButton(
      scene,
      "DeleteAccountButton",
      0,
      350,
      () => { deleteAcount ()}
    );
  
    const changeButton = addButton(scene, "ChangeButton", 210, -90, () => {});
  
    const emailText = addText(
      scene,
      "Exampleemail@gmail.com",
      -285,
      -215,
      "Kreon",
      "20px",
      "bold",
      "#000",
      0,
      0.5
    );
  
    const inputText = scene.add
      .rexInputText(-105, -335, 355, 56, {
        type: "text",
        text: "Nathan Jin",
        fontSize: "20px",
        fontFamily: "Kreon",
        placeholder: "Enter your Username",
        color: "#000",
      })
      .setOrigin(0.5);
  
    const sliderPanel = addSlider(
      scene,
      0.5,
      0,
      280,
      600,
      12,
      16,
      0x518f12,
      (val) => {}
    );
  
    scene.dialogContainer.add([
      ...dialogSetting,
      ...sliderPanel,
      notificationCheckBox,
      soundCheckBox,
      guideCheckBox,
      deleteAccountButton,
      changeButton,
      inputText,
      emailText,
    ]);
    showDialog(scene);
  };

  export default createSettingDlg