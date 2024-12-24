import { addButton } from "../common";

/**
 * Initialize Dialog background and close button.
 *
 * @function organizeDialog
 * @param {scene, backgroundImage, w, h, originX, originY}
 * @returns {array}
 */
const organizeDialog = (
  scene,
  backgroundImage,
  w,
  h,
  originX = 0.5,
  originY = 0.5
) => {
  scene.createEcoChallengeDlg?.isSceneClosed?.(); //clear intervals of eco-challenge
  // Clear previous dialog contents
  scene.dialogContainer.removeAll(true);

  // Background for the dialog
  const dialogBackground = scene.add
    .image(0, 0, backgroundImage)
    .setDisplaySize(w, h)
    .setOrigin(originX, originY)
    .setInteractive();

  // Close button
  const closeButton = addButton(
    scene,
    "CloseButton",
    w * originX - 9,
    -(h * originY) + 7,
    () => {
      closeDialog(scene);
    }
  );
  return [dialogBackground, closeButton];
};

function displayNotification(scene, notification, yOffset) {
  // Background Box
  const box = scene.add.rectangle(700, yOffset, 900, 80, 0x222222, 0.9);
  // box.setStrokeStyle(2, 0xffffff);

  // Notification Icon
  const icon = scene.add.image(100, yOffset, notification.notificationType);
  icon.setScale(0.8);

  // Notification Text
  const text = scene.add
    .text(150, yOffset - 20, notification.message, {
      fontSize: "14px",
      color: "#ffffff",
      fontFamily: "Arial",
    })
    .setOrigin(0);

  // Parse HTML for rich formatting
  text.setText(notification.message.replace(/<[^>]+>/g, ""));

  // Time Elapsed
  const timeText = scene.add.text(780, yOffset - 20, notification.time, {
    fontSize: "14px",
    color: "#bbbbbb",
    fontFamily: "Arial",
  });

  // Go Button
  const goButton = addButton(scene, "GoButton", 950, yOffset, () => {
    console.log("Go Button Clicked for:", notification.message);
  });

  const clearButton = addButton(scene, "ClearButton", 1000, yOffset, () => {
    clearAllButton();
  });

  scene.dialogContainer.add(goButton, clearButton);
  const clearAllButton = () => {
    box.destroy();
    text.destroy();
    timeText.destroy();
    goButton.destroy();
    clearButton.destroy();
    icon.destroy();
  };

  return clearAllButton;
}

/**
 * Initialize BuildPanel background and close button.
 *
 * @function organizeBuildPanel
 * @param {scene}
 * @returns {array}
 */
const organizeBuildPanel = (scene) => {
  scene.createEcoChallengeDlg?.isSceneClosed?.();
  scene.dialogContainer.removeAll(true);

  const dialogBackground = scene.add
    .image(0, 500, "Panel")
    .setOrigin(0.5, 1)
    .setInteractive();

  // Close button
  const closeButton = addButton(scene, "CloseButton", 650, 180, () => {
    scene.dialogContainer.setVisible(false);
  });
  return [dialogBackground, closeButton];
};

/**
 * Initialize LeftPanel background and close button.
 *
 * @function organizeLeftPanel
 * @param {scene}
 * @returns {array}
 */
const organizeLeftPanel = (scene, isSceneClosed) => {
  scene.dialogContainer.removeAll(true);

  const dialogBackground = scene.add
    .image(-720, 0, "LeftPanel")
    .setOrigin(0, 0.5)
    .setInteractive();

  // Close button
  const closeButton = addButton(scene, "CloseButton", -200, -430, () => {
    isSceneClosed?.();
    closeLeftPanel(scene);
  });
  return [dialogBackground, closeButton];
};
/**
 * Show Dialog with animation.
 *
 * @function showDialog
 * @param {scene}
 * @returns {array}
 */
const showDialog = (scene) => {
  // Show the dialog
  scene.dialogContainer.setVisible(true).setX(720);
  scene.dialogContainer.setVisible(true).setScale(0.8);
  scene.tweens.add({
    targets: scene.dialogContainer,
    scaleX: 1,
    scaleY: 1,
    ease: "Back.easeOut",
    duration: 200,
  });
};

/**
 * Close Dialog with animation.
 *
 * @function closeDialog
 * @param {scene}
 * @returns {array}
 */
const closeDialog = (scene) => {
  scene.dialogContainer.setVisible(true).setX(720);
  scene.tweens.add({
    targets: scene.dialogContainer,
    scaleX: 0,
    scaleY: 0,
    ease: "Back.easeIn",
    duration: 200,
    onComplete: () => {
      scene.dialogContainer.removeAll(true);
      scene.dialogContainer.setVisible(false);
    },
  });
};
/**
 * Show LeftPanel with animation.
 *
 * @function showLeftPanel
 * @param {scene}
 * @returns {array}
 */
const showLeftPanel = (scene) => {
  // Show the dialog
  scene.dialogContainer.setVisible(true).setX(0);
  scene.dialogContainer.setVisible(true).setScale(1);
  scene.tweens.add({
    targets: scene.dialogContainer,
    x: 720,
    duration: 300,
  });
};

/**
 * Close LeftPanel with animation.
 *
 * @function closeLeftPanel
 * @param {scene}
 * @returns {array}
 */
const closeLeftPanel = (scene) => {
  scene.dialogContainer.setVisible(true).setScale(1);
  scene.tweens.add({
    targets: scene.dialogContainer,
    x: 0,
    duration: 300,
    onComplete: () => scene.dialogContainer.setVisible(false), // Hide after animation
  });
};
export {
  displayNotification,
  organizeDialog,
  organizeBuildPanel,
  showDialog,
  showLeftPanel,
  closeDialog,
  closeLeftPanel,
  organizeLeftPanel,
};
