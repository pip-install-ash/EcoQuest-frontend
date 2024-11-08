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
    tile: '',
    tileOff: '',
    w: 1,
    h: 1
  },
  {
    id: 0,
    tile: "IsoTile",
    tileOff: "IsoTile",
    w: 1,
    h: 1
  },
  {
    id: 1,
    tile: "IsoForest",
    tileOff: "IsoForest",
    w: 2,
    h: 2
  },
  {
    id: 2,
    tile: "IsoWater",
    tileOff: "IsoWater",
    w: 1,
    h: 1
  },
  {
    id: 3,
    tile: "IsoHouseA",
    tileOff: "IsoHouseAOff",
    w: 2,
    h: 2
  },
  {
    id: 4,
    tile: "IsoHouseB",
    tileOff: "IsoHouseBOff",
    w: 2,
    h: 2
  },
];

export { DefaultSceneConfig, DefaultFontStyle, Buildings };
