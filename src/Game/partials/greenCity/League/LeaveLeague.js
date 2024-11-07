import { addButton, addText, transitionToNextScene } from "../../common";
import { organizeDialog, showDialog } from "../../menu/base";
import createTransferOwnershipDlg from "./TransferOwnership";

/**
 * Shows a <LeaveLeague> dialog.
 *
 * @function createLeaveLeagueDlg
 * @param {scene, onAccept}
 * @returns {void}
 */
const createLeaveLeagueDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "LeaveLeagueDialog", 674, 408);

  const leagueSettings = addText(
    scene,
    "Decide what happens to this league",
    0,
    -90,
    "Inter",
    "24px",
    "bold",
    "#FFF",
    0.5,
    0.5
  );
  const deleteButton = addButton(
    scene,
    "DeleteLeagueButton",
    0,
    20,
    () => {
      transitionToNextScene(scene, 'OnBoardingMenuScene');
    }
  );
  const transferButton = addButton(
    scene,
    "TransferOwnershipButton",
    0,
    100,
    () => {
      createTransferOwnershipDlg(scene)
    }
  );
  scene.dialogContainer.add([
    ...dialogSetting,
    leagueSettings,
    deleteButton,
    transferButton,
  ]);
  showDialog(scene);
};

export default createLeaveLeagueDlg;
