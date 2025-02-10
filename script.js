const fields = [
  { id: "fullName", message: "Full Name is required" },
  { id: "email", message: "Enter a valid email", validate: validateEmail },
  {
    id: "phone",
    message: "Enter a valid phone number",
    validate: validatePhone,
  },
  { id: "dob", message: "Date of Birth is required" },
  { id: "gender", message: "Gender is required" },
  {
    id: "city",
    message: "City must contain only letters",
    validate: validateString,
  },
  {
    id: "state",
    message: "State must contain only letters",
    validate: validateString,
  },
  {
    id: "country",
    message: "Country must contain only letters",
    validate: validateString,
  },
  { id: "address", message: "Address is required" },
  { id: "message", message: "Message is required" },
];

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    const formData = {};

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      if (!validateField(input, field.validate, field.message)) {
        isValid = false;
      } else {
        formData[field.id] = input.value.trim();
      }
    });

    const counsellingOptions = document.getElementsByName("counselling");
    let counsellingSelected = false;
    counsellingOptions.forEach((option) => {
      if (option.checked) {
        counsellingSelected = true;
        formData["counselling"] = option.value;
      }
    });
    if (!counsellingSelected) {
      isValid = false;
      showCustomAlert("Please select a counselling session option.");
    }

    const fileInput = document.getElementById("cv");
    const fileNameDisplay =
      fileInput.previousElementSibling.querySelector("span");
    if (fileInput.files.length > 0) {
      formData["cv"] = fileInput.files[0].name;
      fileNameDisplay.textContent = fileInput.files[0].name;
    } else {
      fileNameDisplay.textContent = "Choose a file";
    }

    const terms = document.getElementById("terms");
    const termsLabel = document.getElementById("terms-label");
    let termsError = termsLabel.nextElementSibling;

    if (!termsError || !termsError.classList.contains("error-message")) {
      termsError = document.createElement("label");
      termsError.classList.add("error-message", "text-red-500", "text-sm");
      terms.parentNode.appendChild(termsError);
    }
    termsError.textContent = terms.checked
      ? ""
      : "You must agree to the terms and conditions";
    if (!terms.checked) isValid = false;

    if (isValid) {
      console.log("Form Data Submitted:", formData);
      showCustomAlert("Form submitted successfully!");
      this.reset();
      fileNameDisplay.textContent = "Choose a file";
    }
  });

document
  .querySelectorAll(
    "#contactForm input, #contactForm textarea, #contactForm select"
  )
  .forEach((input) => {
    input.addEventListener("input", function () {
      const fieldConfig = fields.find((field) => field.id === input.id);
      if (fieldConfig) {
        validateField(input, fieldConfig.validate, fieldConfig.message);
      }
    });
  });

function validateField(input, validationFunction, errorMessage) {
  let errorElement = input.nextElementSibling;
  if (!errorElement || !errorElement.classList.contains("error-message")) {
    errorElement = document.createElement("div");
    errorElement.classList.add("error-message", "text-red-500", "text-sm");
    input.parentNode.appendChild(errorElement);
  }

  if (!input.value.trim()) {
    errorElement.textContent = errorMessage;
    return false;
  } else if (validationFunction && !validationFunction(input.value)) {
    errorElement.textContent = errorMessage;
    return false;
  } else {
    errorElement.textContent = "";
    return true;
  }
}

const fileInput = document.getElementById("cv");
const fileNameDisplay = fileInput.previousElementSibling.querySelector("span");
fileInput.addEventListener("change", function () {
  if (fileInput.files.length > 0) {
    fileNameDisplay.textContent = fileInput.files[0].name;
  } else {
    fileNameDisplay.textContent = "Choose a file";
  }
});

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

function validateString(text) {
  return /^[a-zA-Z\s]+$/.test(text);
}

function showCustomAlert(message) {
  document.getElementById("customAlertMessage").textContent = message;
  document.getElementById("customBrowserAlert").classList.remove("hidden");
}

function hideCustomAlert() {
  document.getElementById("customBrowserAlert").classList.add("hidden");
}

if (!counsellingSelected) {
  showCustomAlert("Please select a counselling session option.");
}

if (isValid) {
  showCustomAlert("Form submitted successfully!");
}
