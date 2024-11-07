import { organizeDialog, showDialog } from "../menu/base";

/**
 * Shows a <BuildingRule> dialog.
 *
 * @function createBuildingRuleDlg
 * @param {scene}
 * @returns {void}
 */
const createBuildingRuleDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "BuildingRuleDialog", 878, 621);
  scene.dialogContainer.add([...dialogSetting]);
  showDialog(scene);
};

export default createBuildingRuleDlg;
