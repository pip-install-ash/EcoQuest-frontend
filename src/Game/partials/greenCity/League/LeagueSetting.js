import { addButton, addText } from "../../common";
import { closeDialog, organizeDialog, showDialog } from "../../menu/base";

/**
 * Shows a <LeagueSetting> dialog.
 *
 * @function createLeagueSettingDlg
 * @param {scene, onAccept}
 * @returns {void}
 */
const createLeagueSettingDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "CreateLeagueDialog", 1205, 511);

  const leagueSettings = addText(
    scene,
    "League Settings",
    0,
    -220,
    "Inter",
    "32px",
    "bold",
    "#FCB651",
    0.5,
    0.5
  );
  const privateButton = addButton(scene, "PrivateButton", -290, -50, () => {});
  const publicButton = addButton(scene, "PublicButton", 280, -50, () => {});
  const saveButton = addButton(scene, "SaveButton", 0, 170, () => {
    closeDialog(scene);
  });
  const nameInputFiled = scene.add
      .rexInputText(-290, 68, 480, 56, {
        type: "text",
        text: "",
        fontSize: "20px",
        fontFamily: "Kreon",
        placeholder: "Enter League name",
        color: "#000",
      }) 
  scene.dialogContainer.add([
    ...dialogSetting,
    leagueSettings,
    privateButton,
    publicButton,
    saveButton,
    nameInputFiled
  ]);
  showDialog(scene);
};

export default createLeagueSettingDlg;
