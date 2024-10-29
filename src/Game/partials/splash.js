import Phaser from "phaser"
function createRoundedProgressBar(scene, x, y, width, height, radius, color) {
  const graphics = scene.add.graphics();
  const progressBar = {
    graphics: graphics,
    value: 0,
    setValue: function (value) {
      this.value = Phaser.Math.Clamp(value, 0, 1);
      this.draw();
    },
    draw: function () {
      graphics.clear(); // Clear previous graphics

      // Draw background
      graphics.fillStyle(0xE3DDDD, 1); // Background color
      graphics.fillRoundedRect(x, y, width, height, radius);

      // Draw progress
      graphics.fillStyle(color, 1); // Progress color
      graphics.fillRoundedRect(x, y, width * this.value, height, radius);
    },
  };

  progressBar.draw(); // Initial draw
  return progressBar;
}
export { createRoundedProgressBar };
