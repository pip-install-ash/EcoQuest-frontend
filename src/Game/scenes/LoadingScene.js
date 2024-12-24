import { DefaultFontStyle } from "../../utils/const";
import assetPack from "../packs/splash-asset-pack.json";
import onboardingAssetPack from "../packs/onbarding-asset-pack.json";
import menuAssetPack from "../packs/menu-asset-pack.json";
import { transitionToNextScene, whiteBackground } from "../partials/common";
import { createRoundedProgressBar } from "../partials/splash";

const createLoadingScene = () => {
  return {
    key: "LoadingScene",
    preload: function () {
      assetPack.forEach((element) => {
        element.key === "Disaster" && console.log("DISASTER");
        console.log("sss", element.key);
        if (element.type === "image") this.load.image(element.key, element.url);
      });

      onboardingAssetPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
      menuAssetPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
      this.load.plugin(
        "rexinputtextplugin",
        "https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js",
        true
      );
    },

    create: function () {
      const { width, height } = this.scale;

      whiteBackground(this);

      this.add.image(width / 2, height / 2 - 50, "Logo");

      this.add
        .text(width / 2, height / 2 + 60, "Eco-Challenge", {
          ...DefaultFontStyle,
          font: "24px Work Sans",
        })
        .setOrigin(0.5, 0.5);

      this.add
        .text(
          width / 2,
          height - 30,
          "2024 YourPal.ai All rights reserved.",
          DefaultFontStyle
        )
        .setOrigin(0.5, 0.5);

      const progressBar = createRoundedProgressBar(
        this,
        width / 2 - 200,
        height / 2 + 20,
        400,
        10,
        5,
        0x85b51c
      );

      // Example to update progress
      let progress = 0;
      this.time.addEvent({
        delay: 1,
        callback: () => {
          progress += 0.01;
          if (progress > 1) {
            progress = 1;
            transitionToNextScene(this, "OnBoardingSignInScene");
          }
          progressBar.setValue(progress);
        },
        repeat: 100,
      });
    },
  };
};

export default createLoadingScene;
