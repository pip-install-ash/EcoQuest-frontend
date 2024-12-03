import toast from "react-hot-toast";
import { addButton, addText, transitionToNextScene } from "../../common";
import { organizeDialog, showDialog } from "../../menu/base";
import createTransferOwnershipDlg from "./TransferOwnership";
import { fetchImplementation } from "../../../../utils/fetchRequest";

/**
 * Shows a <LeaveLeague> dialog.
 *
 * @function createLeaveLeagueDlg
 * @param {scene, onAccept}
 * @returns {void}
 */
const createLeaveLeagueDlg = (scene, leagueData, isOwner) => {
  const dialogSetting = organizeDialog(scene, "LeaveLeagueDialog", 674, 408);

  /**
   *
   * OwnerHE true LeaveLeagueDialog userData,
   * leagueData
   * {user_id: '54QK1FcFwpbkPGewDnMBlJrNK6w2', email: 'testuser@gmail.com', userName: 'testbar',email: "testuser@gmail.com",
   * "userName: "testbar"user_id: "54QK1FcFwpbkPGewDnMBlJrNK6w2"[[Prototype]]: Object
   * {id: 'ak3gozZUZ5y37o3u3V7s', leagueName: 'kano', numberOfPlayers: '20', userPresent: 1, isPrivate: false, …}
   */

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
    async () => {
      await fetchImplementation("delete", `api/leagues/delete/${leagueData.id}`)
        .then((res) => {
          console.log("delete league", res);
          if (!res.success) {
            toast.error(res.message);
            return;
          }
          toast.success("League deleted successfully");
          transitionToNextScene(scene, "OnBoardingMenuScene");
        })
        .catch((err) => {
          toast.error("Error deleting league");
          console.log("delete league error", err);
        });
    }
  );
  const transferButton = addButton(
    scene,
    "TransferOwnershipButton",
    0,
    100,
    () => {
      if (!isOwner) {
        console.log("owner>>>", isOwner);
        toast.error("You are not the owner of this league");
        return;
      }
      createTransferOwnershipDlg(scene, leagueData);
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
