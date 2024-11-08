import { addButton } from "../common";

/**
 * Makes a <AmountInfo> panel.
 *
 * @function createAmountInfo
 * @param {scene, left, top}
 * @returns {void}
 */
const AmountInfo = (scene, left, top) => {
  const graphics = scene.add.graphics();
  graphics.fillStyle(0x000000, 0.4);
  graphics.fillRoundedRect(left, top + 5, 160, 32, 16);
  graphics.fillRoundedRect(left, top + 63, 160, 32, 16);
  graphics.fillRoundedRect(left + 191, top + 5, 160, 32, 16);
  graphics.fillRoundedRect(left + 191, top + 63, 160, 32, 16);
  addButton(scene, "LeafIcon", left + 145, top + 20, () => {});
  addButton(scene, "ElectricityIcon", left + 145, top + 80, () => {});
  addButton(scene, "BankIcon", left + 335, top + 20, () => {});
  addButton(scene, "WaterIcon", left + 335, top + 80, () => {});
  //Eco point
  scene.add
    .text(left + 15, top + 21, "200", {
      fontFamily: "Kreon",
      fontStyle: "bold",
      fontSize: "18px",
    })
    .setOrigin(0, 0.5);
  //Coin point
  scene.add
    .text(left + 206, top + 21, "$200,000", {
      fontFamily: "Kreon",
      fontStyle: "bold",
      fontSize: "18px",
    })
    .setOrigin(0, 0.5);
  //Ele point
  scene.add
    .text(left + 15, top + 79, "$200,000", {
      fontFamily: "Kreon",
      fontStyle: "bold",
      fontSize: "18px",
    })
    .setOrigin(0, 0.5);
  //Water point
  scene.add
    .text(left + 206, top + 79, "200", {
      fontFamily: "Kreon",
      fontStyle: "bold",
      fontSize: "18px",
    })
    .setOrigin(0, 0.5);
};

export default AmountInfo;
