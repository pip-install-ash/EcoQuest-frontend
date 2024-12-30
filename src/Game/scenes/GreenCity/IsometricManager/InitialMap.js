import { Buildings } from "../../../../utils/const";
import { fetchImplementation } from "../../../../utils/fetchRequest";
import { calcIsForbidden } from "../../../../utils/utils";
import gameInitMap from "../../../packs/game-init-map.json";
import { addImage } from "../../../partials/common";
import createEditBuildingContent, { drawEditBuilding } from "./EditBuilding";
const drawInitalMap = (scene) => {
  const { width, height } = scene.scale;

  const tileWidth = 96;
  const tileHeight = 64;
  const tester =
    localStorage.getItem("gameInitMap").length > 1
      ? JSON.parse(localStorage.getItem("gameInitMap"))
      : "";

  scene.gameInitMap = tester?.length > 0 ? tester : gameInitMap;

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
          const building = Buildings.filter(
            (v) => v.id === scene.editBuilding.buildingId
          )[0];
          if (building.isBuilding) {
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
              isRotate: scene.editBuilding.isRotate,
            };
          }
          drawEditBuilding(scene);
        } else if (
          scene.gameInitMap[x][y].key > 0 &&
          scene.gameInitMap[x][y].key !== 2
        ) {
          const building = Buildings.filter(
            (v) => v.id === scene.gameInitMap[x][y].key
          )[0];
          scene.currentSelectedBuilding = {
            id: building.id,
            w: building.w,
            h: building.h,
            x: x,
            y: y,
            isRotate: scene.gameInitMap[x][y].isRotate,
          };
          for (let xIndex = 0; xIndex < building.w; xIndex++) {
            for (let yIndex = 0; yIndex < building.h; yIndex++) {
              scene.gameInitMap[x - xIndex][y - yIndex].key = 0;
            }
          }
          drawBuildings(scene);
          createEditBuildingContent(
            scene,
            building.id,
            x,
            y,
            false,
            scene.currentSelectedBuilding.isRotate
          );
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
  scene.iconMap = scene.add.container(0, 0);
  drawBuildings(scene);
};
const drawBuildings = (scene) => {
  const { width, height } = scene.scale;
  scene.iconMap.removeAll(true);
  const tmpInitmap = scene.gameInitMap;
  let i = 0;
  const tileWidth = 96;
  const tileHeight = 64;
  tmpInitmap.forEach((row, x) => {
    row.forEach((cell, y) => {
      const tileX = ((x - y) * tileWidth) / 2;
      const tileY = ((x + y) * tileHeight) / 2;

      //   if (cell >= 0) {
      const building = Buildings.filter(
        (v) => parseInt(v.id) === parseInt(cell.key)
      )[0];
      scene.gameMap[i].setTexture(building.tile);
      scene.gameMap[i].setScale(cell.isRotate ? -1 : 1, 1);
      // if (building.isBuilding)
      //   scene.iconMap.add(
      //     addImage(
      //       scene,
      //       "NoRoad",
      //       width / 2 + tileX,
      //       (-height * 2) / 5 + tileY - tileHeight * building.h
      //     )
      //   );
      //   } else {
      // scene.gameMap[i].setTexture("IsoTile");
      //   }
      i++;
    });
  });
  const strigfyMap = JSON.stringify(scene.gameInitMap);
  localStorage.setItem("gameInitMap", strigfyMap);
  const isLeagueOn = localStorage.getItem("activeLeagueId");

  //store map changes into database
  console.log("this.leagueIsActive? BEfore'' :", isLeagueOn);
  fetchImplementation(
    "put",
    isLeagueOn?.length > 1
      ? `api/league-stats/${isLeagueOn}`
      : "api/users/map-update",
    {
      gameInitMap: strigfyMap,
    }
  );
};
export default drawInitalMap;
export { drawBuildings };
