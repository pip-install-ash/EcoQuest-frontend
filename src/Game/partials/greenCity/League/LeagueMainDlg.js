import { addButton, addImage, addSlider, addText } from "../../common";
import { organizeDialog, showDialog } from "../../menu/base";
import Phaser from "phaser";
import "@fontsource/m-plus-rounded-1c";
import createInviteFriendDlg from "./InviteFriend";
import createLeagueSettingDlg from "./LeagueSetting";
import createLeaveLeagueDlg from "./LeaveLeague";
import createKickUserDlg from "./KickUser";
import { fetchImplementation } from "../../../../utils/fetchRequest";
import toast from "react-hot-toast";

const fetchUserData = async (leagueId) => {
  try {
    const leagueData = await fetchImplementation(
      "get",
      `api/leagues/details/${leagueId}`
    );

    if (!leagueData.success) {
      throw new Error("Network response was not ok");
    }
    return leagueData.data || [];
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return [];
  }
};

// const userData = await fetchUserData();
// let userData = [];
// (async () => {
//   userData = await fetchUserData();
// })();
// const userData = [
//   [1, "Michael Scott", 200, 200, 45, 0, 1],
//   [2, "Azmi Scott", 200, 200, 45, 1, 0],
//   [3, "Mic", 200, 200, 45, 1, 1],
//   [4, "Mict", 200, 200, 45, 1, 0],
//   [5, "Miccott", 200, 200, 45, 1, 1],
//   [6, "Mictt", 200, 200, 45, 1, 0],
//   [7, "Micott", 200, 200, 45, 1, 1],
// ];
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

const preLoadLeagueRequests = async (leagueID) => {
  try {
    console.log("leagaa>>", leagueID);
    return await fetchImplementation(
      "get",
      `api/coins-requests/pending-requests`,
      {
        leagueID,
      }
    ).then((res) => res.data);
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return [];
  }
};

/**
 * Shows a <LeagueMainDlg> dialog.
 *
 * @function createLeagueMainDlg
 * @param {scene}
 * @returns {void}
 */
