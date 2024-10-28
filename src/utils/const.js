import Phaser from "phaser";

const DefaultSceneConfig = {
  type: Phaser.AUTO,
  parent: "phaser-container",
  width: window.innerWidth - 20,
  height: window.innerHeight - 20,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};


export {
    DefaultSceneConfig,
};
