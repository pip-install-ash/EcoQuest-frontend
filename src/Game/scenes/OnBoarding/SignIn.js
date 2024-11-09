import {
  addButton,
  addCheckButton,
  fadeThisScreen,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";

const createOnBoardingSignInScene = () => {
  return {
    key: "OnBoardingSignInScene",
    preload: function () {},

    create: function () {
      const { width, height } = this.scale;
      scaleBackground(this, "SignInBackground");

      this.add
        .rexInputText(width / 2 - 190, height / 2 - 80, 380, 56, {
          type: "text",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Email",
          color: "#000",
        })
        .setOrigin(0, 0.5);

      this.add
        .rexInputText(width / 2 - 190, height / 2 + 32, 380, 56, {
          type: "password",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Password",
          color: "#000",
        })
        .setOrigin(0, 0.5);

      addButton(this, "SignInButton", 730, 750, () => {
        transitionToNextScene(this, "OnBoardingMenuScene");
      });
      addButton(this, "ForgotPasswordButton", 880, 500, () => {
        transitionToNextScene(this, "OnBoardingForgotPasswordScene");
      });
      addCheckButton(
        this,
        "CheckButtonOn",
        "CheckButton",
        false,
        520,
        615,
        () => {}
      );

      addButton(this, "SignUpTextButton", 830, 680, () => {
        transitionToNextScene(this, "OnBoardingSignUpScene");
      });

      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingSignInScene;
