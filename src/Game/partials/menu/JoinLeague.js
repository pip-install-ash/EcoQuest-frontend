import { addButton } from "../common";
import { organizeDialog, showDialog } from "./base";
const leagues = [
  { name: "The Croods", playerJoined: "10/20", AverageEchoPoints: "12,730" },
  { name: "Random Name", playerJoined: "10/20", AverageEchoPoints: "12,730" },
  { name: "Random Name", playerJoined: "10/20", AverageEchoPoints: "12,730" },
  { name: "Random Name", playerJoined: "10/20", AverageEchoPoints: "12,730" },
];
/**
 * Shows a <JoinLeague> dialog.
 *
 * @function createJoinLeagueDlg
 * @param {scene}
 * @returns {void}
 */
const createJoinLeagueDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "JoinLeagueDialog", 1314, 839);
  const enterButton = addButton(scene, "EnterButton", 550, -253, () => {});

  const codeInputFiled = scene.add.rexInputText(225, -260, 410, 56, {
    type: "text",
    text: "",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "Enter League code",
    color: "#000",
  });
  const listWidget = scene.add.container(0, 0);
  let listItems = [];
  leagues.forEach((v, idx) => {
    const rowItems = addRow(scene, v, 10 + 92 * idx);
    listItems = [...listItems, ...rowItems];
  });
  listWidget.add(listItems);
  scene.dialogContainer.add([
    ...dialogSetting,
    enterButton,
    codeInputFiled,
    listWidget,
  ]);
  showDialog(scene);
};
const addRow = (scene, data, y) => {
  const textStyle = {
    fontFamily: "Inter",
    fontSize: 18,
    fontStyle: "bold",
  };
  const name = scene.add.text(-585, y, data.name, textStyle).setOrigin(0, 0.5);
  const players = scene.add
    .text(-235, y, data.playerJoined, textStyle)
    .setOrigin(0, 0.5);
  const points = scene.add
    .text(95, y, data.AverageEchoPoints, textStyle)
    .setOrigin(0, 0.5);
  const actionButton = addButton(scene, "JoinButton", 510, y + 10, () => {});
  const rect = scene.add.rectangle(0, y + 46, 1314, 1, 0x2d3020).setOrigin(0.5);
  return [name, players, points, actionButton, rect];
};
export default createJoinLeagueDlg;
