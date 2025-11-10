if (!localStorage.getItem("balance")) {
  localStorage.setItem("balance", "0");
}

const gemEl = document.querySelector(".gem-cost");
let balance = parseFloat(localStorage.getItem("balance")) || 0;
if (gemEl) gemEl.textContent = Math.floor(balance);

function updateUI() {
  if (gemEl) gemEl.textContent = Math.floor(balance);

  const shopBtn = document.getElementById("shopicon");
  if (shopBtn) {
    shopBtn.style.pointerEvents = balance >= 500 ? "auto" : "none";
    shopBtn.style.opacity = balance >= 500 ? 1 : 0.5;
  }

  const autoCountEl = document.getElementById("autoCount");
  const doubleLevelEl = document.getElementById("doubleLevel");
  if (autoCountEl) autoCountEl.textContent = autoCount;
  if (doubleLevelEl) doubleLevelEl.textContent = "x" + clickMultiplier;

  const buyAutoBtn = document.getElementById("buyAutoBtn");
  if (buyAutoBtn)
    buyAutoBtn.textContent = `Buy autoclicker — cost ${costForAuto(autoCount)}`;
  const doubleBtn = document.getElementById("doubleBtn");
  if (doubleBtn)
    doubleBtn.textContent = `Upgrade Double (cost 100) — level x${clickMultiplier}`;
}

function save() {
  localStorage.setItem("balance", String(balance));
  localStorage.setItem("autoCount", String(autoCount));
  localStorage.setItem("clickMultiplier", String(clickMultiplier));
}

function updateFromLocalStorage() {
  balance = parseFloat(localStorage.getItem("balance")) || 0;
  autoCount = parseInt(localStorage.getItem("autoCount")) || 0;
  clickMultiplier = parseInt(localStorage.getItem("clickMultiplier")) || 1;
  updateUI();
  if (autoCount > 0) startAuto();
}

let autoCount = parseInt(localStorage.getItem("autoCount")) || 0;
let clickMultiplier = parseInt(localStorage.getItem("clickMultiplier")) || 1;
let autoInterval = null;

function addBalance(n) {
  updateFromLocalStorage();
  balance += n;
  save();
  updateUI();
}

function incrementGem() {
  addBalance(1 * clickMultiplier);
}

function costForAuto(n) {
  return Math.ceil(50 * Math.pow(1.5, n));
}

function startAuto() {
  if (autoInterval) return;
  autoInterval = setInterval(() => {
    if (autoCount > 0) addBalance(autoCount);
  }, 2000);
}

const btn1 = document.getElementById("btn1");
if (btn1) btn1.addEventListener("click", incrementGem);

const buyAutoBtn = document.getElementById("buyAutoBtn");
if (buyAutoBtn) {
  buyAutoBtn.addEventListener("click", () => {
    updateFromLocalStorage();
    const cost = costForAuto(autoCount);
    if (balance >= cost) {
      balance -= cost;
      autoCount += 1;
      save();
      updateUI();
      startAuto();
    } else {
      buyAutoBtn.animate(
        [
          { transform: "translateX(0)" },
          { transform: "translateX(-6px)" },
          { transform: "translateX(0)" },
        ],
        { duration: 160 }
      );
    }
  });
}

const doubleBtn = document.getElementById("doubleBtn");
if (doubleBtn) {
  doubleBtn.addEventListener("click", () => {
    updateFromLocalStorage();
    if (balance >= 100) {
      balance -= 100;
      clickMultiplier *= 2;
      save();
      updateUI();
    } else {
      doubleBtn.animate(
        [
          { transform: "translateY(0)" },
          { transform: "translateY(-6px)" },
          { transform: "translateY(0)" },
        ],
        { duration: 160 }
      );
    }
  });
}

const buyHouseBtn = document.getElementById("buyHouseBtn");
if (buyHouseBtn) {
  buyHouseBtn.addEventListener("click", () => {
    updateFromLocalStorage();
    const HOUSE_COST = 500;
    if (balance >= HOUSE_COST) {
      balance -= HOUSE_COST;
      save();
      updateUI();
    }
  });
}

if (autoCount > 0) startAuto();

updateUI();

window.updateFromLocalStorage = updateFromLocalStorage;
window.game = window.game || {};
window.game.addBalance = addBalance;
