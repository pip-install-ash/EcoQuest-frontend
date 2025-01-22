import { fetchImplementation } from "../../../utils/fetchRequest";
import { addButton, addImage, addText } from "../common";
import { organizeLeftPanel, showLeftPanel } from "../menu/base";

const Actives = [
  {
    message: "Upgrade 2 Houses: 1/2",
    points: 200,
    checkable: true,
    endTime: new Date("2024-12-23T23:59:59Z"),
  },
  {
    message: "Build 4 Residential houses: 1/4",
    points: 200,
    checkable: true,
    endTime: new Date("2024-12-24T23:59:59Z"),
  },
  {
    message: "Build a Factory: 0/1",
    points: 200,
    checkable: true,
    endTime: new Date("2024-12-23T08:59:59Z"),
  },
  // {
  //   message: "Build a School: 0/1",
  //   points: 200,
  //   checkable: false,
  // },
  // {
  //   message: "Build a Hospital: 0/1",
  //   points: 200,
  //   checkable: false,
  // },
  // {
  //   message: "Build two Wind mill: 0/2",
  //   points: 200,
  //   checkable: false,
  // },
];

const completeds = [
  {
    message: "Build one house: 1/1",
    points: 200,
    time: "2 hours ago",
  },
];
const defaultTitleStyle = {
  fontFamily: "Inter",
  fontSize: "18px",
  fontStyle: "bold",
  color: "#fff",
};

const getEcoChallenges = (leagueID, isActive) => {
  const url = isActive
    ? "api/challenges/challenge-progress"
    : "api/challenges/completed-challenges";

  return fetchImplementation("get", url, {
    ...(leagueID?.length > 0 ? { leagueID } : {}),
  })
    .then((responseData) => {
      console.log("fwtched data>>", responseData);
      return responseData;
    })
    .catch((error) => {
      console.error("Error fetching challenges:", error);
      return [];
    });
};

/**
 * Shows a <EcoChallenge> dialog.
 *
 * @function createEcoChallengeDlg
 * @param {scene}
 * @returns {void}
 */

const createEcoChallengeDlg = async (scene) => {
  let intervals = [];
  const isSceneClosed = () => {
    intervals.forEach(clearInterval);
    intervals = [];
  };
  if (!scene.createEcoChallengeDlg) {
    scene.createEcoChallengeDlg = {};
  }
  const dialogSetting = organizeLeftPanel(scene, isSceneClosed);
  scene.createEcoChallengeDlg.isSceneClosed = isSceneClosed;
  const leagueID = localStorage.getItem("activeLeagueId");
  const activeChallenges = await getEcoChallenges(leagueID, true);
  const completedChallenges = await getEcoChallenges(leagueID, false);

  const disasterTitle = addText(
    scene,
    "Eco-Challenge",
    -454,
    -440,
    "Inter",
    "32px",
    "bold",
    "#FCB651",
    0.5,
    0.5
  );
  //Tabs
  const activeButton = addButton(scene, "ActiveButton", -570, -350, () => {
    activeButton.setTexture("ActiveButton");
    completedButton.setTexture("CompletedButtonOff");
    activeContent.setVisible(true);
    completedContent.setVisible(false);
  });
  const completedButton = addButton(
    scene,
    "CompletedButtonOff",
    -300,
    -350,
    () => {
      activeButton.setTexture("ActiveButtonOff");
      completedButton.setTexture("CompletedButton");
      activeContent.setVisible(false);
      completedContent.setVisible(true);
    }
  );

  //Active Tab
  const activeContent = scene.add.container(-690, -280);
  let displayY = 0;

  if (activeChallenges?.data?.length > 0) {
    let activeContents = [];
    activeChallenges?.data?.forEach((v) => {
      const resultContent = addActive(scene, v, displayY, intervals);
      activeContents = [...activeContents, ...resultContent.data];
      displayY += resultContent.contentHeight;
    });
    activeContent.add([...activeContents]);
  }

  //Completed Tab
  const completedContent = scene.add.container(-690, -280);
  displayY = 0;
  let completedContents = [];

  if (completedChallenges?.data?.length > 0) {
    completedChallenges.data?.forEach((v) => {
      const resultContent = addCompleted(scene, v, displayY);
      completedContents = [...completedContents, ...resultContent.data];
      displayY += resultContent.contentHeight;
    });
    completedContent.add([...completedContents]);
  }
  completedContent.setVisible(false);

  scene.dialogContainer.add([
    ...dialogSetting,
    disasterTitle,
    activeButton,
    completedButton,
    activeContent,
    completedContent,
  ]);
  showLeftPanel(scene);
};

