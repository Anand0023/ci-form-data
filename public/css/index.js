document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const sendButton = document.getElementById("sendButton");

    function validateForm() {
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const phone = form.phone.value.trim();
        const option = form.option.value;
        const message = form.message.value.trim();
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{10}$/;

        const isValid = 
            name !== "" && 
            emailPattern.test(email) && 
            phonePattern.test(phone) && 
            option !== "" &&
            message !== "";

        sendButton.disabled = !isValid;
    }

    form.addEventListener("input", validateForm);
});
