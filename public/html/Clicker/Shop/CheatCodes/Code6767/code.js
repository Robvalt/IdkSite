const pennyInput = document.getElementById('SetPennysInput');
const pennyButton = document.getElementById('SetPennysButton');
const backButton = document.getElementById('backButton')
let pennys = parseInt(localStorage.getItem("pennys")) || 0; // Load stored value

pennyButton.addEventListener("click", () => {
    let newPennys = parseInt(pennyInput.value); // Properly convert input value
    if (!isNaN(newPennys)) { // Ensure valid number input
        pennys += newPennys;
        localStorage.setItem("pennys", pennys); // Store updated value
        console.log(`Added extra pennies. New total: ${pennys}`);
    } else {
        console.log("Invalid number entered.");
        localStorage.setItem("pennys", "NotANumber"); // Store updated value
    }
});

backButton.addEventListener("click", (e) => {
   window.close(); 
});