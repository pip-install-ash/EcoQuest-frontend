import { addButton, addText } from "../../common";
import { closeDialog, organizeDialog, showDialog } from "../../menu/base";

/**
 * Shows a <KickUser> dialog.
 *
 * @function createKickUserDlg
 * @param {scene}
 * @returns {void}
 */
const createKickUserDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "KickUserDialog", 674, 408);

  const leagueSettings = addText(
    scene,
    "Are you sure want to remove\nmicheal123 from this league?",
    0,
    -70,
    "Inter",
    "24px",
    "bold",
    "#FFF",
    0.5,
    0.5
  );
  const yesButton = addButton(scene, "YesContinueButton", 0, 20, () => {
    closeDialog(scene);
  });
  const noButton = addButton(scene, "NoCancelButton", 0, 100, () => {
    closeDialog(scene);
  });
  scene.dialogContainer.add([
    ...dialogSetting,
    leagueSettings,
    yesButton,
    noButton,
  ]);
  showDialog(scene);
};

export default createKickUserDlg;
