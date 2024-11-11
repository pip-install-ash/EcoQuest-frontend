import { addButton } from "../common";
import { closeDialog, organizeDialog, showDialog } from "../menu/base";
import createSingleTutorial from "./SingleTutorial";

/**
 * Shows a <TutorialSetting> dialog.
 *
 * @function createTutorialSettingDlg
 * @param {scene, onAccept}
 * @returns {void}
 */
const createTutorialSettingDlg = (scene, onAccept) => {
  const dialogSetting = organizeDialog(
    scene,
    "TutorialSettingDialog",
    674,
    279
  );
  const noGuideButton = addButton(scene, "NoGuideButton", 160, 50, () => {
    scene.showTutorial = false;
    closeDialog(scene);
  });
  const yesGuideButton = addButton(scene, "YesGuideButton", -160, 50, () => {
    scene.showTutorial = true;
    closeDialog(scene);
    createSingleTutorial(scene);
  });
  scene.dialogContainer.add([...dialogSetting, yesGuideButton, noGuideButton]);
  showDialog(scene);
};

export default createTutorialSettingDlg;
