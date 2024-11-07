import {
  addButton,
  addCheckButton,
  addText,
  blurInputs,
  emptyInputs,
  fadeThisScreen,
  hideInputs,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";

const createOnBoardingCheckMailScene = () => {
  return {
    key: "OnBoardingCheckMailScene",
    preload: function () {},

    create: function () {
      scaleBackground(this, "CheckEmailBackground");
      addText(
        this,
        "Enter the 6 digit code sent to hello********@email.com",
        720,
        325,
        "Kreon",
        "20px",
        "Bold",
        "#3D3D3D",
        0.5,
        0
      );
      addButton(this, "VerifyButton", 720, 535, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "OnBoardingNewPassScene");
      });
      addButton(this, "SignInTextButton", 765, 595, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "OnBoardingSignInScene");
      });
      addButton(this, "ResendButton", 835, 465, () => {});

      for (var i = -2.5; i < 3; i++) {
        addCheckButton(
          this,
          "DigitalInputOn",
          "DigitalInput",
          false,
          720 + i * 80,
          400,
          () => {}
        );
      }

      
      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingCheckMailScene;
