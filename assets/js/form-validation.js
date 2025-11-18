// Constants
const ERROR_OUTPUT_ID = "error-output";
const ERROR_OUTPUT_DURATION = 3000; // in ms
const INPUT_INVALID_FLASH = "flashing-input"; // css class to an invalid input element 

/** 
 * adds an error message to the dedicated error output element and style the input field
 * @param {string} errorOutputId the id of the error field 
 * @param {object} inputHandle the handle of the input field that caused the error
 * @param {number} duration amount of time in ms the message lasts
 * @param {string} errorMessage the message to display in the error field 
 */
function messageToErrorOutput(errorOutputId, inputHandle, duration, errorMessage) {
  errorOutputHandle = document.getElementById(errorOutputId);

  // throw error if errorOutputId isnt an output element.
  if (!errorOutputHandle || !(errorOutputHandle instanceof HTMLOutputElement)) { 
    throw new Error( `Error output element with 'input' type and id ${errorOutputId} not found.`)
  };

  // show error message in output
  inputHandle.classList.add(INPUT_INVALID_FLASH);
  errorOutputHandle.innerHTML = `<span> ${errorMessage} </span>`;
  setTimeout(()=>{errorOutputHandle.innerHTML=""; inputHandle.classList.remove(INPUT_INVALID_FLASH)}, duration);
}

/**
 * attaches a dynamic pattern validation handler to an input element.
 * displays a custom error message both in the dedicated error output element
 * and via the input's custom validity state.
 *
 * @param {HTMLInputElement} inputHandle the input element to validate
 * @param {string} patternErrorMsg the message to display when pattern validation fails
 * @param {string} errorOutputId the id of the output element for showing error messages
 * @param {number} duration how long (ms) the error message flash lasts
 * @param {string} flashClass css class applied to input during invalid state
 */
function attachPatternValidation(inputHandle, patternErrorMsg, errorOutputId, duration = ERROR_OUTPUT_DURATION, flashClass = INPUT_INVALID_FLASH) {
  inputHandle.addEventListener("input", () => {
    if (inputHandle.validity.tooLong || inputHandle.validity.tooShort ) {
      const invalidSizeMsg = "Content size invalid"
      inputHandle.setCustomValidity(invalidSizeMsg);
      messageToErrorOutput(errorOutputId, inputHandle, duration, invalidSizeMsg);
    } 
    else if (inputHandle.validity.patternMismatch) {
      inputHandle.setCustomValidity(patternErrorMsg);
      messageToErrorOutput(errorOutputId, inputHandle, duration, patternErrorMsg);
    } 
    else {
      inputHandle.setCustomValidity("");
    }
  });
}

// ------- Input area validation

let nameInputHandle = document.getElementById("name-input");
attachPatternValidation(nameInputHandle, "Name should begin with capitalized letter", "error-output");

let emailInputHandle = document.getElementById("email-input");
attachPatternValidation(emailInputHandle, "Please enter a valid email address i.e (user@example.com)", "error-output");

let phoneInputHandle = document.getElementById("phone-input");
attachPatternValidation(phoneInputHandle, "Please enter a valid phone number i.e (555-555-5555)", "error-output");

// ------- Text area char count
let infoOutputHandle = document.getElementById("info-output");
let commentInputHandle = document.getElementById("comment-input");

// number of characters in comment text area
let charCount = 0;
infoOutputHandle.innerHTML = `${charCount}`;

function updateCharCount() {
  infoOutputHandle.textContent = `${commentInputHandle.value.length}/${commentInputHandle.maxLength}`;
}

// initialize
updateCharCount();

// listen for typing
commentInputHandle.addEventListener("keyup", updateCharCount);

// ------- Form Error Field Handling
let formErrors = [];
const contactForm = document.getElementById("contact-form");

// check form every submit click
contactForm.querySelector("#submit-contact-form").addEventListener("click", (event)=>{
  // if form is invalid add errors to the error form
  if (!contactForm.checkValidity()) {

    let invalidFields = contactForm.querySelectorAll(":invalid");

    invalidFields.forEach(field => {
      formErrors.push({
        field: field.id,
        value: field.value,
        error: field.validationMessage
      });
    });
    contactForm.querySelector("#form-errors").value = JSON.stringify(formErrors);
    console.log(formErrors);
  }
}) 
