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

const scaleBackground = (scene, image) => {
  const { width, height } = scene.scale;
  const background = scene.add.image(width / 2, height / 2, image);

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

const addButton = (
  scene,
  image,
  x,
  y,
  onClick = () => {},
  originX = 0.5,
  originY = 0.5
) => {
  // Create an image button
  const button = scene.add
    .image(x, y, image)
    .setOrigin(originX, originY)
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
  return button;
};

const addImage = (scene, image, x, y) => {
  // Create an image button
  const imageElement = scene.add
    .image(x, y, image)
    .setOrigin(0.5, 0.5)
    .setInteractive();

  return imageElement;
};

const addCheckButton = (
  scene,
  imageOn,
  imageOff,
  defaultVal,
  x,
  y,
  onChangeVal = (val) => {}
) => {
  // Create an image button
  const button = scene.add
    .image(x, y, defaultVal ? imageOn : imageOff)
    .setOrigin(0.5, 0.5)
    .setInteractive();
  button.setData("checked", defaultVal); // Store checked state

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

      const checked = button.getData("checked");
      button.setData("checked", !checked);

      // Update the appearance based on the checked state
      if (checked) {
        button.setTexture(imageOff); // Set to unchecked image
      } else {
        button.setTexture(imageOn); // Set to checked image
      }

      onChangeVal(checked);
    })
    .on("pointerup", () => {
      scene.tweens.add({
        targets: button,
        scaleX: 1.1,
        scaleY: 1.1,
        duration: 100,
        ease: "Power1",
      });
    });
  return button;
};

const addText = (
  scene,
  text,
  x,
  y,
  fontFamily,
  fontSize,
  fontStyle,
  fill,
  originX,
  originY,
  stroke = "#000000",
  strokeThickness = 0
) => {
  const textItem = scene.add
    .text(x, y, text, {
      fontFamily,
      fontSize,
      fontStyle,
      fill,
      resolution: 2,
      stroke,
      strokeThickness,
    })
    .setOrigin(originX, originY)
    .setInteractive();
  return textItem;
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
    .text(x, y, text, { font, fill, resolution: 2 })
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
  const emailInput = document.getElementById("emailInput");
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const confirmInput = document.getElementById("confirmInput");
  emailInput.blur();
  usernameInput.blur();
  passwordInput.blur();
  confirmInput.blur();
};
const emptyInputs = () => {
  const emailInput = document.getElementById("emailInput");
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const confirmInput = document.getElementById("confirmInput");
  emailInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";
  confirmInput.value = "";
};

const hideInputs = () => {
  const emailInput = document.getElementById("emailInput");
  const usernameInput = document.getElementById("usernameInput");
  const passwordInput = document.getElementById("passwordInput");
  const confirmInput = document.getElementById("confirmInput");
  emailInput.style.display = "none";
  usernameInput.style.display = "none";
  passwordInput.style.display = "none";
  confirmInput.style.display = "none";
};

const transitionToNextScene = (scene, nextScene) => {
  const { width, height } = scene.scale;
  // Add a black rectangle to cover the screen for the fade effect
  const fadeOverlay = scene.add
    .rectangle(width / 2, height / 2, width, height, 0x000000)
    .setAlpha(0);

  // Fade out current scene
  scene.tweens.add({
    targets: fadeOverlay,
    alpha: 0.5, // Fade to fully opaque
    duration: 200, // Duration of fade out
    onComplete: () => {
      scene.scene.start(nextScene); // Start the next scene after fade out
    },
  });
};

const fadeThisScreen = (scene) => {
  // Add a black rectangle to cover the screen for the fade-in effect
  const fadeOverlay = scene.add
    .rectangle(720, 512, 1440, 1024, 0x000000)
    .setAlpha(0.5);

  // Fade in from black
  scene.tweens.add({
    targets: fadeOverlay,
    alpha: 0, // Fade to transparent
    duration: 200, // Duration of fade in
    onComplete: () => fadeOverlay.destroy(), // Remove overlay after fade
  });
};

