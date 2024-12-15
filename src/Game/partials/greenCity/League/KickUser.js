import toast from "react-hot-toast";
import { fetchImplementation } from "../../../../utils/fetchRequest";
import { addButton, addText } from "../../common";
import { closeDialog, organizeDialog, showDialog } from "../../menu/base";

/**
 * Shows a <KickUser> dialog.
 *
 * @function createKickUserDlg
 * @param {scene}
 * @returns {void}
 */
const createKickUserDlg = (scene, userData, activeLeagueId) => {
  const dialogSetting = organizeDialog(scene, "KickUserDialog", 674, 408);
  const leagueSettings = addText(
    scene,
    `Are you sure want to remove\n${userData[1]} from this league?`,
    0,
    -70,
    "Inter",
    "24px",
    "bold",
    "#FFF",
    0.5,
    0.5
  );
  const yesButton = addButton(scene, "YesContinueButton", 0, 20, async () => {
    // 7 is the index of the user id in the userData array
    await fetchImplementation("post", `api/leagues/remove-user-from-league`, {
      userID: userData[7],
      leagueID: activeLeagueId,
    })
      .then((res) => {
        toast.success("User removed from league successfully");
      })
      .catch((err) => {
        console.log("Error", err);
        toast.error("Error removing user from league");
      });
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
