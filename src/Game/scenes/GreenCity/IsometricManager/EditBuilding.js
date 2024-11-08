import { Buildings } from "../../../../utils/const";
import { calcIsForbidden } from "../../../../utils/utils";
import { addButton, addImage } from "../../../partials/common";
import { drawBuildings } from "./InitialMap";

const createEditBuildingContent = (scene, buildingId, x, y) => {
  scene.isEditBuilding = true;
  scene.editBuilding = {
    x,
    y,
    buildingId,
    isForbidden: calcIsForbidden(scene, x, y, buildingId),
  };
  drawEditBuilding(scene);
};

const drawEditBuilding = (scene) => {
  const editBuilding = scene.editBuilding;
  const { width, height } = scene.scale;
  const tileWidth = 96;
  const tileHeight = 64;
  const tileX = ((editBuilding.x - editBuilding.y) * tileWidth) / 2;
  const tileY = ((editBuilding.x + editBuilding.y) * tileHeight) / 2;
  const displayX = width / 2 + tileX;
  const displayY = (-height * 2) / 5 + tileY;
  const building = Buildings.filter((v) => v.id === editBuilding.buildingId)[0];
  discardEditBuilding(scene);
  scene.editBuildingSprite = scene.add
    .sprite(
      displayX,
      displayY,
      editBuilding.isForbidden ? building.tileOff : building.tile
    )
    .setOrigin(0.5, 1);
  const controlContent = scene.add.container(displayX, displayY);
  const discardButton = addButton(
    scene,
    "DiscardButton",
    -50,
    -scene.editBuildingSprite.height - 30,
    () => {
      discardEditBuilding(scene);
      scene.isEditBuilding = false;
    }
  );
  const placeButton = addButton(
    scene,
    "PlaceButton",
    0,
    -scene.editBuildingSprite.height - 30,
    () => {
      if (!editBuilding.isForbidden) {
        discardEditBuilding(scene);
        scene.isEditBuilding = false;
        placeEditBuilding(scene);
      }
    }
  );
  const rotateButton = addButton(
    scene,
    "RotateButton",
    50,
    -scene.editBuildingSprite.height - 30,
    () => {}
  );

  //Building information
  const buildingInformation = scene.add.container(
    -scene.editBuildingSprite.width / 2 - 388,
    -scene.editBuildingSprite.height - 30
  );
  const infoImage = addImage(scene, "BuildingInfo", 0, 0)
    .setOrigin(0)
    .disableInteractive();
  const infoTitle = scene.add.text(20, 20, "HouseA", {
    fontFamily: "Kreon",
    fontSize: "24px",
    fontStyle: "Bold",
  });
  const infoText = scene.add
    .text(
      70,
      65,
      "Cost: $5,000\nResident Capacity: 10\nTax Income: $1 per Resident\nElectricity consumption: 10 units/Day\nWater usage: 2 unity/Day\nWaste produce: 2 unit/Day",
      {
        fontFamily: "Kreon",
        fontSize: "16px",
        lineSpacing: 21,
      }
    )
    .setOrigin(0);
  buildingInformation.add([infoImage, infoTitle, infoText]);

  controlContent.add([
    discardButton,
    placeButton,
    rotateButton,
    buildingInformation,
  ]);
  scene.controlContent = controlContent;
};
const discardEditBuilding = (scene) => {
  if (scene.editBuildingSprite) {
    scene.editBuildingSprite.destroy();
  }
  if (scene.controlContent) {
    scene.controlContent.destroy();
  }
};
const placeEditBuilding = (scene) => {
  const editBuilding = scene.editBuilding;
  const building = Buildings.filter((v) => v.id === editBuilding.buildingId)[0];
  for (let i = 0; i < building.w; i++) {
    for (let j = 0; j < building.h; j++) {
      scene.gameInitMap[editBuilding.x - i][editBuilding.y - j] = -1;
    }
  }
  scene.gameInitMap[editBuilding.x][editBuilding.y] = editBuilding.buildingId;
  drawBuildings(scene);
};

export default createEditBuildingContent;
export { drawEditBuilding, discardEditBuilding };
