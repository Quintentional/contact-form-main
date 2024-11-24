// -----------------------------------toggle between radio buttons-------------------------------
const radioDivs = document.querySelectorAll(".radio-div");

radioDivs.forEach((radioDiv) => {
  radioDiv.addEventListener("click", () => {
    radioDivs.forEach((otherRadioDiv) => {
      otherRadioDiv.classList.remove("focused");
      const otherRadioButton = otherRadioDiv.querySelector(
        ".radio-button-selected"
      );
      otherRadioButton.classList.remove("focused");
      otherRadioButton.style.display = "none";
    });
    const radioButton = radioDiv.querySelector(".radio-button-selected");
    radioDiv.classList.add("focused");
    radioButton.classList.add("focused");
    radioButton.style.display = "block";
  });
});

//  ----------------------------------toggle check box when clicked------------------------------

const consent = document.querySelector("#consent-check-div");
consent.addEventListener("click", () => {
  const checked = document.querySelector("#checked");
  checked.classList.toggle("active");
  //   alert('box was clicked');
});

// ----------------------------------------Submit Form on Button Click------------------------------
const button = document.querySelector("button");
let isFormValid = true;

button.addEventListener("click", (event) => {
  const nameInputs = document.querySelectorAll(".name");

  //   Show error for name inputs if empty
  nameInputs.forEach((input) => {
    if (input.value.trim() === "") {
      const parentDiv = input.closest(".name-div");
      const error = parentDiv.querySelector(".error");
      error.style.display = "block";
      event.preventDefault();
      isFormValid = false;
    } else {
      const parentDiv = input.closest(".name-div");
      const error = parentDiv.querySelector(".error");
      error.style.display = "none";
      isFormValid = true;
    }
  });

  //     Show error if email is blank or not an email

  const email = document.querySelector("#email");
  const emailError = document.querySelector(".email-error");
  const invalid = document.querySelector(".invalid");
  if (email.value === "") {
    emailError.style.display = "block";
    isFormValid = false;
  } else if (!validateEmail(email.value)) {
    invalid.style.display = "block";
    emailError.style.display = "none";
    event.preventDefault();
    isFormValid = false;
  } else {
    invalid.style.display = "none";
    isFormValid = true;
  }
  function validateEmail(email) {
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(String(email).toLowerCase());
  }

  //  Show error if no radio button is selected

  const radioDivs = document.querySelectorAll(".radio-div");
  const anyRadioSelected = Array.from(radioDivs).some((div) =>
    div.classList.contains("focused")
  );

  const radioError = document.querySelector(".query-error");
  if (!anyRadioSelected) {
    radioError.style.display = "block";
    isFormValid = false;
  } else {
    radioError.style.display = "none";
    isFormValid = true;
  }

  //  Show error for message if empty
  if (message.value === "") {
    const message = document.querySelector("#message");
    const messageError = document.querySelector(".message-error");
    messageError.style.display = "block";
    event.preventDefault();
    isFormValid = false;
  } else {
    const messageError = document.querySelector(".message-error");
    messageError.style.display = "none";
    isFormValid = true;
  }

  //    Show error if consent box is not checked

  if (!checked.classList.contains("active")) {
    const consentError = document.querySelector(".consent-error");
    consentError.style.display = "block";
    event.preventDefault();
    isFormValid = false;
  } else {
    const consentError = document.querySelector(".consent-error");
    consentError.style.display = "none";
    isFormValid = true;
  }

  //  Submit form if valid
  const success = document.querySelector("#success");

  // if (isFormValid === true) {
  //   success.style.display = "block";
  // }

  if (isFormValid) {
    // Save the success state in local storage
    localStorage.setItem("formSubmitted", "true");
  }
});

// On page load, check if the form was submitted
window.addEventListener("load", () => {
  const success = document.querySelector("#success");
  if (localStorage.getItem("formSubmitted") === "true") {
    success.style.display = "block";
    localStorage.removeItem("formSubmitted"); // Clear the flag
    
  }
});
