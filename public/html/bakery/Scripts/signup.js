const sb = window.supabase.createClient(
  'https://zqfljtgheneihftmuoii.supabase.co',
  'sb_publishable_ciQbcv8Fx4weHN44EPkSmA__c3aST8X'
);
const signup_btn = document.getElementById("signup-btn");
const email_input = document.getElementById("email");
const pass_input = document.getElementById("password");
const info_label = document.getElementById("info");

signup_btn.addEventListener("click", async () => {
    const email = email_input.value;
    const pass = pass_input.value;
    if (!email || !password) {
        info_label.innerText = "Fill In All Inputs.";
        return;
    }

    info_label.innerText = "Creating...";

    // 3. Using the correct sb client instance
    const { data, error } = await sb.auth.signUp({
        email: email,
        password: pass,
    });

    if (error) {
        console.error('Sign up error:', error.message);
        info_label.innerText = "Error: " + error.message;
        return;
    }

    console.log('User signed up:', data.user);
    info_label.innerText = "Finished, You May Now Login.";
});