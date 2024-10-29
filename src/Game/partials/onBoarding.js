const styleDialog = (
  scene,
  dialogBackground,
  usernameInput,
  passwordInput,
  signUpButton
) => {
  const resizeDialog = () => {
    const width = scene.scale.width;
    const height = scene.scale.height;

    const dialogWidth = Math.min(400, width * 0.8);
    const dialogHeight = Math.min(300, height * 0.6);

    // Resize and reposition elements
    dialogBackground.setSize(dialogWidth, dialogHeight);
    usernameInput.setPosition(dialogWidth / 2, 120);
    passwordInput.setPosition(dialogWidth / 2, 170);
    signUpButton.setPosition(dialogWidth / 2, 220);
  };

  // Listen for resize events
  scene.scale.on("resize", resizeDialog);
  resizeDialog(); // Initial call to set sizes
};

const createInputField = (
  scene,
  elementName = "textInput",
  x,
  y,
  placeholder,
  isPassword = false
) => {
  let scaleX = window.innerWidth / 1440;
  let scaleY = window.innerHeight / 1024;
  const canvas = scene.game.canvas;
  const rect = canvas.getBoundingClientRect();
  const xOffset = rect.left; // Get the x offset value

  if (scaleX < scaleY) scaleY = scaleX;
  else scaleX = scaleY;

  const input = scene.add
    .text(x, y, placeholder, {
      font: "20px Kreon",
      fill: "#888",
    })
    .setOrigin(0, 0)
    .setInteractive();
  const inputElement = document.getElementById(elementName);
  inputElement.style.left = `${xOffset + input.x * scaleX}px`;
  inputElement.style.top = `${input.y * scaleY}px`;
  inputElement.style.width = `${340 * scaleX}px`;
  inputElement.style.height = `${20 * scaleX}px`;
  input.on("pointerdown", () => {
    inputElement.style.display = "block";
    inputElement.focus();
  });
  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      inputElement.style.display = "block";
      // emailInput.style.left = `${720}px`;
      // emailInput.style.top = `${450}px`;
      // emailInput.focus();
    }
  });
  inputElement.addEventListener("blur", (event) => {
    if (inputElement.value === "") inputElement.style.display = "none";
  });
  return input;
};

const onSignUp = (usernameInput, passwordInput) => {
  const username = usernameInput.domElement.value;
  const password = passwordInput.domElement.value;

  if (username && password) {
    console.log("Signing up:", { username, password });
    // Implement your sign-up logic here (e.g., send to server)
  } else {
    console.error("Please fill in both fields.");
  }
};
export { styleDialog, createInputField, onSignUp };
