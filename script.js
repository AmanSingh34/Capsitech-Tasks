document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;
    const formData = {};

    const fields = [
      { id: "fullName", message: "Full Name is required" },
      {
        id: "email",
        message: "Enter a valid email",
        validate: validateEmail,
      },
      {
        id: "phone",
        message: "Enter a valid phone number",
        validate: validatePhone,
      },
      { id: "dob", message: "Date of Birth is required" },
      { id: "gender", message: "Gender is required" },
      { id: "city", message: "City is required" },
      { id: "state", message: "State is required" },
      { id: "country", message: "Country is required" },
      { id: "address", message: "Address is required" },
      { id: "message", message: "Message is required" },
    ];

    fields.forEach((field) => {
      const input = document.getElementById(field.id);
      let errorElement = input.nextElementSibling;
      if (!errorElement || !errorElement.classList.contains("error-message")) {
        errorElement = document.createElement("div");
        errorElement.classList.add("error-message", "text-red-500", "text-sm");
        input.parentNode.appendChild(errorElement);
      }
      errorElement.textContent = "";

      if (!input.value.trim()) {
        errorElement.textContent = field.message;
        isValid = false;
      } else if (field.validate && !field.validate(input.value)) {
        errorElement.textContent = field.message;
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
      alert("Please select a counselling session option.");
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
      alert("Form submitted successfully!");
      this.reset();
      fileNameDisplay.textContent = "Choose a file";
    }
  });
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
