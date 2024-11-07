import { addButton } from "../../common";
import { closeDialog, organizeDialog, showDialog } from "../../menu/base";

/**
 * Shows a <InviteFriend> dialog.
 *
 * @function createInviteFriendDlg
 * @param {scene, onAccept}
 * @returns {void}
 */
const createInviteFriendDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "InviteFriendDialog", 1009, 367);
  const inviteButton = addButton(scene, "InviteButton", -130, 100, () =>
    closeDialog(scene)
  );
  const leagueCodeButton = addButton(scene, "LeagueCodeButton", 270, 100, () => {}
  );
  scene.dialogContainer.add([...dialogSetting, inviteButton, leagueCodeButton]);
  showDialog(scene);
};

export default createInviteFriendDlg;
