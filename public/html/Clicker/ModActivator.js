const clickerBtn = document.getElementById("button");
const dvdLogo = document.getElementById("dvd");
const title = document.getElementById("Title");
const pennytitle = document.getElementById("pennyTitle");
let currentmod = localStorage.getItem("CLICKER-currentmod") || "none";
console.log("Currentmod : " + currentmod.toString());
console.log("Currentmod (localstorage) : " + localStorage.getItem("CLICKER-currentmod").toString() || "none");


if (currentmod == "none") {
    clickerBtn.src = "https://codehs.com/uploads/abe5c2da2a11e25bc2d0d4976f7a78fe"
    dvd.src = "https://codehs.com/uploads/abe5c2da2a11e25bc2d0d4976f7a78fe"
    title.innerText = "NEAAAT Clicker";
    pennytitle.innerText = "NEAAAT Points";
}
if (currentmod == "classic") {
    clickerBtn.src = "https://codehs.com/uploads/2f1dbe3312e6a8c10ff12677ab1747fa"
    dvd.src = "https://codehs.com/uploads/eed5719ce5382a96f2e790a7d4a46341"
    title.innerText = "Penny Clicker";
    pennytitle.innerText = "Pennys";
}