import { addButton, addImage } from "../common";
import { organizeDialog, showDialog } from "./base";

/**
 * Shows a <HowToPlay> dialog.
 *
 * @function createHowToPlayDlg
 * @param scene
 * @returns {void}
 */
const createHowToPlayDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "HowToPlayDialog", 878, 675);

  const ruleImage = addImage(scene, "SoloRule", 0, 75);

  const soloButton = addButton(scene, "SoloButton", -210, -200, () => {
    ruleImage.setTexture("SoloRule");
    soloButton.setTexture("SoloButton");
    multiButton.setTexture("MultiButtonOff");
  });
  const multiButton = addButton(scene, "MultiButtonOff", 210, -200, () => {
    ruleImage.setTexture("MultiRule");
    soloButton.setTexture("SoloButtonOff");
    multiButton.setTexture("MultiButton");
  });

  // Add all elements to the container
  scene.dialogContainer.add([
    ...dialogSetting,
    soloButton,
    multiButton,
    ruleImage,
  ]);

  showDialog(scene);
};

export default createHowToPlayDlg;
