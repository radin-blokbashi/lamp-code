gsap.registerPlugin(Draggable);

const root = document.documentElement;
const body = document.body;
const loginForm = document.querySelector(".login-form");

const cordBead = document.querySelector(".cord-bead");
const cordLine = document.querySelector(".cord-line");
const hitArea = document.querySelector(".cord-hit");

let isOn = false;

const clickSound = new Audio("https://assets.codepen.io/605876/click.mp3");

Draggable.create(hitArea, {
  type: "y",
  bounds: {
    minY: 0,
    maxY: 60,
  },

  onDrag() {
    gsap.set(cordBead, {
      y: this.y,
    });

    gsap.set(cordLine, {
      attr: {
        y2: 180 + this.y,
      },
    });
  },

  // added: not in your screenshot
  onRelease() {
    if (this.y > 30) {
      isOn = !isOn;
      body.dataset.on = isOn;
      root.style.setProperty("--on", isOn ? 1 : 0);
      clickSound.play();
    }
    gsap.to(cordBead, { y: 0, duration: 0.3 });
    gsap.to(cordLine, { attr: { y2: 180 }, duration: 0.3 });
    gsap.set(hitArea, { y: 0 });
  },
});
