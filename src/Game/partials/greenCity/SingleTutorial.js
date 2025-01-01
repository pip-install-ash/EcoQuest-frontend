import { addButton, addImage } from "../common";
const texts = [
  `Hello ${localStorage.getItem(
    "userName"
  )} and welcome!\nMy name is Paul and i will be your personal Assistant for your City.\nFirst, lets get familiar with everything`,
  "This is the HOME button to take you back to the main menu",
  "that’s the SETTINGS PAGE button",
  "RULES AND REGULATIONS, you can read the rules and regulations here",
  "You can access the LEADERBOARD here",
  "There will be occasional disasters, you can check that on this DISASTER PAGE",
  "Access your Eco Challenge here to earn rewards",
  "You can view how much resources you have left to carry out actions",
  "Now let’s start by building residential housing  Click on “Build”",
];
const handPoints = [
  { x: -300, y: -300, angle: 0 },
  { x: 130, y: 360, angle: 135 },
  { x: 130, y: 460, angle: 135 },
  { x: 130, y: 560, angle: 135 },
  { x: 130, y: 660, angle: 135 },
  { x: 130, y: 870, angle: 135 },
  { x: 130, y: 970, angle: 135 },
  { x: 1000, y: 200, angle: 220 },
  { x: 1330, y: 790, angle: 0 },
];
const createSingleTutorial = (scene) => {
  scene.currentTutorial = 0;
  const tutorialContainer = scene.add.container(0, 0);
  tutorialContainer.add(addImage(scene, "Assistant", 143, 950));
  tutorialContainer.add(
    addButton(scene, "GuideLeftButton", 394, 948, () => {
      scene.currentTutorial =
        scene.currentTutorial > 0 ? scene.currentTutorial - 1 : 0;
      text.text = texts[scene.currentTutorial];
      back.clear();
      back.fillStyle(0xffffff, 1);
      back.fillRoundedRect(230, 890 - text.height, 320, text.height + 20, 16);
      image.x = handPoints[scene.currentTutorial].x;
      image.y = handPoints[scene.currentTutorial].y;
      image.angle = handPoints[scene.currentTutorial].angle;
    })
  );
  tutorialContainer.add(
    addButton(scene, "GuideRightButton", 458, 948, () => {
      if (scene.currentTutorial === 8) {
        scene.showTutorial = false;
        tutorialContainer.destroy();
      }
      scene.currentTutorial =
        scene.currentTutorial < 8 ? scene.currentTutorial + 1 : 8;
      text.text = texts[scene.currentTutorial];
      back.clear();
      back.fillStyle(0xffffff, 1);
      back.fillRoundedRect(230, 890 - text.height, 320, text.height + 20, 16);
      image.x = handPoints[scene.currentTutorial].x;
      image.y = handPoints[scene.currentTutorial].y;
      image.angle = handPoints[scene.currentTutorial].angle;
    })
  );
  tutorialContainer.add(
    addButton(scene, "GuideSkipButton", 527, 948, () => {
      scene.showTutorial = false;
      tutorialContainer.destroy();
    })
  );
  const back = scene.add.graphics();
  back.fillStyle(0xffffff, 1);
  tutorialContainer.add(back);
  const text = scene.add
    .text(400, 900, texts[scene.currentTutorial], {
      fontFamily: "Kreon",
      fontSize: 18,
      fontStyle: "bold",
      color: "#000",
      wordWrap: { width: 300, useAdvancedWrap: true },
      align: "left",
    })
    .setOrigin(0.5, 1);
  tutorialContainer.add(text);
  back.fillRoundedRect(230, 890 - text.height, 320, text.height + 20, 16);

  const image = addImage(scene, "Hand", -300, -300);
  image.angle = 135;
  image.setInteractive(false);
  tutorialContainer.add(image);
};
export default createSingleTutorial;
