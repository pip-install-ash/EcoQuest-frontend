import { addButton, transitionToNextScene } from "../common";
import createDeleteAccountDlg from "../menu/DeleteAccount";
import createSettingDlg from "../menu/Settings";
import createBuildingRuleDlg from "./BuildingRule";
import createDisasterDlg from "./Disaster";
import createEcoChallengeDlg from "./EcoChallenge";
import createLeagueMainDlg from "./League/LeagueMainDlg";
import createLeagueLeaderboardDlg from "./LeagueLeaderboard";

/**
 * Makes a <MainButtons> panel.
 *
 * @function createMainButtons
 * @param {scene, left, top}
 * @returns {void}
 */
const MainButtons = (scene, left, top) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const isLeagueOn = localStorage.getItem("activeLeagueId");
  console.log("leageuss", isLeagueOn);

  addButton(scene, "HomeButton", left, top, () => {
    if (!scene.isEditBuilding)
      transitionToNextScene(scene, "OnBoardingMenuScene");
  });

  if (isLeagueOn?.length > 1) {
    // show on whenever user is from a leagues
    addButton(scene, "GroupButton", left + 1288, top, () => {
      if (!scene.isEditBuilding) createLeagueMainDlg(scene, isLeagueOn);
    });
  }

  addButton(scene, "SettingButton", left, top + 96, () => {
    if (!scene.isEditBuilding)
      createSettingDlg(
        scene,
        () => {
          if (!scene.isEditBuilding) createDeleteAccountDlg(scene, () => {});
        },
        userData
      );
  });
  addButton(scene, "ReportButton", left, top + 192, () => {
    if (!scene.isEditBuilding) createBuildingRuleDlg(scene);
  });
  addButton(scene, "AwardButton", left, top + 288, () => {
    if (!scene.isEditBuilding) createLeagueLeaderboardDlg(scene);
  });
  addButton(scene, "WarningButton", left, top + 498, () => {
    if (!scene.isEditBuilding) createDisasterDlg(scene);
  });
  addButton(scene, "LeafButton", left, top + 594, () => {
    if (!scene.isEditBuilding) createEcoChallengeDlg(scene);
  });
};

export default MainButtons;
