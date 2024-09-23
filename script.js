const reel = document.querySelector(".reel");
const items = document.querySelectorAll(".item");
const itemHeight = items[0].clientHeight; // Height of each item
const totalItems = items.length;

let currentPosition = 0;
let speed = 40; // Starting speed
const minSpeed = 1; // The low speed to maintain until the item is centered
let hasReachedMinSpeed = false; // Flag to indicate minSpeed has been reached
let isSpinning = false; // Start with spinning disabled
let isSlowingDown = false; // Variable to indicate the reel is slowing down

// Expand the list by duplicating it multiple times for a smoother scrolling effect
function expandList() {
  const reelHTML = reel.innerHTML;
  // Repeat the list 3 times for a longer, seamless scroll
  reel.innerHTML = reelHTML.repeat(3);
}

// Call the function to expand the list before starting the animation
expandList();

function resetReel() {
  currentPosition = 0;
  speed = 40; // Reset starting speed
  hasReachedMinSpeed = false;
  isSpinning = true; // Enable spinning again
  isSlowingDown = false; // Reset the slowing down process
  targetIndex = Math.floor(Math.random() * totalItems); // Set a new random target item
  spinReel(); // Start spinning
}

function spinReel() {
  if (!isSpinning) return; // Stop the animation if isSpinning is false

  // Move the reel upwards
  currentPosition += speed;

  // Update the reel's position
  reel.style.transform = `translateY(-${currentPosition}px)`;

  // Start slowing down when near the target
  if (
    !isSlowingDown &&
    Math.abs(currentPosition - targetIndex * itemHeight) < 200
  ) {
    isSlowingDown = true;
  }

  // Gradually slow down, but not below minSpeed
  if (isSlowingDown && speed > minSpeed) {
    speed *= 0.95; // Gradual slowdown until minSpeed is reached
  }

  // When speed reaches minSpeed, maintain that speed and check for centering
  if (isSlowingDown && speed <= minSpeed) {
    speed = minSpeed;
    hasReachedMinSpeed = true;
  }

  if (hasReachedMinSpeed) {
    const offset = currentPosition % itemHeight;

    // If the current item is centered (offset is close to 0), stop the reel
    if (offset > 25 && offset < 35) {
      speed = 0; // Stop the reel
      isSpinning = false; // Ensure spinning stops
      return; // Exit the function
    }
  }

  // Continue the animation
  requestAnimationFrame(spinReel);
}

// Event listener for clicking the image to start spinning and play the GIF
const gifElement = document.getElementById("clickableGif");
gifElement.addEventListener("click", function () {
  isSpinning = true; // Enable spinning
  gifElement.src = "lever.gif"; // Restart the GIF by setting the src again

  // Immediately start the reel spinning
  resetReel();

  // Duration of the GIF in milliseconds (optional if you want to reset the image later)
  const gifDuration = 3000; // Set to the actual length of your GIF

  // After the GIF plays once, switch back to the still image (optional)
  setTimeout(function () {
    gifElement.src = "lever_frame.jpg"; // Reset to still image after the GIF finishes
  }, gifDuration);
});
