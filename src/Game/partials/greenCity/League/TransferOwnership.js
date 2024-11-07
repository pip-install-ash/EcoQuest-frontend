import { addButton, transitionToNextScene } from "../../common";
import { closeDialog, organizeDialog, showDialog } from "../../menu/base";

/**
 * Shows a <TransferOwnership> dialog.
 *
 * @function createTransferOwnershipDlg
 * @param {scene}
 * @returns {void}
 */
const createTransferOwnershipDlg = (scene) => {
  const dialogSetting = organizeDialog(
    scene,
    "TransferOwnershipDialog",
    674,
    408
  );
  const stayButton = addButton(scene, "TransferStayButton", 0, 40, () => {
    closeDialog(scene);
  });
  const leaveButton = addButton(scene, "TransferLeaveButton", 0, 120, () => {
    transitionToNextScene(scene, "OnBoardingMenuScene")
  });
  scene.dialogContainer.add([
    ...dialogSetting,
    stayButton,
    leaveButton,
  ]);
  showDialog(scene);
};

export default createTransferOwnershipDlg;
