import { addButton, addImage, addText } from "../common";
import { organizeLeftPanel, showLeftPanel } from "../menu/base";

const Actives = [
  {
    title: "Upgrade 2 Houses: 1/2",
    coin: 200,
    checkable: true,
  },
  {
    title: "Build 4 Residential houses: 1/4",
    coin: 200,
    checkable: true,
  },
  {
    title: "Build a Factory: 0/1",
    coin: 200,
    checkable: true,
  },
  {
    title: "Build a School: 0/1",
    coin: 200,
    checkable: false,
  },
  {
    title: "Build a Hospital: 0/1",
    coin: 200,
    checkable: false,
  },
  {
    title: "Build two Wind mill: 0/2",
    coin: 200,
    checkable: false,
  },
];

const completeds = [
  {
    title: "Build one house: 1/1",
    coin: 200,
    time: "2 hours ago",
  },
];
const defaultTitleStyle = {
  fontFamily: "Inter",
  fontSize: "18px",
  fontStyle: "bold",
  color: "#fff",
};
/**
 * Shows a <EcoChallenge> dialog.
 *
 * @function createEcoChallengeDlg
 * @param {scene}
 * @returns {void}
 */
const createEcoChallengeDlg = (scene) => {
  const dialogSetting = organizeLeftPanel(scene);

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
  let activeContents = [];
  Actives.forEach((v) => {
    const resultContent = addActive(scene, v, displayY);
    activeContents = [...activeContents, ...resultContent.data];
    displayY += resultContent.contentHeight;
  });
  activeContent.add([...activeContents]);

  //Completed Tab
  const completedContent = scene.add.container(-690, -280);
  displayY = 0;
  let completedContents = [];
  completeds.forEach((v) => {
    const resultContent = addCompleted(scene, v, displayY);
    completedContents = [...completedContents, ...resultContent.data];
    displayY += resultContent.contentHeight;
  });
  completedContent.add([...completedContents]);
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

const addActive = (scene, data, y) => {
  const title = scene.add
    .text(0, y, data.title, defaultTitleStyle)
    .setOrigin(0, 0);
  const coin = addImage(scene, "BankIcon", 10, y + 40).setDisplaySize(20, 20);
  const coinText = scene.add
    .text(20, y + 40, `+${data.coin}`, {
      fontFamily: "Inter",
      fontSize: "16px",
      color: "#D7E057",
    })
    .setOrigin(0, 0.5);
  const timeText = scene.add
    .text(520, y + 55, "00:00:20:00", {
      fontFamily: "Inter",
      fontSize: "16px",
      color: "#83C747",
    })
    .setOrigin(1, 0.5);
  let additionalButtons = [];
  if (data.checkable) {
    const tickButton = addButton(scene, "TickButton", 450, y + 20, () => {});
    const crossButton = addButton(scene, "CrossButton", 500, y + 20, () => {});
    additionalButtons = [tickButton, crossButton];
  }

  return {
    data: [title, coin, coinText, timeText, ...additionalButtons],
    contentHeight: 100,
  };
};

const addCompleted = (scene, data, y) => {
  const title = scene.add
    .text(0, y, data.title, defaultTitleStyle)
    .setOrigin(0, 0);
  const coin = addImage(scene, "BankIcon", 10, y + 40).setDisplaySize(20, 20);
  const coinText = scene.add
    .text(20, y + 40, `+${data.coin}`, {
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
    .text(520, y + 35, data.time, {
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
