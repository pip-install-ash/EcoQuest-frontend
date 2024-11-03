import { addButton, addInputFiled } from "../common";
import { organizeDialog, showDialog } from "./base";

/**
 * Shows a <LeaderBoard> dialog.
 *
 * @function createExitDlg
 * @param {scene}
 * @returns {void}
 */
const createLeaderboardDlg = (scene) => {
  const dialogSetting = organizeDialog(
    scene,
    "LeaderboardDialog",
    878,
    877,
    0.5,
    0.4
  );
  const leaguesButton = addButton(scene, "LeaguesButton", -210, -180, () => {
    leaguesButton.setTexture("LeaguesButton");
    globalButton.setTexture("GlobalButtonOff");
  });
  const globalButton = addButton(scene, "GlobalButtonOff", 210, -180, () => {
    leaguesButton.setTexture("LeaguesButtonOff");
    globalButton.setTexture("GlobalButton");
  });

//   const inputFiled = addInputFiled(
//     scene,
//     -15,
//     -112,
//     750,
//     45,
//     "#000",
//     0x000000
//   );

  scene.dialogContainer.add([
    ...dialogSetting,
    // ...inputFiled,
    leaguesButton,
    globalButton,
  ]);
  showDialog(scene);
};

export default createLeaderboardDlg;
