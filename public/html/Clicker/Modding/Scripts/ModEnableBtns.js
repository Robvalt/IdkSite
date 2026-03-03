const mod_enablebtns = document.getElementsByClassName("mod-enable");

for (let i = 0; i < mod_enablebtns.length; i++) {
    let btn = mod_enablebtns[i];
    if (!btn) {
        console.log("BTN can't be found");
        break;
    }

    let togglestate = false;
    btn.addEventListener("click", () => {
        togglestate = !togglestate;
        if (togglestate) {
            btn.style.backgroundColor = "#00ff00"; // green
        } else {
            btn.style.backgroundColor = "#ff0000"; // red
        }
    });
}