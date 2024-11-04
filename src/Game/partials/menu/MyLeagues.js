import { organizeDialog, showDialog } from "./base";

/**
 * Shows a <MyLeagues> dialog.
 *
 * @function createMyLeaguesDlg
 * @param {scene}
 * @returns {void}
 */
const createMyLeaguesDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "MyLeaguesDialog", 1314, 841);
  
  scene.dialogContainer.add([
    ...dialogSetting
  ]);
  showDialog(scene);
}; 

export default createMyLeaguesDlg;
