const whiteBackground = (scene) => {
  const { width, height } = scene.scale;

  //White Background
  scene.add.rectangle(width / 2, height / 2, width, height, 0xffffff);
};

const coloredBackground = (scene, color) => {
  const { width, height } = scene.scale;

  //White Background
  scene.add.rectangle(width / 2, height / 2, width, height, color);
};

const addSprite = (scene, image, transform) => {
  const defaultTransform = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    originX: 0.5,
    originY: 0.5,
  };
  let targetTrasnform = {
    ...defaultTransform,
    ...transform,
  };
  const sprite = scene.add
    .image(targetTrasnform.x, targetTrasnform.y, image)
    .setOrigin(targetTrasnform.originX, targetTrasnform.originY);
  const aspectRatio = sprite.width / sprite.height;

  targetTrasnform = {
    ...targetTrasnform,
    width: sprite.width,
    height: sprite.height,
  };
  if (targetTrasnform.ratioFlag !== undefined) {
    if (targetTrasnform.ratioFlag) {
      targetTrasnform.width = targetTrasnform.height * aspectRatio;
    } else {
      targetTrasnform.height = targetTrasnform.width / aspectRatio;
    }
  }
  sprite.setDisplaySize(targetTrasnform.width, targetTrasnform.height);

  // Calculate aspect ratios
  // const imageAspect = sprite.width / sprite.height;
  // const screenAspect = width / height;

  // console.log(imageAspect, screenAspect);
  // if (imageAspect > screenAspect) {
  //   // Image is wider than the screen
  //   background.setDisplaySize(height * imageAspect, height);
  // } else {
  //   // Image is taller than the screen
  //   background.setDisplaySize(width, width / imageAspect);
  // }
};

const scaleBackground = (scene) => {
  const { width, height } = scene.scale;
  const background = scene.add.image(width / 2, height / 2, "Background");

  // Calculate aspect ratios
  const imageAspect = background.width / background.height;
  const screenAspect = width / height;

  if (imageAspect > screenAspect) {
    // Image is wider than the screen
    background.setDisplaySize(width, width / imageAspect);
  } else {
    // Image is taller than the screen
    background.setDisplaySize(height * imageAspect, height);
  }
  return background;
};

const addTextInput = (scene, x, y, w, h) => {
  const rect = scene.add.rectangle(x, y, w, h, 0xffffff).setOrigin(0);
  rect.setAlpha(0.5);
  return rect;
};

const addButton = (scene, image, x, y, onClick = () => {}) => {
  // Create an image button
  const button = scene.add
    .image(x, y, image)
    .setOrigin(0.5, 0.5)
    .setInteractive();

  button
    .on("pointerover", () => {
      scene.tweens.add({
        targets: button,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        ease: "Power1",
      });
    })
    .on("pointerout", () => {
      scene.tweens.add({
        targets: button,
        scaleX: 1,
        scaleY: 1,
        duration: 100,
        ease: "Power1",
      });
    })
    .on("pointerdown", () => {
      scene.tweens.add({
        targets: button,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 50,
        ease: "Power1",
      });
    })
    .on("pointerup", () => {
      scene.tweens.add({
        targets: button,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        ease: "Power1",
      });
      onClick();
    });
};

const addTextButton = (
  scene,
  text,
  x,
  y,
  font,
  fill,
  originX,
  originY,
  onClick = () => {}
) => {
  // Create a text button
  const buttonText = scene.add
    .text(x, y, text, { font, fill })
    .setOrigin(originX, originY)
    .setInteractive();

  // Button color animation
  buttonText
    .on("pointerover", () => {
      scene.tweens.add({
        targets: buttonText,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        ease: "Power1",
      });
    })
    .on("pointerout", () => {
      scene.tweens.add({
        targets: buttonText,
        scaleX: 1,
        scaleY: 1,
        duration: 100,
        ease: "Power1",
      });
    })
    .on("pointerdown", () => {
      scene.tweens.add({
        targets: buttonText,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 50,
        ease: "Power1",
      });
    })
    .on("pointerup", () => {
      scene.tweens.add({
        targets: buttonText,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        ease: "Power1",
      });
      onClick();
    });
};

const showInputField = (inputField, x, y, w, h) => {
  inputField.style.left = `${x}px`;
  inputField.style.top = `${y}px`;
  inputField.style.width = `${w}px`;
  inputField.style.height = `${h}px`;
  inputField.style.display = "block";
  inputField.focus();
};

const blurInputs = () => {
  const emailInput = document.getElementById('emailInput');
  const usernameInput = document.getElementById('usernameInput');
  const passwordInput = document.getElementById('passwordInput');
  emailInput.blur();
  usernameInput.blur();
  passwordInput.blur();
}

export {
  scaleBackground,
  whiteBackground,
  addSprite,
  coloredBackground,
  showInputField,
  addTextInput,
  addButton,
  addTextButton,
  blurInputs
};
