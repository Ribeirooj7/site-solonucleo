// Menu mobile
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
}

const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

// Carrosel de imagens
const swiper = new Swiper(".obrasSwiper", {

  loop: true,

  spaceBetween: 30,

  grabCursor: true,

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },

  navigation: {
    nextEl: ".obras-next",
    prevEl: ".obras-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  breakpoints: {

    0: {
      slidesPerView: 1,
    },

    768: {
      slidesPerView: 2,
    },

    1200: {
      slidesPerView: 3,
    }

  }

});


// Scroll animation
const revealElements = document.querySelectorAll(".reveal-left, .reveal-up");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});


// Barra de progresso no topo
const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const alturaTotal = document.documentElement.scrollHeight - window.innerHeight;
  const progresso = (window.scrollY / alturaTotal) * 100;

  if (progressBar) {
    progressBar.style.width = progresso + "%";
  }
});


// Contador animado dos indicadores
const numberSection = document.querySelector(".numbers");
const numberTitles = document.querySelectorAll(".number-card h3");

let contadorExecutado = false;

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !contadorExecutado) {
        contadorExecutado = true;

        numberTitles.forEach((title) => {
          const textoOriginal = title.textContent.trim();

          // Só anima se tiver número
          if (!textoOriginal.match(/\d+/)) return;

          const temMais = textoOriginal.includes("+");
          const numeroFinal = parseInt(textoOriginal.replace(/\D/g, ""));

          let numeroAtual = 0;

          // duração total da animação
          const duracao = 2000;

          // quantidade de atualizações
          const frames = 60;

          // velocidade entre cada atualização
          const velocidade = duracao / frames;

          // quanto soma em cada frame
          const incremento = numeroFinal / frames;

          const animar = setInterval(() => {
            numeroAtual += incremento;

            if (numeroAtual >= numeroFinal) {
              title.textContent = temMais ? `+${numeroFinal}` : numeroFinal;
              clearInterval(animar);
            } else {
              title.textContent = temMais
              ? `+${Math.floor(numeroAtual)}`
              : Math.floor(numeroAtual);
            }
          }, velocidade);
        });
      }
    });
  },
  {
    threshold: 0.4,
  }
);

if (numberSection) {
  counterObserver.observe(numberSection);
}