let smileys = parseInt(localStorage.getItem("smileys")) || 0;
let buttonUpgradeWeight = parseInt(localStorage.getItem("SMILEYbuttonUpgradeWeight")) || 0;

document.getElementById("pennyDisplay").textContent = smileys;

function buyButtonUpgrade() {
  if (parseInt(smileys) >= parseInt(100)) {
    smileys -= 100;
    buttonUpgradeWeight += 1;
    localStorage.setItem("smileys", parseInt(smileys));
    localStorage.setItem("SMILEYbuttonUpgradeWeight", parseInt(buttonUpgradeWeight));
    alert("Button upgraded!");
    document.getElementById("pennyDisplay").textContent = parseInt(smileys);
  } else {
    alert("Not enough points!");
  }
}