import toast from "react-hot-toast";
import { fetchImplementation } from "../../../../utils/fetchRequest";
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
  const inviteButton = addButton(
    scene,
    "InviteButton",
    -130,
    100,
    async () => {
      const isEmail = inputFiled.text.includes("@");
      await fetchImplementation("post", "api/leagues/invite-user-to-league", {
        ...(isEmail
          ? { email: inputFiled.text }
          : { username: inputFiled.text }),
        joiningCode: scene.leagueData.joiningCode,
      })
        .then((res) => {
          toast.success(res.message); // "User invited successfully"
        })
        .catch((err) => {
          toast.error(err.message);
        });
      console.log("leagueData", scene.leagueData);
      console.log("INVITE FRIEND", inputFiled.text);
    }
    // closeDialog(scene)
  );
  const leagueCodeButton = addButton(
    scene,
    "LeagueCodeButton",
    270,
    100,
    () => {
      navigator.clipboard.writeText(scene.leagueData.joiningCode);
      toast.success("Joining code copied to clipboard");
    }
  );
  const inputFiled = scene.add.rexInputText(0, -5, 700, 56, {
    type: "text",
    text: "",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "Enter username/email",
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
