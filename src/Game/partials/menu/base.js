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

/**
 * Initialize BuildPanel background and close button.
 *
 * @function organizeBuildPanel
 * @param {scene}
 * @returns {array}
 */
const organizeBuildPanel = (scene) => {
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
const organizeLeftPanel = (scene) => {
  scene.dialogContainer.removeAll(true);
  const dialogBackground = scene.add
    .image(-720, 0, "LeftPanel")
    .setOrigin(0, 0.5)
    .setInteractive();

  // Close button
  const closeButton = addButton(scene, "CloseButton", -200, -430, () => {
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
    onComplete: () => scene.dialogContainer.setVisible(false), // Hide after animation
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
  organizeDialog,
  organizeBuildPanel,
  showDialog,
  showLeftPanel,
  closeDialog,
  closeLeftPanel,
  organizeLeftPanel
};
