import { coloredBackground, fadeThisScreen } from "../../partials/common";
import gameAssetPack from "../../packs/game-asset-pack.json";
import gameBuildingPack from "../../packs/game-building-pack.json";
import BasicInfo from "../../partials/greenCity/BasicInfo";
import AmountInfo from "../../partials/greenCity/AmountInfo";
import MainButtons from "../../partials/greenCity/MainButtons";
import BuildUi from "../../partials/greenCity/BuildUi";
import createTutorialSettingDlg from "../../partials/greenCity/TutorialSetting";
import drawInitalMap from "./IsometricManager/InitialMap";

const createGreenCitycene = () => {
  return {
    key: "GreenCitycene",
    preload: function () {
      gameAssetPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
      gameBuildingPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });

      this.isEditBuilding = false;
    },

    create: function () {
      coloredBackground(this, 0x70a541);
      drawInitalMap(this);
      BasicInfo(this, 36, 52);
      AmountInfo(this, 1024, 52);
      MainButtons(this, 72, 334);
      BuildUi(this);

      this.dialogContainer = this.add.container(720, 512).setVisible(false);
      createTutorialSettingDlg(this, () => {});
      fadeThisScreen(this);
    },
  };
};

export default createGreenCitycene;
