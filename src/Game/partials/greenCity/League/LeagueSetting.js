import toast from "react-hot-toast";
import { addButton, addComboBox, addText } from "../../common";
import { closeDialog, organizeDialog, showDialog } from "../../menu/base";

/**
 * Shows a <LeagueSetting> dialog.
 *
 * @function createLeagueSettingDlg
 * @param {scene, onAccept}
 * @returns {void}
 */
const createLeagueSettingDlg = (scene) => {
  const dialogSetting = organizeDialog(scene, "CreateLeagueDialog", 1205, 511);

  const leagueSettings = addText(
    scene,
    "League Settings",
    0,
    -220,
    "Inter",
    "32px",
    "bold",
    "#FCB651",
    0.5,
    0.5
  );
  const privateButton = addButton(scene, "PrivateButton", -290, -50, () => {
    scene.statusValue = "Private";
    statusText.text = "Status: Private";
  });
  const publicButton = addButton(scene, "PublicButton", 280, -50, () => {
    scene.statusValue = "Public";
    statusText.text = "Status: Public";
  });
  const saveButton = addButton(scene, "SaveButton", 0, 170, async () => {
    const leagueName = nameInputFiled.text;
    const noOfPlayers = dropDownList.text;
    if (leagueName === "" || noOfPlayers === "") {
      toast.error("Please fill all the fields");
      return;
    }

    console.log(
      leagueName,
      "noOfPlayers",
      noOfPlayers,
      "scene>>>",
      scene.leagueData
    );
    // await fetchImplementation("post", `api/leagues/create`, {
    //   leagueName,
    //   numberOfPlayers: noOfPlayers.split(" ").pop(),
    //   isPrivate: scene.statusValue === "Private",
    // })
    //   .then((res) => {
    //     if (res.success) {
    //       toast.success("League created successfully");
    //     } else {
    //       toast.error("Error creating league");
    //     }
    //   })
    //   .catch((err) => {
    //     console.log("Error", err);
    //     toast.error("Error creating league");
    //   });

    // closeDialog(scene);
  });

  const statusText = addText(
    scene,
    "Status: Public",
    -450,
    220,
    "Inter",
    "24px",
    "bold",
    "#FFF",
    0.5,
    0.5
  );

  const nameInputFiled = scene.add.rexInputText(-290, 68, 480, 56, {
    type: "text",
    text: "",
    fontSize: "20px",
    fontFamily: "Kreon",
    placeholder: "Enter League name",
    color: "#000",
  });
  const options = [
    { text: "10", value: 0 },
    { text: "25", value: 1 },
    { text: "50", value: 2 },
  ];

  const dropDownList = addComboBox(
    scene,
    30,
    67,
    480,
    options,
    "Select no of players (10 to 50)"
  );
  scene.dialogContainer.add([
    ...dialogSetting,
    leagueSettings,
    privateButton,
    publicButton,
    saveButton,
    nameInputFiled,
    dropDownList,
  ]);
  showDialog(scene);
};

export default createLeagueSettingDlg;
