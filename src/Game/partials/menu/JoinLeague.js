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

  scene.dialogContainer.add([...dialogSetting, enterButton]);
  showDialog(scene);
};

export default createJoinLeagueDlg;
