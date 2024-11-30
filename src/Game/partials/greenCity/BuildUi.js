import createEditBuildingContent from "../../scenes/GreenCity/IsometricManager/EditBuilding";
import { addButton, addImage } from "../common";
import { organizeBuildPanel, showDialog } from "../menu/base";
const buttonImages = [
  ["TabRoadButton", "TabRoadOffButton"],
  ["TabGreenButton", "TabGreenOffButton"],
  ["TabIndustryButton", "TabIndustryOffButton"],
  ["TabEcoButton", "TabEcoOffButton"],
  ["TabHomeButton", "TabHomeOffButton"],
];
const tabs = [
  [{ id: 18, image: "B-Road" }],
  [
    { id: 12, image: "B-Park" },
    { id: 17, image: "B-PlantA" },
    { id: 16, image: "B-PlantB" },
    { id: 15, image: "B-PlantC" },
  ],
  [
    { id: 6, image: "B-School" },
    { id: 11, image: "B-Hospital" },
    { id: 7, image: "B-Factory" },
    { id: 8, image: "B-Shop" },
  ],
  [
    { id: 10, image: "B-WindTurbine" },
    { id: 9, image: "B-WasteRecycleCenter" },
    { id: 13, image: "B-HydroPowerDam" },
    { id: 14, image: "B-Solar" },
  ],
  [
    { id: 3, image: "B-HouseA" },
    { id: 4, image: "B-HouseB" },
    { id: 5, image: "B-SkyScrapper" },
  ],
];
/**
 * Makes a <BuildUi> panel.
 *
 * @function createBuildUi
 * @param {scene, left, top}
 * @returns {void}
 */
const BuildUi = (scene) => {
  addButton(scene, "BuildButton", 1345, 905, () => {
    if (!scene.isEditBuilding) {
      createBuildDlg(scene);
    }
  });
};

/**
 * Shows a <Build> dialog.
 *
 * @function createBuildDlg
 * @param {scene}
 * @returns {void}
 */
const createBuildDlg = (scene) => {
  const dialogSetting = organizeBuildPanel(scene);

  const buttons = [];
  let buttonX = 610;
  // side Home buttons
  buttonImages.forEach((buttonImage, index) => {
    const button = addButton(
      scene,
      buttonImage[index < 4 ? 1 : 0],
      buttonX,
      180,
      () => {
        buttons.forEach((v, i) => {
          v.setTexture(buttonImages[i][1]);
          contents[i].setVisible(false);
        });
        button.setTexture(buttonImage[0]);
        contents[index].setVisible(true);
        replaceButtons(buttons);
      },
      1,
      0.5
    );
    buttonX -= button.displayWidth + 20;
    buttons.push(button);
  });

  const contents = [];
  tabs.forEach((tab, i) => {
    const contentContainer = scene.add.container(0, 0);
    tab.forEach((building, j) => {
      contentContainer.add(
        addButton(scene, building.image, -505 + j * 170, 360, () => {
          createEditBuildingContent(scene, building.id, 15, 15);
          scene.dialogContainer.setVisible(false);
        })
      );
    });
    contentContainer.setVisible(false);
    contents.push(contentContainer);
  });
  contents[4].setVisible(true);

  const leftButton = addImage(scene, "LeftOffButton", -630, 360);
  const rightButton = addImage(scene, "RightOffButton", 630, 360);

  scene.dialogContainer.add([
    ...dialogSetting,
    ...buttons,
    ...contents,
    leftButton,
    rightButton,
  ]);
  showDialog(scene);
};

const replaceButtons = (buttons) => {
  let buttonX = 610;
  buttons.forEach((button) => {
    button.x = buttonX;
    buttonX -= button.displayWidth + 20;
  });
};
export default BuildUi;
