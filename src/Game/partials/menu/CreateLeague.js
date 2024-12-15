import toast from "react-hot-toast";
import { fetchImplementation } from "../../../utils/fetchRequest";
import { addButton, addComboBox, addText } from "../common";
import { organizeDialog, showDialog } from "./base";
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
  scene.statusValue = "Public";

  const privateButton = addButton(scene, "PrivateButton", -290, -50, () => {
    scene.statusValue = "Private";
    statusText.text = "Status: Private";
  });
  const publicButton = addButton(scene, "PublicButton", 280, -50, () => {
    scene.statusValue = "Public";
    statusText.text = "Status: Public";
  });
  const createButton = addButton(scene, "CreateButton", 0, 170, async () => {
    const leagueName = nameInputFiled.text;
    const noOfPlayers = dropDownList.text;
    if (leagueName === "" || noOfPlayers === "") {
      toast.error("Please fill all the fields");
      return;
    }

    // leagueName, numberOfPlayers, (userIDs = []), isPrivate;
    await fetchImplementation("post", `api/leagues/create`, {
      leagueName,
      numberOfPlayers: noOfPlayers.split(" ").pop(),
      isPrivate: scene.statusValue === "Private",
    })
      .then((res) => {
        if (res.success) {
          toast.success("League created successfully");
        } else {
          toast.error("Error creating league");
        }
      })
      .catch((err) => {
        console.log("Error", err);
        toast.error("Error creating league");
      });
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
    { text: "2 to 20", value: 0 },
    { text: "20 to 50", value: 1 },
    { text: "50 to 100", value: 2 },
  ];

  const dropDownList = addComboBox(
    scene,
    30,
    67,
    480,
    options,
    "Select no of players 2 to 20"
  );

  scene.dialogContainer.add([
    ...dialogSetting,
    leagueSettings,
    statusText,
    privateButton,
    publicButton,
    createButton,
    nameInputFiled,
    dropDownList,
  ]);
  showDialog(scene);
};

export default createCreateLeagueDlg;
