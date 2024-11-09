import { addButton, addImage, addSlider, addText } from "../../common";
import { organizeDialog, showDialog } from "../../menu/base";
import Phaser from "phaser";
import "@fontsource/m-plus-rounded-1c";
import createInviteFriendDlg from "./InviteFriend";
import createLeagueSettingDlg from "./LeagueSetting";
import createLeaveLeagueDlg from "./LeaveLeague";
import createKickUserDlg from "./KickUser";

const userData = [
  [1, "Michael Scott", 200, 200, 45, 0, 1],
  [2, "Michael Scott", 200, 200, 45, 1, 0],
  [3, "Michael Scott", 200, 200, 45, 1, 1],
  [4, "Michael Scott", 200, 200, 45, 1, 0],
  [5, "Michael Scott", 200, 200, 45, 1, 1],
  [6, "Michael Scott", 200, 200, 45, 1, 0],
  [7, "Michael Scott", 200, 200, 45, 1, 1],
];
const messageData = [
  {
    isMe: true,
    text: "Gorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit.",
  },
  {
    isMe: false,
    user: "David Wallace",
    text: "Gorem ipsum ",
  },
  {
    isMe: false,
    user: "Amy Santiago",
    text: "Gorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit. Gorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit. Gorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit.",
  },
  {
    isMe: true,
    text: "Gorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit.",
  },
  {
    isMe: false,
    user: "David Wallace",
    text: "Gorem ipsum ",
  },
  {
    isMe: false,
    user: "Amy Santiago",
    text: "Gorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit. Gorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit. Gorem ipsum dolor sit amet, consectetur adipiscing elit. consectetur adipiscing elit.",
  },
  {
    isMe: true,
    text: "Gorem ipsum dolor sit amet, consectetur adipiscing elit.consectetur adipiscing elit.",
  },
  {
    isMe: false,
    user: "David Wallace",
    text: "Gorem ipsum ",
  },
  {
    isMe: false,
    user: "Amy Santiago",
    text: "Gorem dfgsdfgdsfgdg",
  },
];
/**
 * Shows a <LeagueMainDlg> dialog.
 *
 * @function createLeagueMainDlg
 * @param {scene}
 * @returns {void}
 */
const createLeagueMainDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "LeagueLobbyDialog", 1205, 795);
  const dialogBackground = dialogSetting[0];

  //Display League title
  const leagueTitle = addText(
    scene,
    "Titanic House",
    0,
    -360,
    "Inter",
    "32px",
    "Bold",
    "#fcb651",
    0.5,
    0.5
  );

  //Tabs
  const lobbyButton = addButton(scene, "LeagueLobbyButton", -380, -280, () => {
    content1.setVisible(true);
    lobbyButton.setTexture("LeagueLobbyButton");
    messageButton.setTexture("LeagueMessageButtonOff");
    requestButton.setTexture("LeagueRequestButtonOff");
    dialogBackground.setTexture("LeagueLobbyDialog");
    content1.setVisible(true);
    content2.setVisible(false);
    content3.setVisible(false);
    lobbyContentContainer.setVisible(true);
    messageContentContainer.setVisible(false);
  });
  const messageButton = addButton(
    scene,
    "LeagueMessageButtonOff",
    0,
    -280,
    () => {
      content1.setVisible(false);
      lobbyButton.setTexture("LeagueLobbyButtonOff");
      messageButton.setTexture("LeagueMessageButton");
      requestButton.setTexture("LeagueRequestButtonOff");
      dialogBackground.setTexture("LeagueMessageDialog");
      content1.setVisible(false);
      content2.setVisible(true);
      content3.setVisible(false);
      lobbyContentContainer.setVisible(false);
      messageContentContainer.setVisible(true);
    }
  );
  const requestButton = addButton(
    scene,
    "LeagueRequestButtonOff",
    380,
    -280,
    () => {
      content1.setVisible(false);
      lobbyButton.setTexture("LeagueLobbyButtonOff");
      messageButton.setTexture("LeagueMessageButtonOff");
      requestButton.setTexture("LeagueRequestButton");
      dialogBackground.setTexture("LeagueMessageDialog");
      content1.setVisible(false);
      content2.setVisible(false);
      content3.setVisible(true);
      lobbyContentContainer.setVisible(false);
      messageContentContainer.setVisible(false);
    }
  );

  //Lobby Tab
  const content1 = scene.add.container(0, 0);
  content1.add(addButton(scene, "LeagueCodeButton", 60, -165, () => {}));
  content1.add(
    addButton(scene, "InviteFriendButton", 300, -165, () => {
      createInviteFriendDlg(scene);
    })
  );
  content1.add(
    addButton(scene, "LeagueSettingButton", 460, -165, () => {
      createLeagueSettingDlg(scene);
    })
  );
  content1.add(
    addButton(scene, "LeagueLeaveSmallButton", 530, -165, () => {
      createLeaveLeagueDlg(scene);
    })
  );
  content1.add(
    addText(
      scene,
      "Players: 1/20",
      -550,
      -70,
      "Inter",
      "20px",
      "Bold",
      "#fff",
      0,
      0.5
    )
  );
  content1.add(
    addText(
      scene,
      "Average Eco points: 12,730",
      0,
      -70,
      "Inter",
      "20px",
      "Bold",
      "#fff",
      0.5,
      0.5
    )
  );
  content1.add(
    addText(
      scene,
      "Owner: Michael Scott",
      550,
      -70,
      "Inter",
      "20px",
      "Bold",
      "#fff",
      1,
      0.5
    )
  );

  content1.add(
    scene.add
      .rexInputText(-530, -175, 350, 45, {
        type: "text",
        text: "",
        fontSize: "20px",
        fontFamily: "Kreon",
        placeholder: "Search player",
        color: "#000",
      })
      .setOrigin(0, 0.5)
  );

  const lobbyContentContainer = scene.add.container(0, 0);

  userData.forEach((v) => {
    lobbyContentContainer.add(addUser(scene, v));
  });
  makeScrollArea(scene, lobbyContentContainer, 100, 558, 1205, 350, 520);

  content1.add(lobbyContentContainer);

  //MessageTab
  const content2 = scene.add.container(0, 0);
  content2.add(addButton(scene, "SendMessageButton", 540, 345, () => {}));
  content2.add(addImage(scene, "MessageFooter", -40, 340));
  content2.setVisible(false);
  const messageContentContainer = scene.add.container(0, 100);

  let messageY = 20;
  messageContentContainer.height = 250;
  messageData.forEach((val) => {
    const { messageArea, messageHeight } = addMessage(scene, val, messageY);
    messageContentContainer.add(messageArea);
    messageY += messageHeight;
    messageContentContainer.height += messageHeight;
  });
  makeScrollArea(
    scene,
    messageContentContainer,
    100,
    265,
    1205,
    527,
    messageContentContainer.height
  );
  messageContentContainer.y = Math.min(0, 527 - messageContentContainer.height);
  content2.add(messageContentContainer);
  content2.add(
    scene.add.rexInputText(-40, 340, 1000, 56, {
      type: "text",
      text: "",
      fontSize: "20px",
      fontFamily: "Kreon",
      placeholder: "Send message",
      color: "#000",
    })
  );

  //Request Tab
  const content3 = scene.add.container(0, 0);
  content3.add(
    addButton(scene, "SendRequestButton", 0, 345, () => {
      requestDialogContainer.setVisible(true);
    })
  );
  const requestContentContainer = scene.add.container(0, 0);
  requestContentContainer.add(addImage(scene, "RequestBackground", -150, -150));
  requestContentContainer.add(
    addText(
      scene,
      "Michael Scott",
      -530,
      -170,
      "Inter",
      "18px",
      "Bold",
      "#FCB651",
      0,
      1
    )
  );
  requestContentContainer.add(
    addButton(scene, "DonateButton", 170, -120, () => {
      donateDialogContainer.setVisible(true);
    })
  );
  const donateDialogContainer = scene.add.container(0, 0);
  donateDialogContainer.add(
    scene.add
      .rectangle(0, 0, 1440, 1024, 0x000000)
      .setAlpha(0.5)
      .setInteractive()
  );
  donateDialogContainer.add(addImage(scene, "RequestDialog", 0, 0));
  const donateCancelBtn = addButton(scene, "CancelButton", -150, 220, () => {
    donateDialogContainer.setVisible(false);
  });
  const donateSendBtn = addButton(
    scene,
    "SendRequestSmallButton",
    140,
    220,
    () => {
      donateDialogContainer.setVisible(false);
    }
  );
  scene.donateEleText = addText(
    scene,
    "300KW",
    -230,
    -152,
    "m-plus-rounded-1c",
    "18px",
    "Bold",
    "#fff",
    0,
    0.5
  );
  scene.donateCoinText = addText(
    scene,
    "$30000",
    -230,
    -35,
    "m-plus-rounded-1c",
    "18px",
    "Bold",
    "#fff",
    0,
    0.5
  );
  scene.donateWaterText = addText(
    scene,
    "200 LTR",
    -230,
    82,
    "m-plus-rounded-1c",
    "18px",
    "Bold",
    "#fff",
    0,
    0.5
  );
  const donateEleSlider = addSlider(
    scene,
    1,
    -80,
    -100,
    380,
    12,
    16,
    0xfcb651,
    (v) => {
      console.log(scene.donateEleText);
      if (scene.donateEleText.text)
        scene.donateEleText.setText(`${parseInt(300 * v)}KW`);
    },
    2
  );
  const donateCoinSlider = addSlider(
    scene,
    1,
    -80,
    20,
    380,
    12,
    16,
    0xfcb651,
    (v) => {
      scene.donateCoinText.text = `$${parseInt(30000 * v)}`;
    },
    3
  );
  const donateWaterSlider = addSlider(
    scene,
    1,
    -80,
    140,
    380,
    12,
    16,
    0xfcb651,
    (v) => {
      scene.donateWaterText.text = `${parseInt(200 * v)}LTR`;
    },
    4
  );
  const eleInputField = scene.add.rexInputText(220, -115, 70, 56, {
    type: "number",
    text: "300",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "",
    color: "#000",
  });
  const coinInputField = scene.add.rexInputText(220, 0, 70, 56, {
    type: "number",
    text: "30000",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "",
    color: "#000",
  });
  const waterInputField = scene.add.rexInputText(220, 115, 70, 56, {
    type: "number",
    text: "200",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "",
    color: "#000",
  });
  donateDialogContainer.add(donateCancelBtn);
  donateDialogContainer.add(donateSendBtn);
  donateDialogContainer.add(donateEleSlider);
  donateDialogContainer.add(donateCoinSlider);
  donateDialogContainer.add(donateWaterSlider);
  donateDialogContainer.add(scene.donateEleText);
  donateDialogContainer.add(scene.donateCoinText);
  donateDialogContainer.add(scene.donateWaterText);
  donateDialogContainer.add(eleInputField);
  donateDialogContainer.add(coinInputField);
  donateDialogContainer.add(waterInputField);
  donateDialogContainer.setVisible(false);

  const requestDialogContainer = scene.add.container(0, 0);
  requestDialogContainer.add(
    scene.add
      .rectangle(0, 0, 1440, 1024, 0x000000)
      .setAlpha(0.5)
      .setInteractive()
  );
  requestDialogContainer.add(addImage(scene, "RequestResourceDialog", 0, 0));
  requestDialogContainer.add(
    addButton(scene, "RequestButton", 0, 180, () => {
      requestDialogContainer.setVisible(false);
    })
  );
  const requestEleInputField = scene.add.rexInputText(220, -90, 70, 56, {
    type: "number",
    text: "300",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "",
    color: "#000",
  });
  const requestCoinInputField = scene.add.rexInputText(220, 0, 70, 56, {
    type: "number",
    text: "30000",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "",
    color: "#000",
  });
  const requestWaterInputField = scene.add.rexInputText(220, 90, 70, 56, {
    type: "number",
    text: "200",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "",
    color: "#000",
  });
  requestDialogContainer.add([
    requestEleInputField,
    requestCoinInputField,
    requestWaterInputField,
  ]);
  requestDialogContainer.setVisible(false);
  content3.add([
    requestContentContainer,
    donateDialogContainer,
    requestDialogContainer,
  ]);
  // content3.add();
  content3.setVisible(false);

  scene.dialogContainer.add([
    ...dialogSetting,
    leagueTitle,
    lobbyButton,
    messageButton,
    requestButton,
    content1,
    content2,
    content3,
  ]);
  showDialog(scene);
};
const makeScrollArea = (
  scene,
  contentContainer,
  x,
  y,
  viewWidth,
  viewHeight,
  contentHeight
) => {
  const maskShape = scene.make.graphics();
  maskShape.fillRect(x, y, viewWidth, viewHeight);
  const mask = maskShape.createGeometryMask();
  contentContainer.setMask(mask);
  let startY;
  scene.input.on("pointerdown", (pointer) => {
    startY = pointer.y;
  });

  scene.input.on("pointermove", (pointer) => {
    if (pointer.isDown && contentContainer.visible) {
      const deltaY = pointer.y - startY;
      startY = pointer.y;

      // Move the container, but limit scrolling within bounds
      contentContainer.y += deltaY;
      contentContainer.y = Phaser.Math.Clamp(
        contentContainer.y,
        viewHeight - contentHeight,
        0
      );
    }
  });
  scene.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
    if (contentContainer.visible) {
      // Adjust the scroll speed to your preference
      const scrollSpeed = 1;
      contentContainer.y -= deltaY * scrollSpeed;
      contentContainer.y = Phaser.Math.Clamp(
        contentContainer.y,
        viewHeight - contentHeight,
        0
      );
    }
  });
};
const addUser = (scene, data) => {
  const noText = addText(
    scene,
    `${data[0]}`,
    -530,
    20 + data[0] * 72,
    "Inter",
    "20px",
    "Bold",
    "#fff",
    1,
    0.5
  );
  const userText = addText(
    scene,
    data[1],
    -480,
    20 + data[0] * 72,
    "Inter",
    "20px",
    "Bold",
    "#fff",
    0,
    0.5
  );
  const ecoText = addText(
    scene,
    `${data[2]}Pt`,
    -190,
    20 + data[0] * 72,
    "Inter",
    "20px",
    "Bold",
    "#FCB651",
    0,
    0.5
  );
  const coinText = addText(
    scene,
    `$${data[3]}`,
    40,
    20 + data[0] * 72,
    "Inter",
    "20px",
    "Bold",
    "#FCB651",
    0,
    0.5
  );
  const buildingText = addText(
    scene,
    `$${data[4]}`,
    240,
    20 + data[0] * 72,
    "Inter",
    "20px",
    "Bold",
    "#FFF",
    0,
    0.5
  );
  let actionButton;
  let actionStatus = [];
  if (data[5] === 0) {
    actionButton = addButton(
      scene,
      "ActionLeaveButton",
      480,
      30 + data[0] * 72,
      () => {
        createLeaveLeagueDlg(scene);
      }
    );
  } else {
    actionButton = addButton(
      scene,
      "ActionKickButton",
      480,
      30 + data[0] * 72,
      () => {
        createKickUserDlg(scene);
      }
    );
    if (data[6] === 0) {
      actionStatus.push(addImage(scene, "Offline", 550, 20 + data[0] * 72));
    } else {
      actionStatus.push(addImage(scene, "Online", 550, 20 + data[0] * 72));
    }
  }
  return [
    noText,
    userText,
    ecoText,
    coinText,
    buildingText,
    actionButton,
    ...actionStatus,
  ];
};
const addMessage = (scene, data, y) => {
  const fixedWidth = 450;
  const textStyle = {
    fontFamily: "Inter",
    fontStyle: "Bold",
    fontSize: "16px",
    color: "#FCB651",
    wordWrap: { width: fixedWidth, useAdvancedWrap: true },
    align: "left",
  };
  let message = [];
  let messageHeight = 0;
  if (data.isMe) {
    const text = scene.add.text(550, y, data.text, textStyle).setOrigin(1, 0);
    const graphics = scene.add.graphics();
    graphics.fillStyle(0x454739);
    graphics.fillRoundedRect(
      text.x - text.width - 20,
      text.y - 20,
      text.width + 40,
      text.height + 40,
      16
    );
    message.push(graphics);
    message.push(text);
    messageHeight = text.height + 60;
  } else {
    const text = scene.add
      .text(-550, y + 30, data.text, {
        ...textStyle,
        color: "#ffffff",
      })
      .setOrigin(0, 0);

    const userText = scene.add
      .text(-550, text.y - 10, data.user, textStyle)
      .setOrigin(0, 1);
    const graphics = scene.add.graphics();
    graphics.fillStyle(0x454739);
    graphics.fillRoundedRect(
      text.x - 20,
      text.y - 50,
      text.width + 40,
      text.height + 70,
      16
    );
    message.push(graphics);
    message.push(text);
    message.push(userText);

    messageHeight = text.height + 90;
  }
  return {
    messageArea: [...message],
    messageHeight,
  };
};
export default createLeagueMainDlg;
