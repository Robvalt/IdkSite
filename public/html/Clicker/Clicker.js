const sb = window.supabase.createClient(
  'https://nyhmukzndyzyyhwncqkq.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55aG11a3puZHl6eXlod25jcWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMjQ5MDEsImV4cCI6MjA3MjYwMDkwMX0.d7-mY5hJlNTxwmIidlzBL4FEH5j6jO6pvji2znCdvNw'
);

const pennyDisplay = document.getElementById("pennyDisplay");
const button = document.getElementById("button");
const submitBtn = document.getElementById("submitScoreBtn");
const usernameInput = document.getElementById("username");
const dvd = document.getElementById("dvd");
let buttonUpgradeWeight = parseInt(localStorage.getItem("buttonUpgradeWeight")) || 0;

let pennys = parseInt(localStorage.getItem("pennys")) || 0;
pennyDisplay.textContent = pennys;

// Clicker logic
button.addEventListener("click", () => {
  pennys += Math.pow(2, buttonUpgradeWeight);
  pennyDisplay.textContent = pennys;
  localStorage.setItem("pennys", pennys);

  checkqa();
});

// Reset logic
function resetPennys() {
  try {
    alert("RESETTING ALL PENNYS")
    pennys = 0;
    localStorage.setItem("dvdUpgradeWeight", 0);
    localStorage.setItem("buttonUpgradeWeight", 0);
    localStorage.setItem("pennys", pennys);
    document.getElementById("pennyDisplay").textContent = pennys;
    alert("Successfully reset all data.");
  } catch (e) {
    alert("An error occurred :" + e)
  }
}

// Submit score to sb
submitBtn.addEventListener("click", async () => {
  if (localStorage.getItem("email") == null) {
    document.getElementById("lb-status").textContent = "Cant submit to leaderboard without being signed in!"
    return;
  }

  let name = usernameInput.value.trim() || "Unknown User (no username)";
  let oldpennys = pennys;

  // Anti-cheat check
  if (pennys >= Math.Infinity) {
    return;
  }

  // Hardcoded blocked words list
  const hardcodedBlockedWords = ["fuck", "shit", "ni", "nigger", "nigga", "nig", "poop", "hell", "penis", "dick", "admin", "leaderboard", "mods", "suck", "ass", "asshole", "butt", "buttcrack", "beer", "whisky", "alcohol", "balls", "fat", "gay", "bi", "LGBTQ", "911", "988", "666", "motherfucker", "mf", "middlefinger", "bitch", "asshole", "shitty", "die", "fatty", "fatso", "dumb", "dumbass", "gyat", "sibidi", "sigma", "brainrot", "tung", "la", "sahur","dick", "ti", "ta", "tra", "los", "bombardino", "hole", "a hole", "a-hole",'as',"as-hole","as hole","skibidi", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "suicide", "genocide", "cursive", "lick", "big"];

  // Normalize username
  const normalizedName = name.toLowerCase().replace(/[^a-z]/g, "");

  // Check against hardcoded list
  const containsHardcodedBlocked = hardcodedBlockedWords.some(word =>
    normalizedName.includes(word.toLowerCase())
  );

  if (containsHardcodedBlocked) {
    await sb.from('flagged_usernames').insert([
      { name, timestamp: new Date().toISOString() }
    ]);
    alert("Username contains restricted content and has been flagged. Score not submitted.");
    pennys = oldpennys;
    return;
  }

  // Fetch blocked words from sb
  const { data: blockedWordsData, error: blockedWordsError } = await sb
    .from('blocked_words')
    .select('word');

  if (blockedWordsError) {
    console.error("Error fetching blocked words:", blockedWordsError);
    alert("Error checking username. Try again later.");
    return;
  }

  const containssbBlocked = blockedWordsData.some(({ word }) =>
    normalizedName.includes(word.toLowerCase())
  );

  // Flag and block if username is inappropriate
  if (containssbBlocked) {
    await sb.from('flagged_usernames').insert([
      { name, timestamp: new Date().toISOString() }
    ]);
    alert("Username contains restricted content and has been flagged. Score not submitted.");
    pennys = oldpennys;
    return;
  }

  // Submit score if valid
  await sb.from('leaderboard').insert([{ name, score: pennys }]);
  loadLeaderboard();
  pennys = oldpennys;
});




// Load leaderboard
async function loadLeaderboard() {
  const { data, error } = await sb
    .from('leaderboard')
    .select('*')
    .order('score', { ascending: false })

  if (error) {
    console.error("Error loading leaderboard:", error);
    return;
  }

  const uniqueData = [];
  const seen = new Set();
  data.forEach(entry => {
    if (!seen.has(entry.name)) {
      seen.add(entry.name);
      uniqueData.push(entry);
    }
  });

  const list = document.getElementById("leaderboard");
  list.innerHTML = "";
  uniqueData.forEach((entry, index) => {
    const item = document.createElement("li");
    item.textContent = `#${index + 1} ${entry.name}: ${entry.score}`;
    list.appendChild(item);
  });
}

// Griffin DVD Bounce Logic
let x = Math.random() * (window.innerWidth - 100);
let y = Math.random() * (window.innerHeight - 50);
let dx = Math.pow(16, parseInt(localStorage.getItem("dvdUpgradeWeight")));
let dy = Math.pow(16, parseInt(localStorage.getItem("dvdUpgradeWeight")));

function bounce() {
  x += dx;
  y += dy;

  if (x + dvd.clientWidth >= window.innerWidth || x <= 0) {
    dx *= -1;
    pennys += Math.pow(2, parseInt(localStorage.getItem("dvdUpgradeWeight")));
    localStorage.setItem("pennys", pennys);
    pennyDisplay.textContent = pennys;
    // checkqa();
    changeColor();
  }

  if (y + dvd.clientHeight >= window.innerHeight || y <= 0) {
    dy *= -1;
    pennys += Math.pow(2, parseInt(localStorage.getItem("dvdUpgradeWeight")));
    localStorage.setItem("pennys", pennys);
    pennyDisplay.textContent = pennys;
    // checkqa();
    changeColor();
  }

  dvd.style.left = x + "px";
  dvd.style.top = y + "px";
  requestAnimationFrame(bounce);
}

function changeColor() {
  dvd.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
}

function showDVD() {
  dvd.style.display = "block";
  bounce();
}

// Start Griffin on load
window.addEventListener("load", () => {
  loadLeaderboard();
  showDVD();
});

function checkqa() {
  if (pennys % 50 == 1) {
    learningalert();
  }
}

function learningalert() {
  const messages = [
    "At NEAAAT Bullying is not permitted. if you are cought bullying, then you will be send a office referall.",
    "At NEAAAT If you are cought hurting or framing/blaming others you might face bigger consecuinces."
  ]
  let rand = Math.round(Math.random());
  let msg = messages[rand];
  alert(msg);
}
/* 
while (true) {
  setInterval(()=>{}, 1500);
  loadLeaderboard();
}
 */