const canvas = document.getElementById("background");
const ctx = canvas.getContext("2d");

// Resize canvas to fit the content area
function resizeCanvas() {
  const content = document.querySelector(".content");
  const contentRect = content.getBoundingClientRect();
  
  // Set the canvas size to match the content's width and height
  canvas.width = contentRect.width;
  canvas.height = contentRect.height;
  
  createParticles(); // Recreate particles when resizing
}

// Create a particle array with a dynamic number of particles based on screen size
let particles = [];
let particleCount = Math.floor(window.innerWidth / 10); // Adjust based on screen width

// Particle class
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce particles off the canvas edges
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

// Function to create particles dynamically
function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

// Animate the particles on the canvas
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw each particle
  particles.forEach((particle) => {
    particle.update();
    particle.draw();
  });

  // Connect nearby particles with lines if they are close enough
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // If particles are close, draw a line between them
      if (distance < 100) {
        ctx.strokeStyle = "rgba(0,0,0, 0.5)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Repeat animation
  requestAnimationFrame(animate);
}

// Initialize the canvas and particles
resizeCanvas();
animate();

// Adjust canvas size and particle count when resizing the window
window.addEventListener("resize", () => {
  resizeCanvas();
});