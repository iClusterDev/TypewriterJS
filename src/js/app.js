class Typewriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.wait = parseInt(wait, 10);
    this.txt = "";
    this.wordIndex = 0;
    this.isDeleting = false;
    this.type();
  }

  type() {
    const current = this.wordIndex % this.words.length;

    const fullTxt = this.words[current];

    let txtLength = this.txt.length;
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, --txtLength);
    } else {
      this.txt = fullTxt.substring(0, ++txtLength);
    }

    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    let typeSpeed = 200;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => {
      this.type();
    }, typeSpeed);
  }
}

// // init() method
function init() {
  const typewriterEl = document.querySelector(".txt-type");
  const words = JSON.parse(typewriterEl.getAttribute("data-words"));
  const wait = typewriterEl.getAttribute("data-wait");

  new Typewriter(typewriterEl, words, wait);
}

// // init on DOM load
document.addEventListener("DOMContentLoaded", init);
