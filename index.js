const { exec } = require("child_process");

exec("npm start", (error, stdout, stderr) => {
    if (error) {
        console.error(`Error starting the server: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Server error: ${stderr}`);
        return;
    }
    console.log(`Server output: ${stdout}`);
});