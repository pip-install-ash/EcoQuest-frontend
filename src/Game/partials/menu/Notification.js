import { addButton } from "../common";
import { organizeDialog, showDialog } from "./base";

/**
 * Shows a <Notification> dialog.
 *
 * @function createExitDlg
 * @param {scene, onAccept}
 * @returns {void}
 */
const createNotificationDlg = (scene, onAccept) => {
  const dialogSetting = organizeDialog(scene, "NotificationDialog", 1314, 877);

  const clearAllButton = addButton(
    scene,
    "ClearAllButton",
    1314 * 0.5 - 129,
    -(877 * 0.5) + 7,
    () => {}
  );
  scene.dialogContainer.add([...dialogSetting, clearAllButton]);
  showDialog(scene);
};

export default createNotificationDlg;
