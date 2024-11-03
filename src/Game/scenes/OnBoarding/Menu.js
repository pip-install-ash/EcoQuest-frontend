import {
  addButton,
  blurInputs,
  emptyInputs,
  fadeThisScreen,
  hideInputs,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";
import createCreateLeagueDlg from "../../partials/menu/CreateLeague";
import createDeleteAccountDlg from "../../partials/menu/DeleteAccount";
import createExitDlg from "../../partials/menu/Exit";
import createHowToPlayDlg from "../../partials/menu/HowToPlay";
import createJoinLeagueDlg from "../../partials/menu/JoinLeague";
import createLeaderboardDlg from "../../partials/menu/LeaderBoard";
import createLeagueDlg from "../../partials/menu/League";
import createMyLeaguesDlg from "../../partials/menu/MyLeagues";
import createNotificationDlg from "../../partials/menu/Notification";
import createSettingDlg from "../../partials/menu/Settings";

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

      addButton(this, "Menu-Start", 720, 340, () => {
        emptyInputs();
        blurInputs();
        hideInputs();
        transitionToNextScene(this, "GreenCitycene");
      });

      addButton(this, "Menu-League", 720, 420, () => {
        createLeagueDlg(
          this,
          () => {
            createCreateLeagueDlg(this);
          },
          () => {
            createJoinLeagueDlg(this);
          },
          () => {
            createMyLeaguesDlg(this);
          }
        );
      });

      addButton(this, "Menu-Notification", 720, 500, () => {
        createNotificationDlg(this);
      });

      addButton(this, "Menu-Leaderboard", 720, 580, () => {
        createLeaderboardDlg(this);
      });

      addButton(this, "Menu-Setting", 720, 660, () => {
        createSettingDlg(this, () => {
          createDeleteAccountDlg(this, () => {
            emptyInputs();
            blurInputs();
            hideInputs();
            transitionToNextScene(this, "OnBoardingSignInScene");
          });
        });
      });

      addButton(this, "Menu-HowToPlay", 720, 740, () =>
        createHowToPlayDlg(this)
      );

      addButton(this, "Menu-Exit", 720, 820, () =>
        createExitDlg(this, () => {
          emptyInputs();
          blurInputs();
          hideInputs();
          transitionToNextScene(this, "OnBoardingSignInScene");
        })
      );

      this.dialogContainer = this.add.container(720, 512).setVisible(false);
      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingMenuScene;
