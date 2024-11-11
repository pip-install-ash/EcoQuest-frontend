import { addButton } from "../common";
import { organizeDialog, showDialog } from "./base";

const leagues = [
  {
    name: "The Croods",
    playerJoined: "10/20",
    AverageEchoPoints: "12,730 pt",
    lastLogin: "5 min ago",
  },
  {
    name: "Random Name",
    playerJoined: "10/20",
    AverageEchoPoints: "12,730 pt",
    lastLogin: "50 min ago",
  },
  {
    name: "Random Name",
    playerJoined: "10/20",
    AverageEchoPoints: "12,730 pt",
    lastLogin: "50 min ago",
  },
];
/**
 * Shows a <MyLeagues> dialog.
 *
 * @function createMyLeaguesDlg
 * @param {scene}
 * @returns {void}
 */
const createMyLeaguesDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "MyLeaguesDialog", 1314, 841);

  const searchInputFiled = scene.add
    .rexInputText(-590, -268, 520, 56, {
      type: "text",
      text: "",
      fontSize: "20px",
      fontFamily: "Kreon",
      placeholder: "Search",
      color: "#000",
    })
    .setOrigin(0, 0.5);
  const listWidget = scene.add.container(0, 0);
  let listItems = [];
  leagues.forEach((v, idx) => {
    const rowItems = addRow(scene, v, -75 + 92 * idx);
    listItems = [...listItems, ...rowItems];
  });
  listWidget.add(listItems);
  scene.dialogContainer.add([...dialogSetting, searchInputFiled, listWidget]);
  showDialog(scene);
};

const addRow = (scene, data, y) => {
  const textStyle = {
    fontFamily: "Inter",
    fontSize: 18,
    fontStyle: "bold",
  };
  const name = scene.add.text(-605, y, data.name, textStyle).setOrigin(0, 0.5);
  const players = scene.add
    .text(-270, y, data.playerJoined, textStyle)
    .setOrigin(0, 0.5);
  const points = scene.add
    .text(-100, y, data.AverageEchoPoints, textStyle)
    .setOrigin(0, 0.5);
  const lastLogin = scene.add
    .text(120, y, data.AverageEchoPoints, textStyle)
    .setOrigin(0, 0.5);
  const actionButton = addButton(scene, "ResumeButton", 430, y + 10, () => {});
  const laveButton = addButton(scene, "LeaveButton", 560, y + 10, () => {});
  const rect = scene.add.rectangle(0, y + 46, 1314, 1, 0x2d3020).setOrigin(0.5);
  return [name, players, points, lastLogin, actionButton, laveButton, rect];
};
export default createMyLeaguesDlg;
