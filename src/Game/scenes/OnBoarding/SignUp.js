import {
  addButton,
  blurInputs,
  emptyInputs,
  fadeThisScreen,
  hideInputs,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";
import { createInputField } from "../../partials/onBoarding";

const createOnBoardingSignUpScene = () => {
  return {
    key: "OnBoardingSignUpScene",
    preload: function () {
    },

    create: function () {
      const { width, height } = this.scale;
      scaleBackground(this, "SignUpBackground");

      // Create input fields
      createInputField(
        this,
        "emailInput",
        width / 2 - 190,
        height / 2 - 90,
        "Enter your Email"
      );
      createInputField(
        this,
        "usernameInput",
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
      addButton(this, "SignInTextButton", 820, 720, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "OnBoardingSignInScene");
      });
      
      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingSignUpScene;
