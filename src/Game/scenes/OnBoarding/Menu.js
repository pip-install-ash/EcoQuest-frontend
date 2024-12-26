import { fetchImplementation } from "../../../utils/fetchRequest";
import {
  addButton,
  fadeThisScreen,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";
import createCreateLeagueDlg from "../../partials/menu/CreateLeague";
import createDeleteAccountDlg from "../../partials/menu/DeleteAccount";
import createExitDlg from "../../partials/menu/Exit";
import createHowToPlayDlg from "../../partials/menu/howToPlay";
import createJoinLeagueDlg from "../../partials/menu/JoinLeague";
import createLeaderboardDlg from "../../partials/menu/LeaderBoard";
import createLeagueDlg from "../../partials/menu/League";
import createMyLeaguesDlg from "../../partials/menu/MyLeagues";
import createNotificationDlg from "../../partials/menu/Notification";
import createSettingDlg from "../../partials/menu/Settings";

const createOnBoardingMenuScene = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  // const isLeagueOn = localStorage.getItem("activeLeagueId");

  return {
    key: "OnBoardingMenuScene",
    preload: function () {
      this.load.scenePlugin({
        key: "rexuiplugin",
        url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
        sceneKey: "rexUI",
      });
    },

    create: function () {
      scaleBackground(this, "MenuBackground");
      // addButton(this, "Resume-League", 720, 280, async () => {
      //   createMyLeaguesDlg(this);
      // });
      addButton(this, "Menu-Start", 720, 340, async () => {
        const userDetails = await fetchImplementation(
          "get",
          "user-details",
          {}
        );
        const mapDetails = userDetails?.gameInitMap;
        localStorage.setItem("activeLeagueId", "");
        localStorage.setItem("activeLeagueName", "");

        mapDetails?.length > 1
          ? localStorage.setItem("gameInitMap", mapDetails)
          : localStorage.setItem("gameInitMap", ""); // to get the uodated Map

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
        createSettingDlg(
          this,
          () => {
            createDeleteAccountDlg(this, () => {
              transitionToNextScene(this, "OnBoardingSignInScene");
            });
          },
          userData
        );
      });

      addButton(this, "Menu-HowToPlay", 720, 740, () =>
        createHowToPlayDlg(this)
      );

      addButton(this, "Menu-Exit", 720, 820, () =>
        createExitDlg(this, () => {
          localStorage.removeItem("token");
          localStorage.removeItem("gameInitMap");
          transitionToNextScene(this, "OnBoardingSignInScene");
        })
      );

      this.dialogContainer = this.add.container(720, 512).setVisible(false);
      fadeThisScreen(this);
      if (this.sound && this.sound.context.state === "running") {
        this.sound.stopAll();
      }
    },
  };
};

export default createOnBoardingMenuScene;
