import {
  addButton,
  addImage,
  addText,
  fadeThisScreen,
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
        transitionToNextScene(this, "OnBoardingNewPassScene");
      });
      addButton(this, "SignInTextButton", 765, 595, () => {
        transitionToNextScene(this, "OnBoardingSignInScene");
      });
      addButton(this, "ResendButton", 835, 465, () => {});

      this.checkMailCodeTexts = [];
      this.checkMailCodeBoxes = [];
      this.currentCheckMailCodeIndex = 0;
      for (var i = -2.5; i < 3; i++) {
        this.checkMailCodeBoxes.push(
          addImage(this, "DigitalInput", 720 + i * 80, 400)
        );
        this.checkMailCodeTexts.push(
          this.add
            .text(720 + i * 80, 400, "", {
              fontFamily: "Inter",
              fontSize: "18px",
              fontStyle: "bold",
              color: "#000",
            })
            .setOrigin(0.5)
        );
      }
      this.checkMailCodeBoxes[0].setTexture("DigitalInputOn");
      this.input.keyboard.on("keydown", (event) => {
        if (this.currentCheckMailCodeIndex > 5)
          this.currentCheckMailCodeIndex = 5;
        if (this.currentCheckMailCodeIndex < 0)
          this.currentCheckMailCodeIndex = 0;
        if (event.key.length === 1 && event.key >= "0" && event.key <= "9") {
          if (this.currentCheckMailCodeIndex < 6)
            this.checkMailCodeBoxes[this.currentCheckMailCodeIndex].setTexture(
              "DigitalInputOn"
            );
          this.checkMailCodeTexts[this.currentCheckMailCodeIndex++].text =
            event.key;
        } else if (event.key === "Backspace") {
          if (this.currentCheckMailCodeIndex >= 0)
            this.checkMailCodeBoxes[this.currentCheckMailCodeIndex].setTexture(
              "DigitalInput"
            );
          this.checkMailCodeTexts[this.currentCheckMailCodeIndex--].text = "";
        }
      });

      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingCheckMailScene;
