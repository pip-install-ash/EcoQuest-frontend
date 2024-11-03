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
  originY = 0.5,
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
 * Show Dialog with animation.
 *
 * @function showDialog
 * @param {scene}
 * @returns {array}
 */
const showDialog = (scene) => {
  // Show the dialog
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
  scene.tweens.add({
    targets: scene.dialogContainer,
    scaleX: 0,
    scaleY: 0,
    ease: "Back.easeIn",
    duration: 200,
    onComplete: () => scene.dialogContainer.setVisible(false), // Hide after animation
  });
};

export { organizeDialog, showDialog, closeDialog };
