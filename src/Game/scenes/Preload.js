import React, { useEffect } from "react";
import Phaser from "phaser";
import { DefaultSceneConfig } from "../../utils/const";

const Preload = () => {
  useEffect(() => {
    const config = {
      ...DefaultSceneConfig,
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    const game = new Phaser.Game(config);

    function preload() {
        this.load.pack('pack', 'asset-pack.json', 'preload');
    }

    function create() {
        const {width, height} = this.scale;
        const graphics=  this.add.graphics();
        graphics.fillStyle(0xffffff, 1.0);
        graphics.fillRect(0,0, width, height);

        this.add.image(400,300, 'Logo');
    }

    function update() {}

    // function pointerDown(pointer) {}

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div id="phaser-container" style={{ width: "100%", height: "100%" }}></div>
  );
};

export default Preload;
