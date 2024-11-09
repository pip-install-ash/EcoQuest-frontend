import {
  addButton,
  fadeThisScreen,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";

const createOnBoardingNewPassScene = () => {
  return {
    key: "OnBoardingNewPassScene",
    preload: function () {},

    create: function () {
      scaleBackground(this, "NewPassBackground");
      this.add
        .rexInputText(530, 455, 400, 56, {
          type: "password",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Password",
          color: "#000",
        })
        .setOrigin(0, 0.5);
        this.add
          .rexInputText(530, 570, 400, 56, {
            type: "password",
            text: "",
            fontSize: "20px",
            fontFamily: "Kreon",
            placeholder: "Confirm your Password",
            color: "#000",
          })
          .setOrigin(0, 0.5);

      addButton(this, "ResetButton", 730, 670, () => {
        transitionToNextScene(this, "OnBoardingSignInScene");
      });

      addButton(this, "SignInTextButton", 770, 720, () => {
        transitionToNextScene(this, "OnBoardingSignInScene");
      });
      
      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingNewPassScene;
