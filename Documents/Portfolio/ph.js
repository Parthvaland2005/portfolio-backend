
function myMenuFunction() {
    var menu = document.getElementById("myNavMenu");
    menu.classList.toggle("responsive");

}

window.onscroll = function() {headerShadow()};

function headerShadow() {
    const navHeader = document.getElementById("header");
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {

        navHeader.style.boxShadow = "0 1px 6px rgba(0,0,0,0.1)";;
        navHeader.style.height = "70px";
        navHeader.style.lineHeight = "70px";
    } else {
        navHeader.style.boxShadow = "none";
        navHeader.style.height = "80px";
        navHeader.style.lineHeight = "80px";
    }
}
document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = {
        name: this.name.value,
        email: this.email.value,
        message: this.message.value
    };

    try {
        const response = await fetch("http://localhost:5501/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.success) {
            alert(" Message Sent Successfully!");
            this.reset();
        } else {
            alert(" Failed to send message.");
        }

    } catch (error) {
        alert(" Server Error. Try again later.");
    }
});
