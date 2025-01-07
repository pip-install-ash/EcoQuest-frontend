import toast from "react-hot-toast";
import { fetchImplementation } from "../../../utils/fetchRequest";
import { addButton, transitionToNextScene } from "../common";
import { organizeDialog, showDialog } from "./base";
import { gameInitMap } from "../../packs/intial.map";
import createKickUserDlg from "../greenCity/League/KickUser";
// import createLeaveLeagueDlg from "../greenCity/League/LeaveLeague";

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
const createMyLeaguesDlg = async (scene) => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const fetchedData = await fetchImplementation(
    "get",
    `api/leagues/my-leagues`
  ).catch((err) => {
    return { data: { leaguesForUI: [] } };
  });
  const myLeaguesList = fetchedData?.data?.leaguesForUI;
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

  myLeaguesList?.forEach((v, idx) => {
    const rowItems = addRow(scene, v, -75 + 92 * idx, userData);
    listItems = [...listItems, ...rowItems];
  });
  listWidget.add(listItems);
  scene.dialogContainer.add([...dialogSetting, searchInputFiled, listWidget]);
  showDialog(scene);
};

const addRow = (scene, data, y, userData) => {
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

  const formattedDate =
    data?.lastLogin !== "N/A"
      ? new Date(data.lastLogin).toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      : data?.lastLogin;
  // lastLogin.setText();

  const lastLogin = scene.add
    .text(120, y, formattedDate, textStyle)
    .setOrigin(0, 0.5);
  const actionButton = addButton(
    scene,
    "ResumeButton",
    430,
    y + 10,
    async () => {
      await fetchImplementation("get", `api/league-stats/${data.leagueID}`, {})
        .then((res) => {
          const { data, success } = res;
          if (!success) {
            toast.error(data.message);
            return;
          }
          const { leagueStats } = data;
          toast.success(`League resumed successfully`);
          localStorage.setItem(
            "gameInitMap",
            leagueStats?.gameInitMap?.length > 1
              ? leagueStats.gameInitMap
              : JSON.stringify(gameInitMap)
          );
          localStorage.setItem("activeLeagueId", leagueStats.leagueId);
          localStorage.setItem("activeLeagueName", leagueStats.leagueName);

          transitionToNextScene(scene, "GreenCitycene");
        })
        .catch((err) => {
          console.log("error resuming league", err);
          toast.error("Error resuming league");
        });
    }
  );
  const rect = scene.add.rectangle(0, y + 46, 1314, 1, 0x2d3020).setOrigin(0.5);

  const leaveButton = addButton(scene, "LeaveButton", 560, y + 10, async () => {
    await fetchImplementation("post", `api/leagues/remove-user-from-league`, {
      userID: userData.user_id,
      leagueID: data.leagueID,
    })
      .then((res) => {
        toast.success("League is left successfully");
        [
          name,
          players,
          points,
          lastLogin,
          actionButton,
          leaveButton,
          rect,
        ].forEach((el) => el.destroy());
      })
      .catch((err) => {
        console.log("Error", err);
        toast.error("Error leaving league");
      });
  });

  return [name, players, points, lastLogin, actionButton, leaveButton, rect];
};
export default createMyLeaguesDlg;
