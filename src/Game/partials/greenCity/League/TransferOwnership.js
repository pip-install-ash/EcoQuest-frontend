import { addButton, addComboBox, transitionToNextScene } from "../../common";
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
    transitionToNextScene(scene, "OnBoardingMenuScene");
  });
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
