import Phaser from "phaser";
function createListWidget(scene, x, y, w, h) {
  // Create a container for the list items
  const listContainer = scene.add.container(x, y);
  listContainer.setSize(w, h); // Set the width and height of the list area

  // Make the list area interactive
  listContainer.setInteractive(
    new Phaser.Geom.Rectangle(0, 0, w, h),
    Phaser.Geom.Rectangle.Contains
  );

  const maskShape = scene.make.graphics();
  maskShape.fillRect(0, 600, 2000, 300);
  const mask = maskShape.createGeometryMask();
  listContainer.setMask(mask);

  // Add items to the list
  populateList(scene, listContainer);

  // Enable scrolling behavior
  enableScrolling(scene, listContainer);
  return listContainer;
}

function populateList(scene, container) {
  const itemHeight = 30;
  const numItems = 20;

  for (let i = 0; i < numItems; i++) {
    const itemText = scene.add.text(0, i * itemHeight, `Item ${i + 1}`, {
      fontSize: "16px",
      color: "#fff",
    });
    itemText.setInteractive(); // Makes each item interactive

    // Handle item selection
    itemText.on("pointerdown", () => {});

    container.add(itemText); // Add the item to the container
  }
}

function enableScrolling(scene, container) {
  let isDragging = false;
  let startY = 0;

  // Start dragging
  container.on("pointerdown", (pointer) => {
    isDragging = true;
    startY = pointer.y;
  });

  // Handle dragging movement
  scene.input.on("pointermove", (pointer) => {
    if (!isDragging) return;

    const delta = pointer.y - startY;
    startY = pointer.y;

    // Move the container vertically
    container.y += delta;

    // Prevent the container from scrolling out of bounds
    container.y = Phaser.Math.Clamp(container.y, -container.height + 300, 100);
  });

  // End dragging
  scene.input.on("pointerup", () => {
    isDragging = false;
  });
}

export default createListWidget;
