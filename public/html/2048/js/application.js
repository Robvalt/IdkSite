




// Wait till the browser is ready to render the game (avoids glitches)
document.addEventListener("DOMContentLoaded", async () => {
  window.game = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
  document.addEventListener("keydown", (event) => {
    if (event.key == "c") {
      alert("Reloading...");
      window.location.href = "kitten158.codehs.me/2048/index.html";
    }
  });
});