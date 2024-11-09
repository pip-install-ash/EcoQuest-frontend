import { addButton, addText } from "../common";
import { organizeDialog, showDialog } from "./base";
const COLOR_MAIN = 0xffffff;

const CreateTextObject = function (scene, text) {
  return scene.add.text(0, 0, text, { fontSize: 20, color: "#000" });
};
/**
 * Shows a <CreateLeague> dialog.
 *
 * @function createCreateLeagueDlg
 * @param {scene, onClose}
 * @returns {void}
 */
const createCreateLeagueDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "CreateLeagueDialog", 1205, 511);

  const leagueSettings = addText(
    scene,
    "Create a League",
    0,
    -220,
    "Inter",
    "32px",
    "bold",
    "#FCB651",
    0.5,
    0.5
  );
  const privateButton = addButton(scene, "PrivateButton", -290, -50, () => {});
  const publicButton = addButton(scene, "PublicButton", 280, -50, () => {});
  const createButton = addButton(scene, "CreateButton", 0, 170, () => {});

  const nameInputFiled = scene.add.rexInputText(-290, 68, 480, 56, {
    type: "text",
    text: "",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "Enter League name",
    color: "#000",
  });
  const options = [
    { text: "A", value: 0 },
    { text: "BB", value: 10 },
    { text: "CCC", value: 100 },
    { text: "DDDD", value: 1000 },
  ];

  const dropDownList = scene.rexUI.add
    .dropDownList({
      x: 40,
      y: 70,

      background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN),
      text: CreateTextObject(scene, "-- Select --").setFixedSize(150, 0),

      space: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
        icon: 10,
      },

      options: options,

      list: {
        createBackgroundCallback: function (scene) {
          return scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_MAIN);
        },
        createButtonCallback: function (scene, option, index, options) {
          var text = option.text;
          var button = scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0),

            text: CreateTextObject(scene, text),

            space: {
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
              icon: 10,
            },
          });
          button.value = option.value;

          return button;
        },
        onButtonClick: function (button, index, pointer, event) {
          scene.text = button.text;
          scene.value = button.value;
        },
        onButtonOver: function (button, index, pointer, event) {
          button.getElement("background").setStrokeStyle(1, 0xffffff);
        },
        onButtonOut: function (button, index, pointer, event) {
          button.getElement("background").setStrokeStyle();
        },
      },

      setValueCallback: function (dropDownList, value, previousValue) {
        console.log(value);
      },
      value: undefined,
    })
    .setOrigin(0, 0.5)
    .layout();

  scene.dialogContainer.add([
    ...dialogSetting,
    leagueSettings,
    privateButton,
    publicButton,
    createButton,
    nameInputFiled,
    dropDownList,
  ]);
  showDialog(scene);
};

export default createCreateLeagueDlg;
