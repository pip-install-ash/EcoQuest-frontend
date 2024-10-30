import {
  addButton,
  blurInputs,
  emptyInputs,
  hideInputs,
  scaleBackground,
} from "../../partials/common";

const createOnBoardingMenuScene = () => {
  return {
    key: "OnBoardingMenuScene",
    preload: function () {
    },

    create: function () {
      scaleBackground(this, "MenuBackground");
      addButton(this, "Menu-Start", 720, 340, () => {
        
      });
      addButton(this, "Menu-League", 720, 420, () => {});
      addButton(this, "Menu-Notification", 720, 500, () => {});
      addButton(this, "Menu-Leaderboard", 720, 580, () => {});
      addButton(this, "Menu-Setting", 720, 660, () => {});
      addButton(this, "Menu-HowToPlay", 720, 740, () => {});
      addButton(this, "Menu-Exit", 720, 820, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        this.scene.start("OnBoardingSignInScene");
      });
    },
  };
};

export default createOnBoardingMenuScene;
