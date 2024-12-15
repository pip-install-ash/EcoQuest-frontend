import { fetchImplementation } from "../../../../utils/fetchRequest";
import { addButton, addComboBox, transitionToNextScene } from "../../common";
import { closeDialog, organizeDialog, showDialog } from "../../menu/base";
import toast from "react-hot-toast";

const transferOwnership = async (leagueID, newOwnerID, leaveLeague) => {
  try {
    // const response = await fetchImplementation(
    //   "post",
    //   `api/leagues/transfer-ownership?leaveLeague=${leaveLeague}`,
    //   { leagueID, newOwnerID }
    // );
    // if (response.status) {
    //   toast.success("Ownership transferred successfully", "success");
    // } else {
    //   toast.error(response.message);
    // }
  } catch (error) {
    toast.success(error.message);
  }
};

/**
 * Shows a <TransferOwnership> dialog.
 *
 * @function createTransferOwnershipDlg
 * @param {scene}
 * @returns {void}
 */
const createTransferOwnershipDlg = async (scene, leagueData) => {
  const usersInLeague = await fetchImplementation(
    "get",
    `api/leagues/league-users/${leagueData.id}`
  );
  const dialogSetting = organizeDialog(
    scene,
    "TransferOwnershipDialog",
    674,
    408
  );
  const stayButton = addButton(scene, "TransferStayButton", 0, 40, async () => {
    await transferOwnership(1, 2, false);
    // closeDialog(scene);
  });
  const leaveButton = addButton(
    scene,
    "TransferLeaveButton",
    0,
    120,
    async () => {
      //  await transferOwnership();
      // transitionToNextScene(scene, "OnBoardingMenuScene");
    }
  );
  const options = [
    {
      text: "AAA",
      value: 0,
    },
    {
      text: "BBB",
      value: 1,
    },
    {
      text: "CCC",
      value: 2,
    },
    {
      text: "DDD",
      value: 3,
    },
  ];
  const dropDownList = addComboBox(
    scene,
    -235,
    -57,
    450,
    options,
    "Select from this league players"
  );
  scene.dialogContainer.add([
    ...dialogSetting,
    stayButton,
    leaveButton,
    dropDownList,
  ]);
  showDialog(scene);
};

export default createTransferOwnershipDlg;