const createLeagueMainDlg = async (scene, leagueId) => {
  const fetchedleagueData = await fetchUserData(leagueId);
  const leaguesRequests = await preLoadLeagueRequests(leagueId);
  let selectedDonation = null;
  const loginedUser = localStorage.getItem("user").length
    ? JSON.parse(localStorage.getItem("user"))
    : "";
  const leagueData = fetchedleagueData?.leagueData;
  const isUserOwner = fetchedleagueData?.isOwner;
  scene.leagueData = leagueData;
  const dialogSetting = organizeDialog(scene, "LeagueLobbyDialog", 1205, 795);
  const dialogBackground = dialogSetting[0];

  //Display League title
  const leagueTitle = addText(
    scene,
    leagueData?.leagueName || "Titanic House",
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
  content1.add(
    addButton(scene, "LeagueCodeButton", 60, -165, () => {
      navigator.clipboard.writeText(leagueData.joiningCode);
      toast.success("Joining code copied to clipboard");
    })
  );
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
  if (isUserOwner) {
    content1.add(
      addButton(scene, "LeagueLeaveSmallButton", 530, -165, () => {
        createLeaveLeagueDlg(scene, leagueData, isUserOwner); //here
      })
    );
  }
  content1.add(
    addText(
      scene,
      `Players: ${leagueData?.userPresent}/${leagueData?.numberOfPlayers}`,
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
      "Average Eco points: " + leagueData?.averageEcoPoints,
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
      `Owner: ${leagueData?.owner?.userName}`,
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
  lobbyContentContainer.height = 150;
  fetchedleagueData?.userData?.forEach((v) => {
    lobbyContentContainer.add(
      addUser(scene, v, leagueData, isUserOwner, loginedUser)
    );
    lobbyContentContainer.height += 100;
  });

  makeScrollArea(
    scene,
    lobbyContentContainer,
    100,
    558,
    1205,
    350,
    lobbyContentContainer.height
  );

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
  requestContentContainer.height = 400;
  console.log("leaguesRequests INSIDE>> :", leaguesRequests);

  // I didn't add the await so that I can have the array data parallel to the requestContentContainer
  // await leaguesRequests
  //   .then((res) => {
  leaguesRequests?.forEach((data, index) => {
    const yOffset = -150 + index * 145;

    addRequest(scene, data, requestContentContainer, yOffset);
    // Donate Button
    requestContentContainer.add(
      addButton(scene, "DonateButton", 170, yOffset + 30, () => {
        selectedDonation = data;
        console.log(data);
        donateDialogContainer.setVisible(true);
      })
    );

    requestContentContainer.height += 150;
  });
  // })
  // .catch((err) => {
  //   console.log("ERROR >>", err);
  // });

  // requestData?.

  makeScrollArea(
    scene,
    requestContentContainer,
    100,
    265,
    1205,
    480,
    requestContentContainer.height
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
    selectedDonation = null;
  });
  // Donate me poinst request Area
  const donateSendBtn = addButton(
    scene,
    "SendRequestSmallButton",
    140,
    220,
    () => {
      // fetchImplementation("post", "api/coins-requests/send-coins", {
      //   coinsRequestID
      // })
      //   .then((res) => {
      //     if (res.success) {
      //       toast.success("Sent successfully");
      //       donateDialogContainer.setVisible(false);
      //     } else {
      //       toast.error(res?.message || "Failed to donate.");
      //     }
      //   })
      //   .catch((err) => {
      //     console.error("Failed to donate.:", err);
      //     toast.error(err.message);
      //   });

      console.log(
        scene.donateCoinText.text,
        "\ndonateWaterText",
        scene.donateWaterText.text,
        "donateEleText",
        scene.donateEleText.text
      );
      console.log(leagueData.id, "Donation Sent", selectedDonation);
    }
  );
  scene.donateEleText = addText(
    scene,
    "200KW",
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

  scene.donateEleSlider = addSlider(
    scene,
    1,
    -80,
    -100,
    380,
    12,
    16,
    0xfcb651,
    (v) => {
      if (scene.donateEleText.text) {
        scene.donateEleText.setText(`${parseInt(300 * v)}KW`);
        scene.eleInputField.text = `${parseInt(300 * v)}`;
      }
    },
    2
  );
  scene.donateCoinSlider = addSlider(
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
      scene.coinInputField.text = `${parseInt(30000 * v)}`;
    },
    3
  );
  scene.donateWaterSlider = addSlider(
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
      scene.waterInputField.text = `${parseInt(200 * v)}`;
    },
    4
  );

  scene.eleInputField = scene.add.rexInputText(220, -115, 70, 56, {
    type: "number",
    text: "300",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "",
    color: "#9999",
  });

  scene.eleInputField.on("textchange", () => {
    const inputValue = parseInt(scene.eleInputField.text);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 300) {
      // Convert input value to RexUI slider scale (0-1)
      const sliderValue = inputValue / 300;
      scene.donateEleText.setText(`${parseInt(inputValue)}KW`);
      scene.donateEleSlider[1].x = -80 + 380 * (sliderValue - 0.5);
      scene.donateEleSlider[2].displayWidth = sliderValue * 380 - 6;
    }
  });
  scene.coinInputField = scene.add.rexInputText(220, 0, 70, 56, {
    type: "number",
    text: "327",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "",
    color: "#000",
  });
  scene.coinInputField.on("textchange", () => {
    const inputValue = parseInt(scene.coinInputField.text);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 30000) {
      // Convert input value to RexUI slider scale (0-1)
      const sliderValue = inputValue / 30000;
      scene.donateCoinText.setText(`$${parseInt(inputValue)}`);
      scene.donateCoinSlider[1].x = -80 + 380 * (sliderValue - 0.5);
      scene.donateCoinSlider[2].displayWidth = sliderValue * 380 - 6;
    }
  });
  scene.waterInputField = scene.add.rexInputText(220, 115, 70, 56, {
    type: "number",
    text: "200",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "",
    color: "#000",
  });

  scene.waterInputField.on("textchange", () => {
    const inputValue = parseInt(scene.waterInputField.text);
    if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 200) {
      // Convert input value to RexUI slider scale (0-1)
      const sliderValue = inputValue / 200;
      scene.donateWaterText.setText(`${parseInt(inputValue)}LTR`);
      scene.donateWaterSlider[1].x = -80 + 380 * (sliderValue - 0.5);
      scene.donateWaterSlider[2].displayWidth = sliderValue * 380 - 6;
    }
  });

  donateDialogContainer.add(donateCancelBtn);
  donateDialogContainer.add(donateSendBtn);
  donateDialogContainer.add(scene.donateEleSlider);
  donateDialogContainer.add(scene.donateCoinSlider);
  donateDialogContainer.add(scene.donateWaterSlider);
  donateDialogContainer.add(scene.donateEleText);
  donateDialogContainer.add(scene.donateCoinText);
  donateDialogContainer.add(scene.donateWaterText);
  donateDialogContainer.add(scene.eleInputField);
  donateDialogContainer.add(scene.coinInputField);
  donateDialogContainer.add(scene.waterInputField);
  donateDialogContainer.setVisible(false);

  // below is the request modal data
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
      fetchImplementation("post", "api/coins-requests/request-coins", {
        ...(leagueData?.id ? { leagueID: leagueData.id } : {}),
        coinsRequested: {
          electricity: requestEleInputField.text,
          water: requestWaterInputField.text,
          money: requestCoinInputField.text,
        },
      })
        .then((res) => {
          if (res.success) {
            toast.success("Request sent successfully");
            const leaguesRequests = preLoadLeagueRequests(leagueId);
            leaguesRequests
              .then((res) => {
                res?.forEach((data, index) => {
                  const yOffset = -150 + index * 145;

                  addRequest(scene, data, requestContentContainer, yOffset);
                  // Donate Button
                  requestContentContainer.add(
                    addButton(scene, "DonateButton", 170, yOffset + 30, () => {
                      selectedDonation = data;
                      console.log(data);
                      donateDialogContainer.setVisible(true);
                    })
                  );

                  requestContentContainer.height += 350;
                });
              })
              .catch((err) => {
                console.log("ERROR >>", err);
              });
            requestDialogContainer.setVisible(false);
          } else {
            toast.error(res?.message || "Failed to send request");
          }
        })
        .catch((err) => {
          console.error("Failed to send request:", err);
          toast.error(err.message);
        });

      console.log(
        leagueData.id,
        "LEAGUE ID\n",
        scene.donateCoinText.text,
        "RequestedREsorces>>",
        requestEleInputField.text,
        "<< ELE >>",
        requestCoinInputField.text,
        requestWaterInputField.text
      );
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
    text: "30",
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
export const makeScrollArea = (
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
const addUser = (scene, data, leagueData, isOwner, loginedUser) => {
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
    `${data[4]}`,
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
  if (isOwner) {
    if (data[5] === 0) {
      actionButton = addButton(
        scene,
        "ActionLeaveButton",
        480,
        30 + data[0] * 72,
        () => {
          createLeaveLeagueDlg(scene, leagueData, isOwner);
        }
      );
    } else {
      actionButton = addButton(
        scene,
        "ActionKickButton",
        480,
        30 + data[0] * 72,
        () => {
          createKickUserDlg(scene, data, leagueData.id);
        }
      );
      if (data[6] === 0) {
        actionStatus.push(addImage(scene, "Offline", 550, 20 + data[0] * 72));
      } else {
        actionStatus.push(addImage(scene, "Online", 550, 20 + data[0] * 72));
      }
    }
  } else {
    if (loginedUser?.user_id === data[7]) {
      actionButton = addButton(
        scene,
        "ActionLeaveButton",
        480,
        30 + data[0] * 72,
        () => {
          createKickUserDlg(scene, data, leagueData.id);
        }
      );
    }
  }
  const elements = [
    noText,
    userText,
    ecoText,
    coinText,
    buildingText,
    ...actionStatus,
  ];

  if (actionButton) {
    elements.push(actionButton);
  }

  return elements;
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

const addRequest = (scene, data, requestContentContainer, yOffset) => {
  const coinRequested = data.coinsRequested;
  // Background for the row
  requestContentContainer.add(
    addImage(scene, "RequestBackground", -150, yOffset)
  );

  requestContentContainer.add(
    addText(
      scene,
      data.name || "ASHLO",
      -530,
      yOffset - 20,
      "Inter",
      "18px",
      "Bold",
      "#FCB651",
      0,
      1
    )
  );

  requestContentContainer.add(
    addText(
      scene,
      coinRequested.electricity || "0",
      -440,
      yOffset + 30,
      "Inter",
      "16px",
      "Bold",
      "#FFFFFF",
      0,
      1
    )
  );

  requestContentContainer.add(
    addText(
      scene,
      coinRequested.money || "0",
      -240,
      yOffset + 30,
      "Inter",
      "16px",
      "Bold",
      "#FFFFFF",
      0,
      1
    )
  );

  requestContentContainer.add(
    addText(
      scene,
      coinRequested.water || "0",
      -15,
      yOffset + 30,
      "Inter",
      "16px",
      "Bold",
      "#FFFFFF",
      0,
      1
    )
  );
};

export default createLeagueMainDlg;
