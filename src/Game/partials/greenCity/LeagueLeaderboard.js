import { addText } from "../common";
import { organizeDialog, showDialog } from "../menu/base";
import Phaser from "phaser";

/**
 * Shows a <LeagueLeaderboard> dialog.
 *
 * @function createLeagueLeaderboardDlg
 * @param {scene}
 * @returns {void}
 */
const createLeagueLeaderboardDlg = (scene) => {
  const dialogSetting = organizeDialog(
    scene,
    "LeagueLeaderboardDialog",
    978,
    824,
    0.5,
    0.37
  );
  //Display League title
  const leagueTitle = addText(
    scene,
    "Titanic House",
    0,
    -230,
    "Inter",
    "32px",
    "Bold",
    "#fcb651",
    0.5,
    0.5
  );

  const viewWidth = 978;
  const viewHeight = 580;
  const contentHeight = 700;
  const contentContainer = scene.add.container(0, 0);

  const rankingData = [
    {
      ranking: 1,
      user: "David251",
      ecoScore: 200,
    },
    {
      ranking: 2,
      user: "David251",
      ecoScore: 200,
    },
    {
      ranking: 3,
      user: "David251",
      ecoScore: 200,
    },
    {
      ranking: 4,
      user: "David251",
      ecoScore: 200,
    },
    {
      ranking: 5,
      user: "David251",
      ecoScore: 200,
    },
    {
      ranking: 6,
      user: "David251",
      ecoScore: 200,
    },
    {
      ranking: 7,
      user: "David251",
      ecoScore: 200,
    },
  ];

  rankingData.forEach((v) => {
    contentContainer.add(addRanking(scene, v.ranking, v.user, v.ecoScore));
  });

  const maskShape = scene.make.graphics();
  maskShape.fillRect(250, 420, viewWidth, viewHeight);
  const mask = maskShape.createGeometryMask();
  contentContainer.setMask(mask);

  let startY;
  scene.input.on("pointerdown", (pointer) => {
    startY = pointer.y;
  });

  scene.input.on("pointermove", (pointer) => {
    if (pointer.isDown) {
      const deltaY = pointer.y - startY;
      startY = pointer.y;

      // Move the container, but limit scrolling within bounds
      contentContainer.y += deltaY;
      contentContainer.y = Phaser.Math.Clamp(
        contentContainer.y,
        viewHeight - contentHeight,
        0
      );
    }
  });
  scene.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
    // Adjust the scroll speed to your preference
    const scrollSpeed = 1;
    contentContainer.y -= deltaY * scrollSpeed;
    contentContainer.y = Phaser.Math.Clamp(
      contentContainer.y,
      viewHeight - contentHeight,
      0
    );
  });

  scene.dialogContainer.add([...dialogSetting, leagueTitle, contentContainer]);
  showDialog(scene);
};

const addRanking = (scene, ranking, user, ecoScore) => {
  const rankingText = addText(
    scene,
    `${ranking}`,
    -430,
    -130 + ranking * 100,
    "Inter",
    "20px",
    "Bold",
    "#fff",
    0,
    0.5
  );
  const userText = addText(
    scene,
    user,
    -130,
    -130 + ranking * 100,
    "Inter",
    "20px",
    "Bold",
    "#fff",
    0,
    0.5
  );
  const scoreText = addText(
    scene,
    `${ecoScore} eco points`,
    280,
    -130 + ranking * 100,
    "Inter",
    "20px",
    "Bold",
    "#FCB651",
    0,
    0.5
  );
  return [rankingText, userText, scoreText];
};

export default createLeagueLeaderboardDlg;
