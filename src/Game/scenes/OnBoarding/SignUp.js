import {
  addButton,
  fadeThisScreen,
  scaleBackground,
  transitionToNextScene,
} from "../../partials/common";
import toast from "react-hot-toast";
import { API_BASE_URL, fetchImplementation } from "../../../utils/fetchRequest";

const createOnBoardingSignUpScene = () => {
  return {
    key: "OnBoardingSignUpScene",
    preload: function () {},

    create: function () {
      const { width, height } = this.scale;
      scaleBackground(this, "SignUpBackground");

      // Create input fields
      const emailInput = this.add
        .rexInputText(width / 2 - 190, height / 2 - 80, 400, 56, {
          type: "email",
          id: "email",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Email",
          color: "#000",
        })
        .setOrigin(0, 0.5);
      const usernameInput = this.add
        .rexInputText(width / 2 - 190, height / 2 + 32, 400, 56, {
          type: "text",
          id: "usernameInput",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Username",
          color: "#000",
        })
        .setOrigin(0, 0.5);
      const passwordInput = this.add
        .rexInputText(width / 2 - 190, height / 2 + 144, 400, 56, {
          type: "password",
          id: "password",
          text: "",
          fontSize: "20px",
          fontFamily: "Kreon",
          placeholder: "Enter your Password",
          color: "#000",
        })
        .setOrigin(0, 0.5);

      addButton(this, "SignUpButton", 730, 800, async () => {
        const email = emailInput.text;
        const username = usernameInput.text;
        const password = passwordInput.text;

        // Validate email format using a regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
          alert("Kindly provide a proper email");
          return;
        }

        if (username?.length <= 3) {
          alert("Username should be of at least 3 words");
          return;
        }

        if (password?.length <= 6) {
          alert("Password should be at least 6 characters long");
          return;
        }

        await fetch(`${API_BASE_URL}register`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: username,
            email,
            password,
          }),
        })
          .then((res) => {
            toast.success("Account created successfully");
            transitionToNextScene(this, "OnBoardingSignInScene");
          })
          .catch((err) => {
            console.log("ERROR::?>>", err);
            alert(err.message);
            return;
          });
      });

      addButton(this, "SignInTextButton", 820, 720, () => {
        transitionToNextScene(this, "OnBoardingSignInScene");
      });

      fadeThisScreen(this);
    },
  };
};

export default createOnBoardingSignUpScene;
