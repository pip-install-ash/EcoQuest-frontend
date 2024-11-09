import { addButton } from "../common";
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

  const inputFiled = scene.add
      .rexInputText(-15, -112, 750, 45, {
        type: "text",
        text: "",
        fontSize: "20px",
        fontFamily: "Kreon",
        placeholder: "Search League",
        color: "#000",
      })

  scene.dialogContainer.add([
    ...dialogSetting,
    inputFiled,
    leaguesButton,
    globalButton,
  ]);
  showDialog(scene);
};

export default createLeaderboardDlg;
