const reel = document.querySelector(".reel");
const items = document.querySelectorAll(".item");
const itemHeight = items[0].clientHeight; // Height of each item
const totalItems = items.length;

let currentPosition = 0;
let speed = 40; // Starting speed
const minSpeed = 1; // The low speed to maintain until the item is centered
let targetIndex = Math.floor(Math.random() * totalItems); // Choose a random target item
let hasReachedMinSpeed = false; // Flag to indicate minSpeed has been reached
let isSpinning = true; // Flag to control the animation loop

// Expand the list by duplicating it multiple times for a smoother scrolling effect
function expandList() {
  const reelHTML = reel.innerHTML;
  // Repeat the list 3 times for a longer, seamless scroll
  reel.innerHTML = reelHTML.repeat(3);
}

// Call the function to expand the list before starting the animation
expandList();

function spinReel() {
  if (!isSpinning) return; // Stop the animation if isSpinning is false

  // Move the reel upwards
  currentPosition += speed;

  // Update the reel's position
  reel.style.transform = `translateY(-${currentPosition}px)`;

  // Start slowing down when near the target
  if (Math.abs(currentPosition - targetIndex * itemHeight) < 200) {
    isSlowingDown = true;
  }

  // Gradually slow down, but not below minSpeed
  if (speed > minSpeed) {
    speed *= 0.95; // Gradual slowdown until minSpeed is reached
  }

  // When speed reaches minSpeed, mark it and maintain that speed
  if (speed <= minSpeed) {
    speed = minSpeed; // Lock speed to minSpeed
    hasReachedMinSpeed = true;
  }

  // Once we've reached minSpeed, check for centering
  if (hasReachedMinSpeed) {
    const offset = currentPosition % itemHeight;

    console.log(offset);

    // If the current item is centered (offset is close to 0), stop the reel
    if (offset > 25 && offset < 35) {
      speed = 0; // Stop the reel
    }
  }

  // Continue the animation
  requestAnimationFrame(spinReel);
}

// Start the reel spinning
requestAnimationFrame(spinReel);
