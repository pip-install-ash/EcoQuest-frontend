import { addButton, addText } from "../common";
import { organizeLeftPanel, showLeftPanel } from "../menu/base";
import { fetchImplementation } from "../../../utils/fetchRequest";
import toast from "react-hot-toast";

const informations = [
  {
    title: "Fire Outbreak",
    content:
      "A sudden fire spreads uncontrollably, causing chaos and destruction in its path. Buildings and resources are at risk of being engulfed in flames.",
  },
  {
    title: "Earthquake",
    content:
      "The ground trembles violently, toppling structures and disrupting the stability of the area. Damage is widespread and unpredictable.",
  },
  {
    title: "Hurricane",
    content:
      "A massive storm with strong winds and heavy rain wreaks havoc, devastating everything in its trajectory and flooding large areas.",
  },
];

const reports = [
  {
    disaster: "Earth Quake",
    time: "Ended: 5 hours ago",
  },
  {
    disaster: "Earth Quake",
    time: "Ended: 7 hours ago",
  },
  {
    disaster: "Flood",
    time: "Ended: 12 hours ago",
  },
  {
    disaster: "Earth Lake",
    time: "Ended: 16 hours ago",
  },
];
const defaultTitleStyle = {
  fontFamily: "Inter",
  fontSize: "18px",
  fontStyle: "bold",
  color: "#fff",
};
/**
 * Shows a <Disaster> dialog.
 *
 * @function createDisasterDlg
 * @param {scene}
 * @returns {void}
 */

const getEcoDisasterData = async (leagueID) => {
  const url = "api/disasters/user-destructions";

  return await fetchImplementation("get", url, {
    leagueId: leagueID,
  })
    .then((responseData) => {
      console.log("fwtched data>>", responseData);
      !responseData.data.length && toast.error("No destructions exist yet.");
      return responseData.data;
    })
    .catch((error) => {
      console.error("Error fetching challenges:", error);
      toast.error("Error fetching destructions");
      return [];
    });
  // return responseGot;
};

const createDisasterDlg = async (scene, leagueID) => {
  console.log("here we are ", leagueID);
  const reportsData = await getEcoDisasterData(leagueID);
  const dialogSetting = organizeLeftPanel(scene);
  // const activeChallenges = await getEcoDisaster(leagueID, true);

  const disasterTitle = addText(
    scene,
    "Disaster",
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
  const informationButton = addButton(
    scene,
    "InformationButton",
    -570,
    -350,
    () => {
      informationButton.setTexture("InformationButton");
      reportButton.setTexture("ReportButtonOff");
      informationContent.setVisible(true);
      reportContent.setVisible(false);
    }
  );
  const reportButton = addButton(scene, "ReportButtonOff", -300, -350, () => {
    informationButton.setTexture("InformationButtonOff");
    reportButton.setTexture("DiasterReportButton");
    informationContent.setVisible(false);
    reportContent.setVisible(true);
  });

  //Information Tab
  const informationContent = scene.add.container(-690, -280);
  let displayY = 0;
  let informationContents = [];
  informations.forEach((v) => {
    const resultContent = addInformation(scene, v, displayY);
    informationContents = [...informationContents, ...resultContent.data];
    displayY += resultContent.contentHeight;
  });
  informationContent.add([...informationContents]);

  //Report Tab
  const reportContent = scene.add.container(-690, -280);
  displayY = 0;
  let reportContents = [];
  if (reportsData?.length >= 0) {
    reportsData.forEach((v) => {
      const resultContent = addReport(scene, v, displayY, (selected) => {
        disasterTitle.setText(selected.disaster);
        timeDescription.setText(selected.time);
        propertyDescription.setText(selected.destructionMessage);
        detailContent.setVisible(true);
        informationButton.setVisible(false);
        informationContent.setVisible(false);
        reportButton.setVisible(false);
        reportContent.setVisible(false);
      });
      reportContents = [...reportContents, ...resultContent.data];
      displayY += resultContent.contentHeight;
    });
  }
  reportContent.add([...reportContents]);
  reportContent.setVisible(false);

  //Detail Tab
  const detailContent = scene.add.container(-690, -280);
  const backButton = addButton(scene, "BackButton", 29, -150, () => {
    disasterTitle.setText("Disaster");
    detailContent.setVisible(false);
    reportContent.setVisible(true);
    reportButton.setVisible(true);
    informationButton.setVisible(true);
  });
  const timeDescription = scene.add
    .text(230, -130, "5hours Ago", defaultTitleStyle)
    .setOrigin(0.5, 0.5);
  const propertyTitle = scene.add
    .text(0, -50, "Properties destroyed", {
      fontFmaily: "Inter",
      fontSize: "16px",
      color: "#B0B0B0",
    })
    .setOrigin(0, 0);
  const propertyDescription = scene.add
    .text(0, 0, "3 houses, 1 factory, 1 hospital, 1 school, 3 main roads", {
      fontFamily: "Inter",
      fontSize: "16px",
      color: "#F29292",
    })
    .setOrigin(0, 0);
  detailContent.add([
    backButton,
    timeDescription,
    propertyTitle,
    propertyDescription,
  ]);
  detailContent.setVisible(false);

  scene.dialogContainer.add([
    ...dialogSetting,
    disasterTitle,
    informationButton,
    reportButton,
    informationContent,
    reportContent,
    detailContent,
  ]);
  showLeftPanel(scene);
};

const addInformation = (scene, data, y) => {
  const title = scene.add
    .text(0, y, data.title, defaultTitleStyle)
    .setOrigin(0, 0);

  const fixedWidth = 500;
  const textStyle = {
    fontFamily: "Inter",
    fontStyle: "Italic",
    fontSize: "16px",
    color: "#AF791C",
    wordWrap: { width: fixedWidth, useAdvancedWrap: true },
    align: "left",
  };
  const content = scene.add
    .text(0, y + 40, data.content, textStyle)
    .setOrigin(0, 0);

  return {
    data: [title, content],
    contentHeight: 80 + content.height,
  };
};

const addReport = (scene, data, y, onView) => {
  const title = scene.add
    .text(0, y, data.disaster, defaultTitleStyle)
    .setOrigin(0, 0);
  const content = scene.add
    .text(200, y, data.time, {
      fontFamily: "Inter",
      fontSize: "16px",
    })
    .setOrigin(0, 0);
  const viewButton = addButton(scene, "ViewButton", 470, y + 13, () =>
    onView(data)
  );
  return {
    data: [title, content, viewButton],
    contentHeight: 100,
  };
};

export default createDisasterDlg;
