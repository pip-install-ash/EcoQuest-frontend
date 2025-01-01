import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  addButton,
  addCheckButton,
  fadeThisScreen,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";
import toast from "react-hot-toast";
import { fetchImplementation } from "../../../utils/fetchRequest";

const createOnBoardingSignInScene = () => {
  return {
    key: "OnBoardingSignInScene",
    preload: function () {},

    create: function () {
      const { width, height } = this.scale;
      scaleBackground(this, "SignInBackground");

      this.showTutorial = true;
      const emailInput = this.add
        .rexInputText(width / 2 - 190, height / 2 - 80, 380, 56, {
          type: "text",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Email",
          color: "#000",
        })
        .setOrigin(0, 0.5);

      const passwordInput = this.add
        .rexInputText(width / 2 - 190, height / 2 + 32, 380, 56, {
          type: "password",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Password",
          color: "#000",
        })
        .setOrigin(0, 0.5);

      addButton(this, "SignInButton", 730, 750, async () => {
        const email = emailInput.text;
        const password = passwordInput.text;
        const auth = getAuth();
        // await setPersistence(auth, browserLocalPersistence)
        await signInWithEmailAndPassword(auth, email, password)
          .then(async (userData) => {
            localStorage.setItem("token", userData._tokenResponse.idToken);
            localStorage.setItem("email", email);

            const userDetails = await fetchImplementation(
              "get",
              "user-details",
              {}
            );
            const mapDetails = userDetails?.gameInitMap;
            localStorage.setItem("user", JSON.stringify(userDetails));
            localStorage.setItem(
              "userName",
              JSON.stringify(userDetails.userName)
            );
            mapDetails && localStorage.setItem("gameInitMap", mapDetails);
            toast.success("Successfully signed in");
            transitionToNextScene(this, "OnBoardingMenuScene");
          })
          .catch((err) => {
            alert(err.message);
          });
      });
      addButton(this, "ForgotPasswordButton", 880, 500, () => {
        transitionToNextScene(this, "OnBoardingForgotPasswordScene");
      });
      addCheckButton(
        this,
        "CheckButtonOn",
        "CheckButton",
        false,
        520,
        615,
        () => {}
      );

      addButton(this, "SignUpTextButton", 830, 680, () => {
        transitionToNextScene(this, "OnBoardingSignUpScene");
      });

      if (localStorage.getItem("token")) {
        transitionToNextScene(this, "OnBoardingMenuScene");
        fadeThisScreen(this);
      }
      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingSignInScene;
