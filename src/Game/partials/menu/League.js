import { addButton } from "../common";
import { organizeDialog, showDialog } from "./base";

/**
 * Shows a <League> dialog.
 *
 * @function createLeagueDlg
 * @param {scene, createLeague, joinLeague, myLeagues}
 * @returns {void}
 */
const createLeagueDlg = (scene, createLeague, joinLeague, myLeagues) => {
  const dialogSetting = organizeDialog(scene, "LeagueDialog", 674, 408);
  const createLeagueButton = addButton(scene, "CreateLeagueButton", 0, 20, () =>
    createLeague()
  );
  const joinLeagueButton = addButton(scene, "JoinLeagueButton", 0, 90, () =>
    joinLeague()
  );
  const myLeaguesButton = addButton(scene, "MyLeaguesButton", 0, 160, () =>
    myLeagues()
  );
  scene.dialogContainer.add([
    ...dialogSetting,
    createLeagueButton,
    joinLeagueButton,
    myLeaguesButton,
  ]);
  showDialog(scene);
};

export default createLeagueDlg;
