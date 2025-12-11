// header
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.getElementById("navbar");
  const shopLink = document.querySelector(".shop-link");
  const shopParent = shopLink?.parentElement;

  hamburger.addEventListener("click", () => {
    navbar.classList.toggle("active");

    const isExpanded = navbar.classList.contains("active");
    hamburger.setAttribute("aria-expanded", isExpanded);

    const icon = hamburger.querySelector("i");
    icon.classList.toggle("fa-bars", !isExpanded);
    icon.classList.toggle("fa-xmark", isExpanded);
  });

  shopLink.addEventListener("click", (e) => {
    if (window.innerWidth <= 1035) {
      e.preventDefault();

      shopParent.classList.toggle("open");
    }
  });
});

class Slider {
  constructor(options) {
    this.container = document.getElementById(options.id);
    this.imgElement = this.container.querySelector(options.imageSelector);
    this.titleElement = options.titleSelector
      ? this.container.querySelector(options.titleSelector)
      : null;

    this.leftArrow = this.container.querySelector(".fa-angle-left");
    this.rightArrow = this.container.querySelector(".fa-angle-right");

    this.slides = options.slides;
    this.index = 0;

    // dots
    this.dotsContainer = this.container.querySelector(".progress-dots");
    this.dots = [];

    this.isHero = options.isHero || false;

    this.initDots();
    this.update();

    this.leftArrow.addEventListener("click", () => this.prev());
    this.rightArrow.addEventListener("click", () => this.next());
  }

  initDots() {
    this.dotsContainer.innerHTML = "";
    this.dots = [];

    this.slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");

      dot.addEventListener("click", () => {
        this.index = i;
        this.update();
      });

      this.dotsContainer.appendChild(dot);
      this.dots.push(dot);
    });
  }

  updateDots() {
    this.dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === this.index);
    });
  }

  next() {
    this.index = (this.index + 1) % this.slides.length;
    this.update();
  }

  prev() {
    this.index = (this.index - 1 + this.slides.length) % this.slides.length;
    this.update();
  }

  update() {
    const { title, image, bgColor } = this.slides[this.index];

    // background color
    this.container.style.backgroundColor = bgColor;
    if (this.isHero) {
      document.getElementById("header").style.backgroundColor = bgColor;
    }

    // title
    if (this.titleElement) {
      this.titleElement.innerHTML = title;
    }

    // image
    this.imgElement.style.opacity = 0;
    setTimeout(() => {
      this.imgElement.src = image;
      this.imgElement.style.opacity = 1;
    }, 300);

    this.updateDots();
  }
}

const slides = [
  {
    title: "SUMMER <br> EDITION",
    image: "./assets/images/summer_edition.png",
    bgColor: "#D63378",
  },
  {
    title: "SUGAR <br> FREE",
    image: "./assets/images/sugarfree_edition.png",
    bgColor: "#2292CD",
  },
  {
    title: "YELLOW <br> EDITION",
    image: "./assets/images/yellow_edition.png",
    bgColor: "#F2BF00",
  },
  {
    title: "RED <br> EDITION",
    image: "./assets/images/red_edition.png",
    bgColor: "#D82110",
  },
  {
    title: "BLUE <br> EDITION",
    image: "./assets/images/blue_edition.png",
    bgColor: "#1B67AE",
  },
  {
    title: "APRICOT <br> EDITION",
    image: "./assets/images/apricot_edition.png",
    bgColor: "#EC7603",
  },
];

new Slider({
  id: "hero-slider",
  imageSelector: ".product",
  slides,
  isHero: true,
});

new Slider({
  id: "slider2",
  imageSelector: ".can-image",
  titleSelector: ".main-title",
  slides,
});
