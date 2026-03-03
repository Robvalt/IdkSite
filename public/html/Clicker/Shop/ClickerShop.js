let pennys = localStorage.getItem("pennys") || 0;
let buttonUpgradeWeight = localStorage.getItem("buttonUpgradeWeight") || 0;
let dvdUpgradeWeight = localStorage.getItem("dvdUpgradeWeight") || 0;

document.getElementById("pennyDisplay").textContent = pennys;

function buyButtonUpgrade() {
  if (pennys >= 100) {
    pennys -= 100;
    buttonUpgradeWeight += 1;
    localStorage.setItem("pennys", pennys);
    localStorage.setItem("buttonUpgradeWeight", buttonUpgradeWeight);
    alert("Button upgraded!");
    document.getElementById("pennyDisplay").textContent = pennys;
  } else {
    alert("Not enough points!");
  }
}

function buyDVDUpgrade() {
  if (pennys >= 250) {
    pennys -= 250;
    dvdUpgradeWeight += 1;
    localStorage.setItem("pennys", pennys);
    localStorage.setItem("dvdUpgradeWeight", dvdUpgradeWeight);
    alert("Griffin upgraded!");
    document.getElementById("pennyDisplay").textContent = pennys;
  } else {
    alert("Not enough points!");
  }
}

function popanim(el) {
  el.style.transition = "transform 0.1s ease";
  el.style.transform = "translate(-50%, -50%) scaleY(0.85)";

  setTimeout(() => {
    el.style.transform = "translate(-50%, -50%) scaleY(1)";
  }, 100);
}