const addSlider = (
  scene,
  defaultVal,
  x,
  y,
  w,
  h,
  r,
  color,
  onChangeVal = (val) => {},
  id = 1,
  step = 20
) => {
  // const track = scene.add.rectangle(x, y, w, h, 0xd9d9d9);
  const track = scene.add.graphics();
  track.fillStyle(0xd9d9d9, 1);
  track.fillRoundedRect(x - w / 2, y - h / 2, w, h, h / 2);
  track.fillStyle(color, 1);
  track.fillRoundedRect(x - w / 2, y - h / 2, h, h, h / 2);

  const progress = scene.add
    .rectangle(x - w / 2 + h / 2, y, defaultVal * w - h / 2, h, color)
    .setOrigin(0, 0.5);

  const handle = scene.add.circle(x + w * (defaultVal - 0.5), y, r, color);
  handle.sliderData = {
    id,
    progress,
  };
  handle.setInteractive({ draggable: true });

  scene.input.setDraggable(handle);
  scene.input.on("drag", (pointer, gameObject, dragX, dragY) => {
    let sliderData = gameObject.sliderData;
    if (sliderData) {
      if (dragX >= x - w / 2 && dragX <= x + w / 2 && sliderData.id === id) {
        gameObject.x = dragX;
        sliderData.progress.displayWidth = dragX - x + w / 2 - h / 2;
        onChangeVal((dragX - x + w / 2) / w);
      }
    }
  });
  return [track, handle, progress];
};

const addInputFiled = (scene, x, y, w, h, textColor, cursorColor) => {
  scene.inputText = ""; // Stores the input text
  scene.cursorVisible = true; // Controls cursor blinking

  // Create an interactive area for text input
  const inputBox = scene.add
    .rectangle(x, y, w, h, 0xffffff, 0)
    .setOrigin(0.5)
    .setInteractive()
    .on("pointerdown", () => {});

  // Display text inside the input box
  const displayText = scene.add
    .text(x - w / 2, y, "", {
      fontSize: "24px",
      color: textColor,
      fontFamily: "Arial",
      wordWrap: { width: w }, // Wrap text if necessary
    })
    .setOrigin(0, 0.5);

  // Create a blinking cursor
  const cursor = scene.add
    .rectangle(x - w / 2, y, 4, 24, cursorColor)
    .setOrigin(0, 0.5);

  // Blinking cursor effect
  scene.time.addEvent({
    delay: 500,
    callback: () => {
      scene.cursorVisible = !scene.cursorVisible;
      cursor.setVisible(scene.cursorVisible);
    },
    loop: true,
  });

  // Keydown event to capture text input
  scene.input.keyboard.on("keydown", (event) => {
    if (event.key.length === 1 && displayText.width < w - 35) {
      scene.inputText += event.key;
    } else if (event.key === "Backspace") {
      scene.inputText = scene.inputText.slice(0, -1);
    }

    // Update the text and cursor position
    displayText.setText(scene.inputText);
    // Position cursor at the end of the text inside the input box
    const textWidth = displayText.width;
    const cursorX = x - w / 2 + textWidth + 2;
    cursor.setPosition(cursorX, y);
  });

  return [inputBox, displayText, cursor];
};

///add ComboBox

const COLOR_MAIN = 0xffffff;

const CreateTextObject = (scene, text, color = "#000") => {
  return scene.add.text(0, 0, text, {
    fontFamily: "inter",
    fontSize: 20,
    color,
  });
};

const addComboBox = (scene, x, y, w, options, placeholder) => {
  const dropDownList = scene.rexUI.add
    .dropDownList({
      x,
      y,

      background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 16, null),
      text: CreateTextObject(scene, placeholder).setFixedSize(w, 0),

      space: {
        left: 15,
        right: 15,
        top: 15,
        bottom: 15,
        icon: 10,
      },

      options: options,

      list: {
        createBackgroundCallback: function (scene) {
          return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN);
        },
        createButtonCallback: function (scene, option, index, options) {
          var text = option.text;
          var button = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),

            text: CreateTextObject(scene, text, "#000"),

            space: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
              icon: 10,
            },
          });
          button.value = option.value;

          return button;
        },
        onButtonClick: function (button, index, pointer, event) {
          dropDownList.text = button.text;
          dropDownList.textStyle = { color: "#000" };
        },
        onButtonOver: function (button, index, pointer, event) {
          button.getElement("background").setFillStyle(0xc0c0c0);
        },
        onButtonOut: function (button, index, pointer, event) {
          button.getElement("background").setFillStyle(0xffffff);
        },
      },

      setValueCallback: function (dropDownList, value, previousValue) {
        console.log(value);
      },
      value: undefined,
    })
    .setOrigin(0, 0.5)
    .layout();
  return dropDownList;
};

export {
  scaleBackground,
  whiteBackground,
  addSprite,
  coloredBackground,
  showInputField,
  addTextInput,
  addButton,
  addCheckButton,
  addTextButton,
  addText,
  addImage,
  addSlider,
  blurInputs,
  emptyInputs,
  hideInputs,
  transitionToNextScene,
  fadeThisScreen,
  addInputFiled,
  addComboBox,
};
