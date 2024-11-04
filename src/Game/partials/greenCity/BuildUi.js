import { addButton } from "../common";

/**
 * Makes a <BuildUi> panel.
 *
 * @function createBuildUi
 * @param {scene, left, top}
 * @returns {void}
 */
const BuildUi = (scene) => {
  addButton(scene, "BuildButton", 1345, 905, () => {});
};

export default BuildUi;
