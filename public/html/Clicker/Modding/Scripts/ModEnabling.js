const classicmodBtn = document.getElementById("modclassic-btn");

let currentmodenabled = localStorage.getItem("CLICKER-currentmod") || "none"

console.log("Currentmod : " + currentmodenabled.toString());
console.log("Currentmod (localstorage) : " + localStorage.getItem("CLICKER-currentmod").toString() || "none");

classicmodBtn.addEventListener("click", () => {
    let togglestate = false;
    togglestate = !togglestate;
    if (togglestate) {
        currentmodenabled = "classic";
        localStorage.setItem("CLICKER-currentmod", currentmodenabled);
        console.log("Currentmod : " + currentmodenabled.toString());
        console.log("Currentmod (localstorage) : " + localStorage.getItem("CLICKER-currentmod").toString() || "none");
    } else {
        currentmodenabled = "none";
        localStorage.setItem("CLICKER-currentmod", currentmodenabled);
        console.log("Currentmod : " + currentmodenabled.toString());
        console.log("Currentmod (localstorage) : " + localStorage.getItem("CLICKER-currentmod").toString() || "none");  
    }
});