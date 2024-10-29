const whiteBackground = (scene) => {
  const { width, height } = scene.scale;

  //White Background
  const whiteBack = scene.add.graphics();
  whiteBack.fillStyle(0xffffff, 1.0);
  whiteBack.fillRect(0, 0, width, height);
};
const scaleBackground = (scene) => {
  const { width, height } = scene.scale;
  const background = scene.add.image(width / 2, height / 2, "Background");

  // Calculate aspect ratios
  const imageAspect = background.width / background.height;
  const screenAspect = width / height;

  console.log(imageAspect, screenAspect);
  if (imageAspect > screenAspect) {
    // Image is wider than the screen
    background.setDisplaySize(height * imageAspect, height);
  } else {
    // Image is taller than the screen
    background.setDisplaySize(width, width / imageAspect);
  }
};
export { scaleBackground, whiteBackground };
