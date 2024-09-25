const items_list = [
  "Sprint",
  "Backlog",
  "Kanban",
  "Scrum",
  "Epic",
  "Retrospective",
  "Iteration",
  "Release",
  "Refactor",
  "Test",
  "Pair Programming",
  "TDD (Test-Driven Development)",
  "Increment",
  "DevOps",
  "Pipeline",
  "Automation",
  "Integration",
  "Deployment",
  "Feature Flag",
  "Pull Request",
  "Code Review",
  "Git",
  "Branch",
  "Merge",
  "Repository",
  "Docker",
  "Microservices",
  "DDD (domain driven design)",
  "API",
  "REST",
  "Cloud",
  "Azure Function",
  "Key Vault",
  "Database",
  "YAML",
  "Pipeline",
  "Network",
  "Load Balancer",
  "JWT (JSON Web Token)",
  "Subscription",
  "Tenant",
  "Queue",
  "Computer",
  "Keyboard",
  "Mouse",
  "Monitor",
  "Code",
  "Software",
  "Hardware",
  "Algorithm",
  "Function",
  "Variable",
  "Loop",
  "Array",
  "Class",
  "Object",
  "Compile",
  "Execute",
  "CPU",
  "RAM",
  "Storage",
  "Binary",
  "Protocol",
  "Server",
  "Client",
  "DNS",
  "IP Address",
  "Operating System",
  "File",
  "Folder",
  "HTML",
  "CSS",
  "JavaScript",
  "Encryption",
  "Firewall",
  "Router",
  "Debugger",
  "Text Editor",
  "Compiler",
  "Syntax",
  "GitHub",
  "Terminal",
  "Web Browser",
  "Cache",
  "Byte",
  "Library",
];

const reel_by_id = document.getElementById("reel");

items_list.forEach((item) => {
  const div = document.createElement("div");
  div.classList.add("item");
  div.textContent = item;
  reel_by_id.appendChild(div);
});

const reel = document.querySelector(".reel");
const items = document.querySelectorAll(".item");
const itemHeight = items[0].clientHeight;
const totalItems = items.length;

let currentPosition = 0;
let speed = 40;
const minSpeed = 1;
let hasReachedMinSpeed = false;
let isSpinning = false;
let isSlowingDown = false;

function expandList() {
  const reelHTML = reel.innerHTML;
  // Repeat the list 3 times for a longer, seamless scroll
  reel.innerHTML = reelHTML.repeat(3);
}

expandList();

function resetReel() {
  currentPosition = 0;
  speed = 40;
  hasReachedMinSpeed = false;
  isSpinning = true;
  isSlowingDown = false;
  targetIndex = Math.floor(Math.random() * totalItems);
  spinReel();
}

function spinReel() {
  if (!isSpinning) return; // Stop the animation if isSpinning is false

  // Move the reel upwards
  currentPosition += speed;
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
  resetReel();

  const gifDuration = 3000;

  setTimeout(function () {
    gifElement.src = "lever_frame.jpg";
  }, gifDuration);
});
