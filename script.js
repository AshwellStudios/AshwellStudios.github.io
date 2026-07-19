const form = document.getElementById("feedbackForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(e){

    e.preventDefault();

    message.textContent = "✅ Thank you! Your feedback has been submitted.";

    form.reset();

});