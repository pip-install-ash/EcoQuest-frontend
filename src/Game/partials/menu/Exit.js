import { addButton } from "../common";
import { closeDialog, organizeDialog, showDialog } from "./base";

/**
 * Shows a <Exit> dialog.
 *
 * @function createExitDlg
 * @param {scene, onAccept}
 * @returns {void}
 */
const createExitDlg = (scene, onAccept) => {
  const dialogSetting = organizeDialog(scene, "ExitDialog", 674, 408);
  const exitButton = addButton(scene, "ExitButton", 0, 0, () => onAccept());
  const continueButton = addButton(scene, "ContinueButton", 0, 85, () =>
    closeDialog(scene)
  );
  scene.dialogContainer.add([...dialogSetting, exitButton, continueButton]);
  showDialog(scene);
};

export default createExitDlg;
