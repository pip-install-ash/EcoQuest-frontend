import { addButton, transitionToNextScene } from "../common";
import createDeleteAccountDlg from "../menu/DeleteAccount";
import createSettingDlg from "../menu/Settings";
import createBuildingRuleDlg from "./BuildingRule";
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
  addButton(scene, "HomeButton", left, top, () => {
    transitionToNextScene(scene, "OnBoardingMenuScene");
  });
  addButton(scene, "GroupButton", left + 1288, top, () => {
    createLeagueMainDlg(scene);
  });
  addButton(scene, "SettingButton", left, top + 96, () => {
    createSettingDlg(scene, () => {
      createDeleteAccountDlg(scene, () => {})
    });
  });
  addButton(scene, "ReportButton", left, top + 192, () => {
    createBuildingRuleDlg(scene);
  });
  addButton(scene, "AwardButton", left, top + 288, () => {
    createLeagueLeaderboardDlg(scene);
  });
  addButton(scene, "WarningButton", left, top + 498, () => {});
  addButton(scene, "LeafButton", left, top + 594, () => {});
};

export default MainButtons;
