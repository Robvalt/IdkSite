// 1. Strings must be wrapped in quotes
const sb = window.supabase.createClient(
  "https://zqfljtgheneihftmuoii.supabase.co", 
  "sb_publishable_ciQbcv8Fx4weHN44EPkSmA__c3aST8X"
);

const signup_btn = document.getElementById("login-btn");
const email_input = document.getElementById("email");
const pass_input = document.getElementById("password");
const info_label = document.getElementById("info");

signup_btn.addEventListener("click", async () => {
  const email = email_input.value;
  const pass = pass_input.value;

  // 2. Changed 'password' to 'pass' to match your variable above
  if (!email || !pass) {
    info_label.innerText = "Fill In All Inputs.";
    return;
  }

  info_label.innerText = "Logging In...";

  // 3. Use 'signInWithPassword' instead of 'login'
  const { data, error } = await sb.auth.signInWithPassword({
    email: email,
    password: pass,
  });

  if (error) {
    console.error("Login error:", error.message);
    info_label.innerText = "Error: " + error.message;
    return;
  }

  console.log("User logged in:", data.user);
  info_label.innerText = "Finished.";
  
  localStorage.setItem("bakery-email", email);
  window.location.href = "dashboard/dashboard.html"; // Added .html or correct path
});
