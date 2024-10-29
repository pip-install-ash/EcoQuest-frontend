import { DefaultFontStyle } from "../../utils/const";
import assetPack from "../packs/splash-asset-pack.json";
import { createRoundedProgressBar } from "../partials/splash";

const createLoadingScene = () => {
  return {
    key: "LoadingScene",
    preload: function () {
      assetPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
    },

    create: function () {
      const { width, height } = this.scale;

      //White Background
      const whiteBack = this.add.graphics();
      whiteBack.fillStyle(0xffffff, 1.0);
      whiteBack.fillRect(0, 0, width, height);

      this.add.image(width / 2, height / 2 - 50, "Logo");

      const t_description = this.add.text(
        width / 2,
        height / 2 + 60,
        "Lorem Ipsum your Eco-Challenge",
        {
          ...DefaultFontStyle,
          font: "24px Work Sans",
        }
      );
      const t_copyright = this.add.text(
        width / 2,
        height - 30,
        "2024 YourPal.ai All rights reserved.",
        DefaultFontStyle
      );

      // Center the text
      t_description.setOrigin(0.5, 0.5); // Set the origin to the center of the text
      t_copyright.setOrigin(0.5, 0.5); // Set the origin to the center of the text

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
        delay: 50,
        callback: () => {
          progress += 0.01;
          if (progress > 1) {
            progress = 1;
            this.scene.start("OnBoardingScene");
          }
          progressBar.setValue(progress);
        },
        repeat: 100,
      });
    },
  };
};

export default createLoadingScene;
