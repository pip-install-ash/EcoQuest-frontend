import { coloredBackground, fadeThisScreen } from "../../partials/common";
import gameAssetPack from "../../packs/game-asset-pack.json";
import gameBuildingPack from "../../packs/game-building-pack.json";
import BasicInfo from "../../partials/greenCity/BasicInfo";
import AmountInfo from "../../partials/greenCity/AmountInfo";
import MainButtons from "../../partials/greenCity/MainButtons";
import BuildUi from "../../partials/greenCity/BuildUi";
import createTutorialSettingDlg from "../../partials/greenCity/TutorialSetting";
import drawInitalMap from "./IsometricManager/InitialMap";
import { fetchImplementation } from "../../../utils/fetchRequest";
// import { useEffect } from 'react';

const CreateGreenCityScene = () => {
  console.log("CreateGreenCityScene");

  return {
    key: "GreenCitycene",
    preload: async function () {
      gameAssetPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
      gameBuildingPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
      this.load.scenePlugin({
        key: "rexuiplugin",
        url: "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js",
        sceneKey: "rexUI",
      });

      await fetchImplementation("get", "api/buildings/all-buildings")
        .then((res) => {
          const { data } = res;
          localStorage.setItem("buildData", JSON.stringify(data));
        })
        .catch((err) => {
          console.log("buildings fetch", err);
        });

      await fetchImplementation("get", "api/points/all-points")
        .then((res) => {
          const { data } = res;
          this.playData = data;
        })
        .catch((err) => {
          console.log("first fetch error", err);
        });

      this.testing = 0;
      this.isEditBuilding = false;
    },

    create: function () {
      coloredBackground(this, 0x70a541);
      drawInitalMap(this);
      BasicInfo(this, 36, 52);
      this.accounts = AmountInfo(this, 1024, 52, this.playData);
      MainButtons(this, 72, 334);
      BuildUi(this);
      this.dialogContainer = this.add.container(720, 512).setVisible(false);

      if (this.showTutorial === true || this.showTutorial === undefined)
        createTutorialSettingDlg(this, () => {});

      fadeThisScreen(this);
    },
  };
};

export default CreateGreenCityScene;
