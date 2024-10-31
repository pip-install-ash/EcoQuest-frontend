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

const createOnBoardingNewPassScene = () => {
  return {
    key: "OnBoardingNewPassScene",
    preload: function () {},

    create: function () {
      scaleBackground(this, "NewPassBackground");

      createInputField(this, "passwordInput", 530, 445, "Enter your Password");
      createInputField(this, "confirmInput", 530, 555, "Confirm your Password");

      addButton(this, "ResetButton", 730, 670, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "OnBoardingSignInScene");
      });

      addButton(this, "SignInTextButton", 770, 720, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "OnBoardingSignInScene");
      });
      
      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingNewPassScene;
