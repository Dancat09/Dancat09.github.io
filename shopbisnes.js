const buyBtn = document.querySelector(".play");
let balance = parseFloat(localStorage.getItem("balance")) || 0;

if (balance >= 200) {
  buyBtn.style.pointerEvents = "auto";
  buyBtn.style.opacity = 1;
} else {
  buyBtn.style.pointerEvents = "none";
  buyBtn.style.opacity = 0.5;
  buyBtn.title = "Du trenger minst $200 for å kjøpe";
}

buyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  balance -= 500;
  localStorage.setItem("balance", balance);

  window.location.href = "Gamestart.html?show=bilde";
});
