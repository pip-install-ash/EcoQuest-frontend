import {
  addButton,
  addCheckButton,
  blurInputs,
  emptyInputs,
  fadeThisScreen,
  hideInputs,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";
import { createInputField } from "../../partials/onBoarding";

const createOnBoardingSignInScene = () => {
  return {
    key: "OnBoardingSignInScene",
    preload: function () {
    },

    create: function () {
      const { width, height } = this.scale;
      scaleBackground(this, "SignInBackground");

      createInputField(
        this,
        "emailInput",
        width / 2 - 190,
        height / 2 - 90,
        "Enter your Email"
      );
      createInputField(
        this,
        "passwordInput",
        width / 2 - 190,
        height / 2 + 22,
        "Enter your Password"
      );

      addButton(this, "SignInButton", 730, 750, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "OnBoardingMenuScene");
      });
      addButton(this, "ForgotPasswordButton", 880, 500, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
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
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "OnBoardingSignUpScene");
      });

      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingSignInScene;
