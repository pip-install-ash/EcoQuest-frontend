import assetPack from "../packs/onbarding-asset-pack.json";
import Phaser from "phaser";
import {
  addSprite,
  coloredBackground,
  scaleBackground,
  whiteBackground,
} from "../partials/common";
import {
  createInputField,
  onSignUp,
  styleDialog,
} from "../partials/onBoarding";

const createOnBoardingScene = () => {
  return {
    key: "OnBoardingScene",
    preload: function () {
      assetPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
    },

    create: function () {

      coloredBackground(this, 0x000000);
      scaleBackground(this);

      // Create a background for the dialog
      const dialogBackground = this.add
        .rectangle(400, 300, 400, 300, 0x222222)
        .setOrigin(0.5)
        .setStrokeStyle(2, 0xffffff);


      // Create input fields
      const usernameInput = createInputField(this, 400, 320, "Username");
      const passwordInput = createInputField(this, 400, 370, "Password", true);
      console.log(usernameInput.node);
      // Create a sign-up button
      const signUpButton = this.add
        .text(400, 420, "Sign Up", { fontSize: "24px", fill: "#fff" })
        .setOrigin(0.5)
        .setInteractive()
        .on("pointerdown", () => onSignUp(usernameInput, passwordInput))
        .on("pointerover", () => signUpButton.setStyle({ fill: "#ff0" }))
        .on("pointerout", () => signUpButton.setStyle({ fill: "#fff" }));

      // Style the dialog
      styleDialog(
        this,
        dialogBackground,
        usernameInput,
        passwordInput,
        signUpButton
      );

    },
  };
};

export default createOnBoardingScene;
