import toast from "react-hot-toast";
import { firebaseConfig } from "../../../utils/const";
import {
  addButton,
  fadeThisScreen,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";

const createOnBoardingForgotPasswordScene = () => {
  return {
    key: "OnBoardingForgotPasswordScene",
    preload: function () {},

    create: function () {
      scaleBackground(this, "ForgotPasswordBackground");
      const emailInput = this.add
        .rexInputText(530, 432, 400, 56, {
          type: "text",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Email",
          color: "#000",
        })
        .setOrigin(0, 0.5);

      addButton(this, "SendButton", 732, 515, async () => {
        const API_KEY = firebaseConfig.apiKey; // Replace with your actual API key
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;

        const payload = {
          requestType: "PASSWORD_RESET",
          email: emailInput.text,
        };

        try {
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error("Something went wrong.");
          }

          const data = await response.json();
          toast.success(
            "Password reset email sent successfully kindly check your mail inbox or spam."
          );
          // transitionToNextScene(this, "OnBoardingCheckMailScene");
        } catch (error) {
          console.error("Error:", error);
          alert("Failed to send password reset email. Try Again.");
        }
      });
      addButton(this, "SignInTextButton", 755, 565, () => {
        transitionToNextScene(this, "OnBoardingSignInScene");
      });

      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingForgotPasswordScene;
