import {
  addButton,
  blurInputs,
  emptyInputs,
  fadeThisScreen,
  hideInputs,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";
import { createHowToPlayDlg } from "../../partials/menu/howToPlay";

const createOnBoardingMenuScene = () => {
  return {
    key: "OnBoardingMenuScene",
    preload: function () {
      // this.load.plugin(
      //   "rexinputtextplugin",
      //   "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js",
      //   true
      // );
    },

    create: function () {
      scaleBackground(this, "MenuBackground");

      addButton(this, "Menu-Start", 720, 340, () => {});
      addButton(this, "Menu-League", 720, 420, () => {});
      addButton(this, "Menu-Notification", 720, 500, () => {});
      addButton(this, "Menu-Leaderboard", 720, 580, () => {});
      addButton(this, "Menu-Setting", 720, 660, () => {});
      addButton(this, "Menu-HowToPlay", 720, 740, () => {
        createHowToPlayDlg(this);
      });
      addButton(this, "Menu-Exit", 720, 820, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "OnBoardingSignInScene");
      });

      this.dialogContainer = this.add.container(720, 512).setVisible(false);
      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingMenuScene;
