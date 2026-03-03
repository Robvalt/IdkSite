const pennyDisplay = document.getElementById("pennyDisplay");
const button = document.getElementById("button");

let smileys = parseInt(localStorage.getItem("smileys")) || 0;
pennyDisplay.textContent = smileys;

let buttonUpgradeWeight = parseInt(localStorage.getItem("SMILEYbuttonUpgradeWeight")) || 0;

// Clicker logic
button.addEventListener("click", () => {
  smileys += Math.pow(2, buttonUpgradeWeight);
  pennyDisplay.textContent = smileys;
  localStorage.setItem("smileys", smileys);
});

// Reset logic
function resetPennys() {
  try {
    alert("RESETTING ALL SMILEYS")
    smileys = 0;
    localStorage.setItem("smileys", smileys);
    localStorage.setItem("SMILEYbuttonUpgradeWeight", 0)
    document.getElementById("pennyDisplay").textContent = smileys;
    alert("Successfully reset all data.");
  } catch (e) {
    alert("An error occurred :" + e)
  }
}