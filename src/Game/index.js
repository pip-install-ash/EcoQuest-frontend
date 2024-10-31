import React, { useEffect } from "react";
import Phaser from "phaser";
import { DefaultSceneConfig } from "../utils/const";
import createLoadingScene from "./scenes/LoadingScene";
import createOnBoardingSignUpScene from "./scenes/OnBoarding/SignUp";
import createOnBoardingSignInScene from "./scenes/OnBoarding/SignIn";
import createOnBoardingForgotPasswordScene from "./scenes/OnBoarding/ForgotPassword";
import createOnBoardingCheckMailScene from "./scenes/OnBoarding/CheckMail";
import createOnBoardingNewPassScene from "./scenes/OnBoarding/NewPassword";
import createOnBoardingMenuScene from "./scenes/OnBoarding/Menu";

const Game = () => {
  useEffect(() => {
    const config = {
      ...DefaultSceneConfig,
      scene: [
        createLoadingScene(),
        createOnBoardingSignUpScene(),
        createOnBoardingSignInScene(),
        createOnBoardingForgotPasswordScene(),
        createOnBoardingCheckMailScene(),
        createOnBoardingNewPassScene(),
        createOnBoardingMenuScene(),
      ],
    };

    const game = new Phaser.Game(config);

    // Cleanup on unmount
    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
};

export default Game;
