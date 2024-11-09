import {
  addButton,
  fadeThisScreen,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";

const createOnBoardingSignUpScene = () => {
  return {
    key: "OnBoardingSignUpScene",
    preload: function () {
    },

    create: function () {
      const { width, height } = this.scale;
      scaleBackground(this, "SignUpBackground");

      // Create input fields
      this.add
        .rexInputText(width / 2 - 190, height / 2 - 80, 400, 56, {
          type: "email",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Email",
          color: "#000",
        })
        .setOrigin(0, 0.5);
      this.add
        .rexInputText(width / 2 - 190, height / 2 + 32, 400, 56, {
          type: "text",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Username",
          color: "#000",
        })
        .setOrigin(0, 0.5);
      this.add
        .rexInputText(width / 2 - 190, height / 2 + 144, 400, 56, {
          type: "password",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Password",
          color: "#000",
        })
        .setOrigin(0, 0.5);

      addButton(this, "SignUpButton", 730, 800, () => {});
      addButton(this, "SignInTextButton", 820, 720, () => {
        transitionToNextScene(this, "OnBoardingSignInScene");
      });
      
      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingSignUpScene;
