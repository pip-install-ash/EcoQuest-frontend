import {
  addButton,
  blurInputs,
  emptyInputs,
  hideInputs,
  scaleBackground,
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
        this.scene.start("OnBoardingCheckMailScene");
      });
      addButton(this, "SignInTextButton", 755, 565, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        this.scene.start("OnBoardingSignInScene");
      });
    },
  };
};

export default createOnBoardingForgotPasswordScene;
