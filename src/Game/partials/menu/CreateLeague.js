import { addButton } from "../common";
import { organizeDialog, showDialog } from "./base";
import createJoinLeagueDlg from "./JoinLeague";
import createLeagueDlg from "./League";
import createMyLeaguesDlg from "./MyLeagues";

/**
 * Shows a <CreateLeague> dialog.
 *
 * @function createCreateLeagueDlg
 * @param {scene, onClose}
 * @returns {void}
 */
const createCreateLeagueDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "CreateLeagueDialog", 1205, 511);

  const privateButton = addButton(scene, "PrivateButton", -290, -50, () => {});
  const publicButton = addButton(scene, "PublicButton", 280, -50, () => {});
  const createButton = addButton(scene, "CreateButton", 0, 170, () => {});
  scene.dialogContainer.add([
    ...dialogSetting,
    privateButton,
    publicButton,
    createButton,
  ]);
  showDialog(scene);
};

export default createCreateLeagueDlg;
