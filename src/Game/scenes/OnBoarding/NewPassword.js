import {
  addButton,
  blurInputs,
  emptyInputs,
  hideInputs,
  scaleBackground,
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
        this.scene.start("OnBoardingSignInScene");
      });

      addButton(this, "SignInTextButton", 770, 720, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        this.scene.start("OnBoardingSignInScene");
      });
    },
  };
};

export default createOnBoardingNewPassScene;
