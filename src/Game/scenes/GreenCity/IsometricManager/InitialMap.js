import { Buildings } from "../../../../utils/const";
import { calcIsForbidden } from "../../../../utils/utils";
import gameInitMap from "../../../packs/game-init-map.json";
import createEditBuildingContent, { drawEditBuilding } from "./EditBuilding";
const drawInitalMap = (scene) => {
  const { width, height } = scene.scale;

  const tileWidth = 96;
  const tileHeight = 64;

  scene.gameInitMap = gameInitMap;
  let gameMap = [];

  scene.gameInitMap.forEach((row, x) => {
    row.forEach((cell, y) => {
      const tileX = ((x - y) * tileWidth) / 2;
      const tileY = ((x + y) * tileHeight) / 2;

      const tile = scene.add
        .sprite(width / 2 + tileX, (-height * 2) / 5 + tileY, "IsoTile")
        .setOrigin(0.5, 1);
      tile.on("pointerdown", () => {
        if (scene.isEditBuilding) {
          scene.editBuilding = {
            ...scene.editBuilding,
            x,
            y,
            isForbidden: calcIsForbidden(
              scene,
              x,
              y,
              scene.editBuilding.buildingId
            ),
          };
          drawEditBuilding(scene);
        } else if (
          scene.gameInitMap[x][y] !== 0 &&
          scene.gameInitMap[x][y] !== 2
        ) {
          const building = Buildings.filter(
            (v) => v.id === scene.gameInitMap[x][y]
          )[0];
          createEditBuildingContent(scene, scene.gameInitMap[x][y], x, y);
          for (let xIndex = 0; xIndex < building.w; xIndex++) {
            for (let yIndex = 0; yIndex < building.h; yIndex++) {
              scene.gameInitMap[x - xIndex][y - yIndex] = 0;
            }
          }
          drawBuildings(scene);
        }
      });
      tile.setInteractive(scene.input.makePixelPerfect());

      if (cell >= 0) {
        const building = Buildings.filter(
          (v) => parseInt(v.id) === parseInt(cell)
        )[0];

        gameMap.push(
          scene.add
            .sprite(width / 2 + tileX, (-height * 2) / 5 + tileY, building.tile)
            .setOrigin(0.5, 1)
        );
      } else {
        gameMap.push(
          scene.add
            .sprite(width / 2 + tileX, (-height * 2) / 5 + tileY, "IsoTile")
            .setOrigin(0.5, 1)
        );
      }
    });
  });
  scene.gameMap = gameMap;
  drawBuildings(scene);
};
const drawBuildings = (scene) => {
  const tmpInitmap = scene.gameInitMap;
  let i = 0;
  tmpInitmap.forEach((row, x) => {
    row.forEach((cell, y) => {
      //   if (cell >= 0) {
      const building = Buildings.filter(
        (v) => parseInt(v.id) === parseInt(cell)
      )[0];
      scene.gameMap[i].setTexture(building.tile);
      //   } else {
      // scene.gameMap[i].setTexture("IsoTile");
      //   }
      i++;
    });
  });
};
export default drawInitalMap;
export { drawBuildings };
