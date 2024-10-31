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
      createContainer: true
  },
};

const DefaultFontStyle = {
  font: '16px Work Sans',
  fill: '#000', // Text color
  align: 'center',
  resolution: 2, // Increase resolution for sharper text
}


export {
    DefaultSceneConfig,
    DefaultFontStyle
};