const addActive = (scene, data, y, intervals) => {
  const title = scene.add
    .text(
      0,
      y,
      `${data?.message}: ${data?.progress?.count || 0}/${
        data?.requiredCount || 0
      }`,
      defaultTitleStyle
    )
    .setOrigin(0, 0);
  const coin = addImage(scene, "BankIcon", 10, y + 40).setDisplaySize(20, 20);
  const coinText = scene.add
    .text(20, y + 40, `+${data?.points}`, {
      fontFamily: "Inter",
      fontSize: "16px",
      color: "#D7E057",
    })
    .setOrigin(0, 0.5);

  const timeText = scene.add
    .text(520, y + 55, "00:00:00:00", {
      fontFamily: "Inter",
      fontSize: "16px",
      color: "#83C747",
    })
    .setOrigin(1, 0.5);

  const endTime = new Date(data?.endTime); // Ensure endTime is a Date object
  data?.endTime && updateTime(endTime, intervals, timeText);

  // let additionalButtons = [];
  // if (data?.checkable) {
  //   const tickButton = addButton(scene, "TickButton", 450, y + 20, () => {});
  //   const crossButton = addButton(scene, "CrossButton", 500, y + 20, () => {});
  //   additionalButtons = [tickButton, crossButton];
  // }
  // ...additionalButtons
  return {
    data: [title, coin, coinText, timeText],
    contentHeight: 100,
  };
};
const updateTime = (endTime, intervals, timeText) => {
  // Set interval and clear if scene becomes hidden
  const newInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDiff = endTime - currentTime;
    if (timeDiff <= 0) {
      timeText?.setText("00:00:00:00");
      clearInterval(newInterval);
      return;
    }
    const hours = String(
      Math.floor((timeDiff / (1000 * 60 * 60)) % 24)
    ).padStart(2, "0");
    const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(
      2,
      "0"
    );
    const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, "0");
    const milliseconds = String(Math.floor((timeDiff % 1000) / 10)).padStart(
      2,
      "0"
    );

    timeText?.setText(`${hours}:${minutes}:${seconds}:${milliseconds}`);
  }, 100);
  intervals.push(newInterval);
};

const addCompleted = (scene, data, y) => {
  const endTime = data?.endTime || "20 min ago"; // Ensure endTime is a Date object

  const title = scene.add
    .text(
      0,
      y,
      `${data?.message}: ${data?.progress?.count || 0}/${
        data?.requiredCount || 0
      }`,
      defaultTitleStyle
    )
    .setOrigin(0, 0);
  const coin = addImage(scene, "BankIcon", 10, y + 40).setDisplaySize(20, 20);
  const coinText = scene.add
    .text(20, y + 40, `+${data?.points}`, {
      fontFamily: "Inter",
      fontSize: "16px",
      color: "#D7E057",
    })
    .setOrigin(0, 0.5);
  const completedText = scene.add
    .text(520, y, "Completed", {
      fontFamily: "Inter",
      fontSize: "16px",
      fontStyle: "Bold",
      color: "#83C747",
    })
    .setOrigin(1, 0);
  const timeText = scene.add
    .text(520, y + 35, endTime, {
      fontFamily: "Inter",
      fontSize: "16px",
      color: "#B0B0B0",
    })
    .setOrigin(1, 0.5);
  return {
    data: [title, coin, coinText, completedText, timeText],
    contentHeight: 80,
  };
};

export default createEcoChallengeDlg;
