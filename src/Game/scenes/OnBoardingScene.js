import assetPack from "../packs/onbarding-asset-pack.json";

const createOnBoardingScene = () => {
  return {
    key: "OnBoardingScene",
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

    },
  };
};

export default createOnBoardingScene;
