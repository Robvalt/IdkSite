function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


document.addEventListener("DOMContentLoaded", async () => {
  let spammer = null;
  const directions = [0, 1, 2, 3]; // 0: up, 1: right, 2: down, 3: left
  const interval = 1;
  await delay(3000);
  const gameManager = window.game;

  if (!gameManager || typeof gameManager.move !== "function") {
    console.error("GameManager not found. Make sure it's exposed as window.game.");
    alert("GameManager Was Not Found, Reload To Try Again.")
    return;
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "b") {
      const inps = prompt("Password : ");
      const sps = 7043
      if (parseInt(inps) == sps) {
        if (spammer) {
          clearInterval(spammer);
          spammer = null;
          console.log("Spammer stopped.");
        } else {
          spammer = setInterval(() => {
            const dir = directions[Math.floor(Math.random() * directions.length)];
            gameManager.move(dir);
          }, interval);
          console.log("Spammer started.");
        }
      }
    }
    if (e.key === "z") {
      const inps = prompt("Password : ");
      const sps = 7043
      if (parseInt(inps) == sps) {
        gameManager.score += 10000;
        gameManager.actuate();
      }
    }
    if (e.key === "x") {
      const inps = prompt("Password : ");
      const sps = 7043
      if (parseInt(inps) == sps) {
        gameManager.won = true;
        gameManager.actuate();
      }
    }
  });
});