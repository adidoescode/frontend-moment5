"use strict";

// DOM

let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");
let navMenuEl = document.getElementById("nav-menu");
let aniBtnEl = document.getElementById("animationBtn")

// Event listeners


openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

// Nav-meny funktion

function toggleMenu() {


    if (navMenuEl.style.display === "none" || navMenuEl.style.display === "") {
        navMenuEl.style.display = "block";
    }
    else {
        navMenuEl.style.display = "none";
    }
}

// Funktion som kollar ifall alla fält har korrekt input, isåfall körs animationen för knappen

aniBtnEl.addEventListener('click', function () {
    if (validateForm()) {
        this.classList.add('active');
        // Submitar och snurrar knappen
    } else {
        alert("Var vänlig att fylla i fälten korrekt.");
    }
});

function validateForm() {
    var name = document.getElementById('text').value;
    var email = document.getElementById('email').value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Använder ett regex pattern jag hittade på internet för att avgöra om fälten har de värden som krävs

    // Ifall värdena stämmer körs funktionen som lägger till classen "active".

    if (name !== "" && emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}






