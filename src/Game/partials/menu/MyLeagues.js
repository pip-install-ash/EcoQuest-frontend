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
  
  const searchInputFiled = scene.add.rexInputText(-590, -268, 520, 56, {
    type: "text",
    text: "",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "Search",
    color: "#000",
  }).setOrigin(0,0.5);
  scene.dialogContainer.add([
    ...dialogSetting,
    searchInputFiled
  ]);
  showDialog(scene);
}; 

export default createMyLeaguesDlg;
