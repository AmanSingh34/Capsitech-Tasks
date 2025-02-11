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
    message: " must select a state",
    validate: validateString,
  },
  {
    id: "country",
    message: "must select a country",
    validate: validateString,
  },
  { id: "address", message: "Address is required" },
  { id: "message", message: "Message is required" },
];

const stateOptions = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const stateSelect = document.getElementById("state");
stateSelect.innerHTML =
  `<option value="">Select State</option>` +
  stateOptions
    .map((state) => `<option value="${state}">${state}</option>`)
    .join("");

// Word Counter for Address & Message Fields

function addWordCounter(input, maxWords) {
  let counter = input.parentNode.querySelector(".word-counter");

  if (!counter) {
    counter = document.createElement("div");
    counter.classList.add("word-counter", "text-sm", "mt-1");
    input.parentNode.appendChild(counter);
  }

  input.addEventListener("input", function () {
    let words = input.value.trim().split(/\s+/).filter(Boolean);
    let wordCount = words.length;

    if (wordCount > maxWords) {
      input.value = words.slice(0, maxWords).join(" ");
      wordCount = maxWords;
    }

    counter.textContent = `${wordCount}/${maxWords}`;
    counter.classList.toggle("text-red-500", wordCount === maxWords);
    counter.classList.toggle("text-green-500", wordCount < maxWords);
  });
}

// Initialize word counters
addWordCounter(document.getElementById("message"), 200);
addWordCounter(document.getElementById("address"), 50);

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
  let iconElement = input.parentNode.querySelector(".validation-icon");
  let errorElement = input.parentNode.querySelector(".error-message");

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.classList.add("error-message", "text-red-500", "text-sm");
    input.parentNode.appendChild(errorElement);
  }

  if (!iconElement) {
    iconElement = document.createElement("span");
    iconElement.classList.add(
      "validation-icon",
      "absolute",
      "right-2",
      "top-8"
    );
    input.parentNode.appendChild(iconElement);
  }

  errorElement.textContent = "";
  iconElement.innerHTML = "";

  if (!input.value.trim()) {
    errorElement.textContent = errorMessage;
    iconElement.innerHTML = "❌";
    iconElement.classList.add("text-red-500");
    iconElement.classList.remove("text-green-500");
    return false;
  } else if (validationFunction && !validationFunction(input.value)) {
    errorElement.textContent = errorMessage;
    iconElement.innerHTML = "❌";
    iconElement.classList.add("text-red-500");
    iconElement.classList.remove("text-green-500");
    return false;
  } else {
    errorElement.textContent = "";
    iconElement.innerHTML = "✅";
    iconElement.classList.add("text-green-500");
    iconElement.classList.remove("text-red-500");
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
