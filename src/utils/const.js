import Phaser from "phaser";

const DefaultSceneConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
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
