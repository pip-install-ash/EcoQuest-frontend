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

const createOnBoardingForgotPasswordScene = () => {
  return {
    key: "OnBoardingForgotPasswordScene",
    preload: function () {},

    create: function () {
      scaleBackground(this, "ForgotPasswordBackground");

      createInputField(this, "emailInput", 530, 422, "Enter your Email");

      addButton(this, "SendButton", 732, 515, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "OnBoardingCheckMailScene");
      });
      addButton(this, "SignInTextButton", 755, 565, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "OnBoardingSignInScene");
      });
      
      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingForgotPasswordScene;
