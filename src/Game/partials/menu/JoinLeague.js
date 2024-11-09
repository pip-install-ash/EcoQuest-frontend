import { addButton } from "../common";
import { organizeDialog, showDialog } from "./base";

/**
 * Shows a <JoinLeague> dialog.
 *
 * @function createJoinLeagueDlg
 * @param {scene}
 * @returns {void}
 */
const createJoinLeagueDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "JoinLeagueDialog", 1314, 839);
  const enterButton = addButton(scene, "EnterButton", 550, -253, () => {});

  const codeInputFiled = scene.add.rexInputText(225, -260, 410, 56, {
    type: "text",
    text: "",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "Enter League code",
    color: "#000",
  });
  scene.dialogContainer.add([...dialogSetting, enterButton, codeInputFiled]);
  showDialog(scene);
};

export default createJoinLeagueDlg;
