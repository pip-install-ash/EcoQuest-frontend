import { fetchImplementation } from "../../../utils/fetchRequest";
import { addButton } from "../common";
import { makeScrollArea } from "../greenCity/League/LeagueMainDlg";
import { displayNotification, organizeDialog, showDialog } from "./base";

const notifications = [
  {
    notificationType: "disaster",
    message:
      "There have been a disaster! Run back to your city and save your civilians",
    time: "30 minutes ago",
  },
  {
    notificationType: "ecoChallenge",
    message:
      "There have been a disaster! Run back to your city and save your civilians",
    time: "30 minutes ago",
  },
  {
    notificationType: "resourcesRecieved",
    message:
      "New echo challenge (<span style='color: #FCB651;'>Scranton league</span>): Build new set of Solar panels to gain <span style='color: #10EE1A;'>+20 points</span>",
    time: "30 minutes ago",
  },
  {
    notificationType: "leagueInvitation",
    message:
      "Resource received : <span style='color: #E99A45;'>+1000 gold</span>, <span style='color: #1e90ff;'>+200KW</span>, 100 LITER<br>(David Wallace, Ken Adams, Regina Phalange)",
    time: "30 minutes ago",
  },
];

const getNotification = async () => {
  return await fetchImplementation("get", "api/notifications/all-notifications")
    .then((res) => {
      console.log("res<<", res);
      return res.data;
    })
    .catch((err) => {
      console.log("first fetch error", err);
      return [];
    });
};
/**
 * Shows a <Notification> dialog.
 *
 * @function createExitDlg
 * @param {scene, onAccept}
 * @returns {void}
 */

const createNotificationDlg = async (scene) => {
  const getAllNotifications = await getNotification();
  const dialogSetting = organizeDialog(scene, "NotificationDialog", 1314, 877);

  const contentContainer = scene.add.container(0, 0);
  contentContainer.height = 250;
  let yOffset = -290;

  getAllNotifications.forEach((notification) => {
    contentContainer.add(displayNotification(scene, notification, yOffset));
    yOffset += 140; // Space between notifications
    contentContainer.height += 250;
  });

  // makeScrollArea(
  //   scene,
  //   contentContainer,
  //   20, // changed from 0
  //   300, // changed from 320
  //   1314,
  //   550,
  //   contentContainer.height
  // );

  const clearAllButton = addButton(
    scene,
    "ClearAllButton",
    1314 * 0.5 - 129,
    -(877 * 0.5) + 7,
    () => {
      contentContainer.removeAll(true);
    }
  );

  scene.dialogContainer.add([
    ...dialogSetting,
    clearAllButton,
    contentContainer,
  ]);
  showDialog(scene);
};

export default createNotificationDlg;
