const navLinks = document.querySelectorAll('.topnav a');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

let link
switch (window.location.hash) {
    case "eq":
        link = document.getElementById('eq-btn');
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    case "about":
        link = document.getElementById('about-btn');
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
}

if (!window.location.hash) {
    window.location.hash = "home";
}