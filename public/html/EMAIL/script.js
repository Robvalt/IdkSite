// Initialize Supabase client
const supabase = window.supabase?.createClient(
  "https://nyhmukzndyzyyhwncqkq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im55aG11a3puZHl6eXlod25jcWtxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcwMjQ5MDEsImV4cCI6MjA3MjYwMDkwMX0.d7-mY5hJlNTxwmIidlzBL4FEH5j6jO6pvji2znCdvNw"
);

if (!supabase) {
  console.error("Supabase client failed to initialize.");
}

// Extract URL parameters
const urlParams = new URLSearchParams(window.location.search);
const emailparam = urlParams.get("to");
const msgparam = urlParams.get("msg");

// Pre-fill form fields if parameters exist
if (emailparam != null) {
  const receiverInput = document.getElementById("receiver");
  if (receiverInput) receiverInput.value = emailparam;
}

if (msgparam != null) {
  const msgInput = document.getElementById("msg");
  if (msgInput) msgInput.value = msgparam;
}


// Check for localStorage email
const localEmail = localStorage.getItem("email");
if (!localEmail) {
  const statusEl = document.getElementById("status");
  if (statusEl) {
    statusEl.innerText =
      'Error : {"errcode":"1","line":"15","desc":"localStorage has no item named: email"}';
    setTimeout(() => (statusEl.innerText = ""), 5000);
  }
}

// Handle form submission
document.getElementById("emailForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const sender = localStorage.getItem("email");
  const receiver = emailparam || document.getElementById("receiver")?.value;
  const msg = msgparam || document.getElementById("msg")?.value;
  const statusEl = document.getElementById("status");

  if (!sender || !receiver || !msg) {
    statusEl.innerText = "Missing required fields.";
    return;
  }

  const { error } = await supabase
    .from("EMAIL")
    .insert([{ email: sender, receiver, msg }]);

  if (error) {
    statusEl.innerText = "Failed to send email.";
    console.error(error);
  } else {
    statusEl.innerText = "Email sent successfully!";
    document.getElementById("emailForm").reset();
    await loadReceivedEmails();
    await loadSentEmails();
  }
});

// Load received emails
async function loadReceivedEmails() {
  const currentUser = localStorage.getItem("email");
  const container = document.getElementById("receivedEmails");
  if (!container || !currentUser) return;

  const { data, error } = await supabase
    .from("EMAIL")
    .select("*")
    .eq("receiver", currentUser)
    .order("created_at", { ascending: false });

  container.innerHTML = "";

  if (error) {
    container.innerText = "Failed to load received emails. Are you signed in?";
    console.error(error);
    return;
  }

  data?.forEach((email) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>From:</strong> ${email.email}<br>
      <strong>Time:</strong> ${new Date(email.created_at).toLocaleString()}<br>
      <p>${email.msg}</p>
      <hr>
    `;
    container.appendChild(div);
  });
}

// Load sent emails
async function loadSentEmails() {
  const currentUser = localStorage.getItem("email");
  const container = document.getElementById("sentEmails");
  if (!container || !currentUser) return;

  const { data, error } = await supabase
    .from("EMAIL")
    .select("*")
    .eq("email", currentUser)
    .order("created_at", { ascending: false });

  container.innerHTML = "";

  if (error) {
    container.innerText = "Failed to load sent emails.";
    console.error(error);
    return;
  }

  data?.forEach((email) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>To:</strong> ${email.receiver}<br>
      <strong>Time:</strong> ${new Date(email.created_at).toLocaleString()}<br>
      <p>${email.msg}</p>
      <hr>
    `;
    container.appendChild(div);
  });
}

// Initial load
loadReceivedEmails();
loadSentEmails();