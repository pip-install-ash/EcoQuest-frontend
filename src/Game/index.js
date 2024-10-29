import React, { useEffect } from "react";
import Phaser from "phaser";
import { DefaultSceneConfig } from "../utils/const";
import createLoadingScene from "./scenes/LoadingScene";
import createOnBoardingScene from "./scenes/OnBoardingScene";

const Game = () => {
  useEffect(() => {
    const config = {
      ...DefaultSceneConfig,
      scene: [createLoadingScene(), createOnBoardingScene()],
    };

    const game = new Phaser.Game(config);

    // Cleanup on unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container"/>;
};

export default Game;