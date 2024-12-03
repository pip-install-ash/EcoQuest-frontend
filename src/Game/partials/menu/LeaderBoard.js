import { fetchImplementation } from "../../../utils/fetchRequest";
import { addButton } from "../common";
import { organizeDialog, showDialog } from "./base";

// const rowData = [
//   [1, "David251", 200],
//   [2, "David251", 200],
//   [3, "David251", 200],
//   [4, "David251", 200],
//   [5, "David251", 200],
//   [6, "David251", 200],
// ];
// const rowData2 = [
//   [1, "House of Titan", 200],
//   [2, "House of Titan", 200],
//   [3, "House of Titan", 200],
//   [4, "House of Titan", 200],
//   [5, "House of Titan", 200],
//   [6, "House of Titan", 200],
// ];

/**
 * Shows a <LeaderBoard> dialog.
 *
 * @function createExitDlg
 * @param {scene}
 * @returns {void}
 */
const createLeaderboardDlg = async (scene) => {
  const rowData = await fetchImplementation(
    "get",
    "api/points/global/leaderboard"
  )
    .then((res) => res.data.userListUI)
    .catch((err) => console.log(err));
  const rowData2 = await fetchImplementation(
    "get",
    "api/points/league/leaderboard"
  )
    .then((res) => res.data.leagueListUI)
    .catch((err) => console.log(err));

  const dialogSetting = organizeDialog(
    scene,
    "LeaderboardDialog",
    878,
    877,
    0.5,
    0.4
  );
  const leaguesButton = addButton(scene, "LeaguesButtonOff", 210, -190, () => {
    leaguesButton.setTexture("LeaguesButton");
    globalButton.setTexture("GlobalButtonOff");
    leagueContainer.setVisible(true);
    globalContainer.setVisible(false);
    userField.text = "League Name";
  });
  const globalButton = addButton(scene, "GlobalButton", -210, -190, () => {
    leaguesButton.setTexture("LeaguesButtonOff");
    globalButton.setTexture("GlobalButton");
    globalContainer.setVisible(true);
    leagueContainer.setVisible(false);
    userField.text = "User";
  });
  const rankingField = scene.add
    .text(-400, -15, "Ranking", {
      fontFamily: "Inter",
      fontSize: "20px",
      color: "#A5A59D",
    })
    .setOrigin(0, 0.5);
  const userField = scene.add
    .text(-150, -15, "User", {
      fontFamily: "Inter",
      fontSize: "20px",
      color: "#A5A59D",
    })
    .setOrigin(0, 0.5);
  const ecoField = scene.add
    .text(200, -15, "Eco-Point", {
      fontFamily: "Inter",
      fontSize: "20px",
      color: "#A5A59D",
    })
    .setOrigin(0, 0.5);

  const globalContainer = scene.add.container(0, 0);
  const leagueContainer = scene.add.container(0, 0);
  globalContainer.add(
    scene.add.rexInputText(-15, -112, 730, 45, {
      type: "text",
      text: "",
      fontSize: "20px",
      fontFamily: "Kreon",
      placeholder: "Search player",
      color: "#000",
    })
  );
  leagueContainer.add(
    scene.add.rexInputText(-15, -112, 730, 45, {
      type: "text",
      text: "",
      fontSize: "20px",
      fontFamily: "Kreon",
      placeholder: "Search league",
      color: "#000",
    })
  );
  leagueContainer.setVisible(false);

  const topRect = scene.add.rectangle(0, -50, 814, 1, 0x4b4b3b).setOrigin(0.5);
  const bottomRect = scene.add
    .rectangle(0, 20, 814, 1, 0x4b4b3b)
    .setOrigin(0.5);
  rowData.forEach((v, i) => {
    const row = addRow(scene, 80 + 90 * i, v);
    globalContainer.add(row);
  });
  rowData2.forEach((v, i) => {
    const row = addRow(scene, 80 + 90 * i, v);
    leagueContainer.add(row);
  });

  scene.dialogContainer.add([
    ...dialogSetting,
    leagueContainer,
    globalContainer,
    leaguesButton,
    globalButton,
    rankingField,
    userField,
    ecoField,
    topRect,
    bottomRect,
  ]);
  showDialog(scene);
};

const addRow = (scene, y, data) => {
  const defaultStyle = {
    fontFamily: "Inter",
    fontStyle: "Bold",
    fontSize: "20px",
  };
  const ranking = scene.add
    .text(-400, y, data[0], {
      ...defaultStyle,
      color: "#fff",
    })
    .setOrigin(0, 0.5);
  const user = scene.add.text(-150, y, data[1], {
    ...defaultStyle,
    color: "#fff",
  });
  const eco = scene.add.text(200, y, `${data[2]} eco points`, {
    ...defaultStyle,
    color: "#FCB651",
  });
  return [ranking, user, eco];
};

export default createLeaderboardDlg;
