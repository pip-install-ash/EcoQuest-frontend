import { addButton, addComboBox, addText } from "../common";
import { organizeDialog, showDialog } from "./base";
/**
 * Shows a <CreateLeague> dialog.
 *
 * @function createCreateLeagueDlg
 * @param {scene, onClose}
 * @returns {void}
 */
const createCreateLeagueDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "CreateLeagueDialog", 1205, 511);

  const leagueSettings = addText(
    scene,
    "Create a League",
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
  const createButton = addButton(scene, "CreateButton", 0, 170, () => {});

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
    createButton,
    nameInputFiled,
    dropDownList,
  ]);
  showDialog(scene);
};

export default createCreateLeagueDlg;
