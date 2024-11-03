import { addButton } from "../common";
import { closeDialog, organizeDialog, showDialog } from "./base";

/**
 * Shows a <DeleteAccount> dialog.
 *
 * @function createDeleteAccountDlg
 * @param {scene, onAccept}
 * @returns {void}
 */
const createDeleteAccountDlg = (scene, onAccept) => {
  const dialogSetting = organizeDialog(scene, "DeleteAccountDialog", 674, 408);
  const exitButton = addButton(scene, "YesDeleteButton", 0, 20, () => onAccept());
  const continueButton = addButton(scene, "NoDeleteButton", 0, 105, () =>
    closeDialog(scene)
  );
  scene.dialogContainer.add([...dialogSetting, exitButton, continueButton]);
  showDialog(scene);
};

export default createDeleteAccountDlg;
