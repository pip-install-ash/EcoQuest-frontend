import { addButton, addComboBox, addText } from "../../common";
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
  const nameInputFiled = scene.add.rexInputText(-290, 68, 480, 56, {
    type: "text",
    text: "",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "Enter League name",
    color: "#000",
  });
  const options = [
    { text: "2 to 20", value: 0 },
    { text: "20 to 50", value: 1 },
    { text: "50 to 100", value: 2 },
  ];

  const dropDownList = addComboBox(
    scene,
    30,
    67,
    480,
    options,
    "Select no of players (2 to 20)"
  );
  scene.dialogContainer.add([
    ...dialogSetting,
    leagueSettings,
    privateButton,
    publicButton,
    saveButton,
    nameInputFiled,
    dropDownList
  ]);
  showDialog(scene);
};

export default createLeagueSettingDlg;
