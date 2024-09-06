//Кнопка прокрутки
document.addEventListener("DOMContentLoaded", function () {
    const backToTop = document.getElementById("back-to-top");

    // Показать/скрыть кнопку при прокрутке страницы
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    // Плавная прокрутка при клике на кнопку
    backToTop.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

// Бургер меню
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".burger").addEventListener("click", function () {
        this.classList.toggle("active");
        document.querySelector(".nav").classList.toggle("open");
    });
});

// Кнопки врачей

const buttons = document.querySelectorAll(".feedback_btn");
const doctorfeedbacks = document.querySelectorAll(".doctorfeedbacks");
buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
        doctorfeedbacks.forEach((feedback) => {
            feedback.classList.remove("feedback_open");
        });
        doctorfeedbacks[index].classList.toggle("feedback_open");
    });
});

// Форма
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    form.addEventListener("submit", formSend);

    async function formSend(event) {
        event.preventDefault();
        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add("_sending");
            let response = await fetch("sendmail.php", {
                method: "POST",
                body: formData,
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove("_sending");
            } else {
                alert("Ошибка");
                form.classList.remove("_sending");
            }
        } else {
            alert("Пожалуйста, заполните обязательные поля");
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll(".required");

        for (let i = 0; i < formReq.length; i++) {
            const input = formReq[i];
            formRemoveError(input);

            if (input.classList.contains("_email")) {
                if (!emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (
                input.getAttribute("type") === "checkbox" &&
                input.checked === false
            ) {
                formAddError(input);
                error++;
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");
    }

    function emailTest(input) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            input.value
        );
    }
});
