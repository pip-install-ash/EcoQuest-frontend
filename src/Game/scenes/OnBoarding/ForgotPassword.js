import {
  addButton,
  fadeThisScreen,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";

const createOnBoardingForgotPasswordScene = () => {
  return {
    key: "OnBoardingForgotPasswordScene",
    preload: function () {},

    create: function () {
      scaleBackground(this, "ForgotPasswordBackground");
      this.add
        .rexInputText(530, 432, 400, 56, {
          type: "text",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Email",
          color: "#000",
        })
        .setOrigin(0, 0.5);

      addButton(this, "SendButton", 732, 515, () => {
        transitionToNextScene(this, "OnBoardingCheckMailScene");
      });
      addButton(this, "SignInTextButton", 755, 565, () => {
        transitionToNextScene(this, "OnBoardingSignInScene");
      });

      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingForgotPasswordScene;
