import { addButton, addImage } from "../common";

const organizeBackground = (scene, backgroundImage, w, h) => {
  // Clear previous dialog contents
  scene.dialogContainer.removeAll(true);

  // Background for the dialog
  const dialogBackground = scene.add
    .image(0, 0, backgroundImage)
    .setDisplaySize(w, h)
    .setOrigin(0.5)
    .setInteractive();
  return dialogBackground;
};

/**
 * Shows a <HowToPlay> dialog.
 *
 * @function createHowToPlayDlg
 * @param scene
 * @returns {void}
 */

const createHowToPlayDlg = (scene) => {
  const dialogBackground = organizeBackground(
    scene,
    "HowToPlayDialog",
    878,
    675
  );
  // Close button
  const closeButton = addButton(scene, "CloseButton", 430, -330, () => {
    scene.tweens.add({
      targets: scene.dialogContainer,
      scaleX: 0,
      scaleY: 0,
      ease: "Back.easeIn",
      duration: 500,
      onComplete: () => scene.dialogContainer.setVisible(false), // Hide after animation
    });
  });
  const ruleImage = addImage(scene, "SoloRule", 0, 75);

  const soloButton = addButton(scene, "SoloButton", -210, -200, () => {
    ruleImage.setTexture("SoloRule");
    soloButton.setTexture("SoloButton");
    multiButton.setTexture("MultiButtonOff");
  });
  const multiButton = addButton(scene, "MultiButtonOff", 210, -200, () => {
    ruleImage.setTexture("MultiRule");
    soloButton.setTexture("SoloButtonOff");
    multiButton.setTexture("MultiButton");
  });

  //   const inputText = scene.add
  //     .rexInputText(0, 0, 100, 100, {
  //       type: "textarea",
  //       text: "hello world",
  //       fontSize: "12px",
  //     })
  //     .resize(100, 100)
  //     .setOrigin(0.5);

  //   scene.input.on("pointerdown", function () {
  //     inputText.setBlur();
  //   });

  // Add all elements to the container
  scene.dialogContainer.add([
    dialogBackground,
    closeButton,
    soloButton,
    multiButton,
    ruleImage,
  ]);

  // Show the dialog
  scene.dialogContainer.setVisible(true).setScale(0);
  scene.tweens.add({
    targets: scene.dialogContainer,
    scaleX: 1,
    scaleY: 1,
    ease: "Back.easeOut",
    duration: 500,
  });
};

export { createHowToPlayDlg };
