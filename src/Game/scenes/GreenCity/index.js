import { coloredBackground, fadeThisScreen } from "../../partials/common";
import gameAssetPack from "../../packs/game-asset-pack.json";
import BasicInfo from "../../partials/greenCity/BasicInfo";
import AmountInfo from "../../partials/greenCity/AmountInfo";
import MainButtons from "../../partials/greenCity/MainButtons";
import BuildUi from "../../partials/greenCity/BuildUi";
import gameInitMap from "../../packs/game-init-map.json";

const createGreenCitycene = () => {
  return {
    key: "GreenCitycene",
    preload: function () {
      gameAssetPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
    },

    create: function () {
      coloredBackground(this, 0x70a541);
      const { width, height } = this.scale;

      let isoGroup = this.add.group();
      const tileWidth = 96;
      const tileHeight = 64;
      gameInitMap.forEach((row, x) => {
        row.forEach((cell, y) => {
          const tileX = ((x - y) * tileWidth) / 2;
          const tileY = ((x + y) * tileHeight) / 2;

          if (cell >= 0) {
            const tile = this.add
              .sprite(
                width / 2 + tileX,
                (-height * 2) / 5 + tileY,
                cell === 0 ? "IsoTile" : cell === 1 ? "IsoForest" : ""
              )
              .setOrigin(0.5, 1);
            tile.setInteractive(this.input.makePixelPerfect());
            tile.isoX = x;
            tile.isoY = y;

            // Add hover effect
            tile.on("pointerover", () => tile.setTint(0x00ff00));
            tile.on("pointerout", () => tile.clearTint());

            isoGroup.add(tile);
          }
        });
      });
      BasicInfo(this, 36, 52);
      AmountInfo(this, 1024, 52);
      MainButtons(this, 72, 334);
      BuildUi(this);
      fadeThisScreen(this);
    },
  };
};

export default createGreenCitycene;
