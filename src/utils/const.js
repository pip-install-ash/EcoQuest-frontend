import Phaser from "phaser";

const DefaultSceneConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  width: 1440,
  height: 1024,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  dom: {
    createContainer: true,
  },
};

const DefaultFontStyle = {
  font: "16px Work Sans",
  fill: "#000", // Text color
  align: "center",
  resolution: 2, // Increase resolution for sharper text
};

const Buildings = [
  {
    id: -1,
    tile: "",
    tileOff: "",
    w: 1,
    h: 1,
    isBuilding: false
  },
  {
    id: 0,
    tile: "IsoTile",
    tileOff: "IsoTile",
    w: 1,
    h: 1,
    isBuilding: false
  },
  {
    id: 1,
    tile: "IsoForest",
    tileOff: "IsoForestOff",
    w: 2,
    h: 2,
    isBuilding: false
  },
  {
    id: 2,
    tile: "IsoWater",
    tileOff: "IsoWater",
    w: 1,
    h: 1,
    isBuilding: false
  },
  {
    id: 3,
    tile: "IsoHouseA",
    tileOff: "IsoHouseAOff",
    w: 2,
    h: 2,
    isBuilding: true
  },
  {
    id: 4,
    tile: "IsoHouseB",
    tileOff: "IsoHouseBOff",
    w: 2,
    h: 2,
    isBuilding: true
  },
  {
    id: 5,
    tile: "IsoSkyScrapper",
    tileOff: "IsoSkyScrapperOff",
    w: 2,
    h: 2,
    isBuilding: true
  },
  {
    id: 6,
    tile: "IsoSchool",
    tileOff: "IsoSchoolOff",
    w: 3,
    h: 3,
    isBuilding: true
  },
  {
    id: 7,
    tile: "IsoFactory",
    tileOff: "IsoFactoryOff",
    w: 2,
    h: 2,
    isBuilding: true
  },
  {
    id: 8,
    tile: "IsoShop",
    tileOff: "IsoShopOff",
    w: 2,
    h: 2,
    isBuilding: true
  },
  {
    id: 9,
    tile: "IsoWasteRecycleCenter",
    tileOff: "IsoWasteRecycleCenterOff",
    w: 2,
    h: 2,
    isBuilding: true
  },
  {
    id: 10,
    tile: "IsoWindTurbine",
    tileOff: "IsoWindTurbine",
    w: 1,
    h: 1,
    isBuilding: true
  },
  {
    id: 11,
    tile: "IsoHospital",
    tileOff: "IsoHospitalOff",
    w: 2,
    h: 2,
    isBuilding: true
  },
  {
    id: 12,
    tile: "IsoPark",
    tileOff: "IsoParkOff",
    w: 2,
    h: 2,
    isBuilding: true
  },
  {
    id: 13,
    tile: "IsoHydroPowerDam",
    tileOff: "IsoHydroPowerDamOff",
    w: 2,
    h: 2,
    isBuilding: true
  },
  {
    id: 14,
    tile: "IsoSolar",
    tileOff: "IsoSolarOff",
    w: 1,
    h: 1,
    isBuilding: true
  },
  {
    id: 15,
    tile: "IsoPlantC",
    tileOff: "IsoPlantCOff",
    w: 1,
    h: 1,
    isBuilding: true
  },
  {
    id: 16,
    tile: "IsoPlantB",
    tileOff: "IsoPlantBOff",
    w: 1,
    h: 1,
    isBuilding: true
  },
  {
    id: 17,
    tile: "IsoPlantA",
    tileOff: "IsoPlantAOff",
    w: 1,
    h: 1,
    isBuilding: true
  },
  {
    id: 18,
    tile: "IsoRoad",
    tileOff: "IsoRoadOff",
    w: 1,
    h: 1,
    isBuilding: true
  },
];

export { DefaultSceneConfig, DefaultFontStyle, Buildings };
