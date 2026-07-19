const questions = document.querySelectorAll(".question");

const progressBar = document.getElementById("progressBar");

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const submitBtn = document.getElementById("submitBtn");

let currentQuestion = 0;

showQuestion();

function showQuestion() {

    questions.forEach(q => q.classList.remove("active"));

    questions[currentQuestion].classList.add("active");

    let progress = ((currentQuestion + 1) / questions.length) * 100;

    progressBar.style.width = progress + "%";

    prevBtn.style.display = currentQuestion === 0 ? "none" : "inline-block";

    if (currentQuestion === questions.length - 1) {

        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";

    } else {

        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";

    }

}

nextBtn.addEventListener("click", () => {

    if (!validateQuestion()) return;

    // Skip Question 5 if user selected Yes

    if (currentQuestion === 3) {

        const answer = document.querySelector('input[name="happy"]:checked');

        if (answer && answer.value === "Yes") {

            currentQuestion = 5;

            showQuestion();

            return;

        }

    }

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    }

});

prevBtn.addEventListener("click", () => {

    if (currentQuestion === 5) {

        const answer = document.querySelector('input[name="happy"]:checked');

        if (answer && answer.value === "Yes") {

            currentQuestion = 3;

            showQuestion();

            return;

        }

    }

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

});

function validateQuestion() {

    const current = questions[currentQuestion];

    const requiredFields = current.querySelectorAll("[required]");

    for (let field of requiredFields) {

        if (field.type === "radio") {

            const checked = current.querySelector('input[type="radio"]:checked');

            if (!checked) {

                alert("Please answer this question.");

                return false;

            }

        }

        else if (!field.value.trim()) {

            alert("Please complete this question.");

            field.focus();

            return false;

        }

    }

    return true;

}

document.getElementById("surveyForm").addEventListener("submit", async function(e){

    e.preventDefault();

    const happyAnswer = document.querySelector('input[name="happy"]:checked');

    const data = {

        name: document.getElementById("name").value,

        experience: document.getElementById("experience").value,

        issues: document.getElementById("issues").value,

        happy: happyAnswer ? happyAnswer.value : "",

        changes: document.getElementById("changes").value,

        future: document.getElementById("future").value

    };

    try{

        const response = await fetch("http://localhost:3000/send-feedback",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)

        });

        const result = await response.json();

        alert(result.message);

        location.reload();

    }

    catch{

        alert("Could not send feedback. Make sure the server is running.");

    }

});