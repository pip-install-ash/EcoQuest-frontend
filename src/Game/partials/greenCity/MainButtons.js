import { addButton, transitionToNextScene } from "../common";

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
  addButton(scene, "SettingButton", left, top + 96, () => {});
  addButton(scene, "ReportButton", left, top + 192, () => {});
  addButton(scene, "AwardButton", left, top + 288, () => {});
  addButton(scene, "WarningButton", left, top + 498, () => {});
  addButton(scene, "LeafButton", left, top + 594, () => {});
};

export default MainButtons;
