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
  const leagueCodeButton = addButton(
    scene,
    "LeagueCodeButton",
    270,
    100,
    () => {}
  );
  const inputFiled = scene.add.rexInputText(0, -5, 700, 56, {
    type: "text",
    text: "",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "Enter League name",
    color: "#000",
  });
  scene.dialogContainer.add([
    ...dialogSetting,
    inviteButton,
    leagueCodeButton,
    inputFiled,
  ]);
  showDialog(scene);
};

export default createInviteFriendDlg;
