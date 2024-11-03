import {
  coloredBackground,
  fadeThisScreen,
  scaleBackground,
} from "../../partials/common";
import gameAssetPack from "../../packs/game-asset-pack.json";

const createGreenCitycene = () => {
  return {
    key: "GreenCitycene",
    preload: function () {
      gameAssetPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
    },

    create: function () {
      scaleBackground(this, "NewPassBackground");
      coloredBackground(this, 0x70A541);

      fadeThisScreen(this);
    },
  };
};

export default createGreenCitycene;
