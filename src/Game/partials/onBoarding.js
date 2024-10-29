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

const createInputField = (scene, x, y, placeholder, isPassword = false) => {
    const inputField = scene.add.dom(x, y).createElement('input');
    inputField.node.type = isPassword ? 'password' : 'text'; // Set the type
    inputField.node.placeholder = placeholder; // Set the placeholder

    // Apply styles directly to the DOM node
    Object.assign(inputField.node.style, {
      width: '200px',
      height: '30px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#333',
      border: '1px solid #fff',
      borderRadius: '5px',
      padding: '5px',
    });

    // Add input field to the scene
    scene.add.existing(inputField);
    return inputField;
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
