import toast from "react-hot-toast";
import { fetchImplementation } from "../../../utils/fetchRequest";
import { addButton } from "../common";

/**
 * Makes a <AmountInfo> panel.
 *
 * @function createAmountInfo
 * @param {scene, left, top}
 * @returns {void}
 */
const AmountInfo = async (scene, left, top) => {
  const isLeagueOn = localStorage.getItem("activeLeagueId");

  // this.leagueIsActive = isLeagueOn?.length > 1 ? isLeagueOn : false;
  const accountsStats = await fetchImplementation(
    "get",
    isLeagueOn?.length > 1
      ? `api/league-stats/${isLeagueOn}?isGameOn=true`
      : "api/points/all-points"
  )
    .then((res) => {
      return isLeagueOn?.length > 1 ? res.data.leagueStats : res.data;
    })
    .catch((err) => {
      console.log("first fetch error", err);
    });

  const dataValue = accountsStats;
  scene.dataValue = dataValue;
  // scene.waterTap = 200;

  const graphics = scene.add.graphics();
  graphics.fillStyle(0x000000, 0.4);
  graphics.fillRoundedRect(left, top + 5, 160, 32, 16);
  graphics.fillRoundedRect(left, top + 63, 160, 32, 16);
  graphics.fillRoundedRect(left + 191, top + 5, 160, 32, 16);
  graphics.fillRoundedRect(left + 191, top + 63, 160, 32, 16);
  addButton(scene, "LeafIcon", left + 145, top + 20, () => {});
  addButton(scene, "ElectricityIcon", left + 145, top + 80, async () => {
    const accountsStats = await fetchImplementation(
      "post",
      `api/user/days-based-points-calculation`,
      {
        ...(isLeagueOn.length > 1 ? { leagueId: isLeagueOn } : {}),
        noOfDays: 5,
      }
    )
      .then((res) => {
        console.log("RESS>>>", res);
        toast.success(
          res.message || "Points added successfully for 5 days forward."
        );
        updateTextValues(res.data);
      })
      .catch((err) => {
        console.log("first fetch error", err);
      });
  });
  addButton(scene, "BankIcon", left + 335, top + 20, () => {});
  addButton(scene, "WaterIcon", left + 335, top + 80, () => {
    // waterText.text = scene.waterTap++;
  });

  //Eco point
  const ecoPoints = scene.add
    .text(left + 15, top + 21, "200", {
      fontFamily: "Kreon",
      fontStyle: "bold",
      fontSize: "18px",
    })
    .setOrigin(0, 0.5);
  //Coin point
  const goldCoins = scene.add
    .text(left + 206, top + 21, "$100,000", {
      fontFamily: "Kreon",
      fontStyle: "bold",
      fontSize: "18px",
    })
    .setOrigin(0, 0.5);
  //Ele point
  const elePoints = scene.add
    .text(left + 15, top + 79, "$100,000", {
      fontFamily: "Kreon",
      fontStyle: "bold",
      fontSize: "18px",
    })
    .setOrigin(0, 0.5);
  //Water point
  const waterText = scene.add
    .text(left + 206, top + 79, "200", {
      fontFamily: "Kreon",
      fontStyle: "bold",
      fontSize: "18px",
    })
    .setOrigin(0, 0.5);

  const updateTextValues = (dataValue) => {
    if (dataValue.ecoPoints !== undefined) {
      ecoPoints.setText(dataValue.ecoPoints);
    }
    if (dataValue.coins !== undefined) {
      goldCoins.text = dataValue.coins;
    }
    if (dataValue.electricity !== undefined) {
      elePoints.text = dataValue.electricity;
    }
    if (dataValue.water !== undefined) {
      waterText.text = dataValue.water;
    }
    if (dataValue.population !== undefined) {
      scene.updatePopulation(dataValue.population, dataValue.garbage);
    }
  };

  // update value accourding to the dataValues of the user account
  if (dataValue) {
    updateTextValues(dataValue);
  }

  const updateStats = (newStats) => {
    if (newStats.ecoPoints !== undefined) {
      dataValue.ecoPoints -= newStats.ecoPoints;
      ecoPoints.setText(dataValue.ecoPoints);
    }
    if (newStats.cost !== undefined) {
      dataValue.coins -= newStats.cost + newStats.taxIncome;
      goldCoins.text = dataValue.coins;
    }
    if (newStats.electricityConsumption !== undefined) {
      dataValue.electricity -= newStats.electricityConsumption;
      elePoints.setText(dataValue.electricity);
    }
    if (newStats.waterUsage !== undefined) {
      dataValue.water -= newStats.waterUsage;
      waterText.text = dataValue.water;
    }
    if (newStats.residentCapacity !== undefined) {
      dataValue.population += newStats.residentCapacity;
      scene.updatePopulation(dataValue.population);
    }
  };

  scene.updateStats = updateStats;
};

export default AmountInfo;
