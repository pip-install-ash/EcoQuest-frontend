import assetPack from "../packs/onbarding-asset-pack.json";
import {
  addButton,
  addTextButton,
  blurInputs,
  coloredBackground,
  scaleBackground,
} from "../partials/common";
import { createInputField } from "../partials/onBoarding";

const createOnBoardingScene = () => {
  return {
    key: "OnBoardingScene",
    preload: function () {
      assetPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
    },

    create: function () {
      const { width, height } = this.scale;
      coloredBackground(this, 0x000000);
      scaleBackground(this);

      // Create input fields
      createInputField(
        this,
        "usernameInput",
        width / 2 - 190,
        height / 2 - 90,
        "Enter your Email"
      );
      createInputField(
        this,
        "emailInput",
        width / 2 - 190,
        height / 2 + 22,
        "Enter your Username"
      );
      createInputField(
        this,
        "passwordInput",
        width / 2 - 190,
        height / 2 + 134,
        "Enter your Password"
      );

      addButton(this, "SignUpButton", 730, 800, () => {});
      addTextButton(
        this,
        "Sign In",
        830,
        720,
        "18px Rounded Mplus 1c",
        "#5E8114",
        0.5,
        0.5,
        () => {
          blurInputs();
          this.scene.start("SingInScene");
        }
      );
    },
  };
};

export default createOnBoardingScene;
