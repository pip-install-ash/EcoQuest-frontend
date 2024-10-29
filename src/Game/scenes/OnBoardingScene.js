import assetPack from "../packs/onbarding-asset-pack.json";
import { scaleBackground } from "../partials/common";

const createOnBoardingScene = () => {
  return {
    key: "OnBoardingScene",
    preload: function () {
      assetPack.forEach((element) => {
        if (element.type === "image") this.load.image(element.key, element.url);
      });
    },

    create: function () {
      scaleBackground(this);
    },
  };
};

export default createOnBoardingScene;
