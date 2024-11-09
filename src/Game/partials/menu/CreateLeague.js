import { addButton, addText } from "../common";
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
    createButton,
    nameInputFiled
  ]);
  showDialog(scene);
};

export default createCreateLeagueDlg;
