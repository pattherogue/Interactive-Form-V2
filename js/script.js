/* ***The "Name" Field*** */
/* first text field focus state on page load */
const inputName = document.getElementById('name');
inputName.focus();

/* *** "Job Role" section *** */
/* hide "other-job-role" when form first loads */
const otherJobRole = document.getElementById('other-job-role');
otherJobRole.style.display = 'none';

/* "T-Shirt Info" section */
/* display/hide "text field" based on user selection */
function otherJobTextField() {
    const jobTitle = document.getElementById('title');
    jobTitle.addEventListener('change', (e) => {
        if(e.target.value == 'other') {
            otherJobRole.style.display = 'block';
        } else {
            otherJobRole.style.display = 'none';
        }
    });
}

otherJobTextField();

/* disable the "color" select element */
const colorSelect = document.getElementById('color');
colorSelect.disabled = true;

/* program "design" select element to listen for user changes */
const shirtDesign = document.getElementById('design');
const colorOptions = colorSelect.children;
shirtDesign.addEventListener('change', (e) => {
    /* enable the "color" select element */
    colorSelect.disabled = false;
    for (let i = 0; colorOptions.length; i++) {
        const themeOfChoice = e.target.value;
        const dataTheme = colorOptions[i].getAttribute('data-theme');
        /* assign color options for Theme - "JS Puns" */
        /* assign color options forTheme - "I <3 JS" */
        if (themeOfChoice === dataTheme) {
            colorOptions[i].hidden = false;
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].removeAttribute = ('selected', false);
        }
    }
    /* disply proper color options of selected design */
    if (shirtDesign.value == 'js puns') {
        colorOption[1].selected = true;
    } else if (shirtDesign.value == 'heart js') {
        colorOption[4].selected = true;
    }
});

/* ***"Register for Activities" Section*** */
/* program fieldset element to listen for user changes */
const registerForActivities = document.getElementById('activities')
let totalCost = 0;
let boxesChecked = 0;

const checkBoxOptions = document.querySelectorAll('#activities input');

registerForActivities.addEventListener('change', (e) => {
    
    let selectedActivityCost = e.target.getAttribute('data-cost');
    selectedActivityCost = +selectedActivityCost;

     /* if checked total cost chould increase by value in attribute of element */
     if (e.target.checked === true) {
         totalCost += selectedActivityCost;
         boxesChecked++;
     } else {
         totalCost -= selectedActivityCost;
         boxesChecked--;
    } 
    
     /* update <p> element */
     let displayTotal = document.getElementById('activities-cost');
     displayTotal.innerHTML = `Total: $${totalCost}`;


    /* Prevent users from registering for conflicting activities
    /* when user selects activity, loop over all activities */
    for (let i = 0; i < checkBoxOptions.length; i++)
     /* check if same day and time */
    if (
        e.target.getAttribute('data-day-and-time') === 
            checkBoxOptions[i].getAttribute('data-day-and-time') && 
        e.target !== checkBoxOptions[i]
    ) {
         /* disable/enable accordingly */
        if (e.target.checked) {
            checkBoxOptions[i].disabled = true;
            checkBoxOptions[i].parentElement.className = 'disabled';
        } else {
            checkBoxOptions[i].disabled = false;
            checkBoxOptions[i].parentElement.className =  '';
        }
    }
});
 

/* ***Payment Info Section*** */
const paymentSelection = document.getElementById('payment');
const paymentOption = paymentSelection.children;

const creditCard = document.getElementById('credit-card');
const payPal = document.getElementById('paypal');
const bitCoin = document.getElementById('bitcoin');

const creditCardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvCode = document.getElementById('cvv');

/* credit card payment option selected for user by default */
paymentOption[1].setAttribute('selected', true);

/* update form display chosen payment method section */
payPal.style.display = 'none';
bitCoin.style.display = 'none';

/*  listen for changes */
paymentSelection.addEventListener('change', () => {
    /* hide all payment sections in form's UI except selected */
    if (paymentSelection.value === 'paypal') {
        payPal.style.display = 'block'
        creditCard.style.display = 'none';
        bitCoin.style.display = 'none';
    } else if (paymentSelection.value === 'credit-card') {
        payPal.style.display = 'none';
        creditCard.style.display = 'block';
        bitCoin.style.display = 'none'; 
    } else {
        payPal.style.display = 'none';
        creditCard.style.display = 'none';
        bitCoin.style.display = 'block'; 
    }
});



/* *** Form Validation *** */

/* program form element to listen for submit event */

/* "Name" field cannot be blank or empty */
const inputEmail = document.getElementById('email');

const validateName = () => {
    const enteredName = inputName.value;
    /* cannot be blank or empty */
    const nameValidated =  /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/gm.test(enteredName);
    return nameValidated;
};
/* "Email Address" field must be valid format */
const validateEmail = () => {
    const enteredEmail = inputEmail.value;
    /* username, "@" symbol, ".com" domain name */
    const emailValidated = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(enteredEmail.value);
    return emailValidated;
};

/* "Register for Activities" section must have at least on activity selected */
const validateActivities = () => {
    const activitiesValidated = totalCost > 0;
    return activitiesValidated;
};

/* if and only if credit card is selected pament method */
/* "Card number" field must contain 13 - 16 digit w/o dashes or spaces */
const validateCreditCard = () => {
    const creditCardValidated = /^(\d{13,16})$/.test(creditCardNumber.value);
    return creditCardValidated;
};

/* "Zip code" field must contain a 5 digit number */ 
const validateZipCode = () => {
    const zipCodeValidated = /^(\d{5})$/.test(zipCode.value);
    return zipCodeValidated;
};

/* "CVV" field must contain a 3 digit number */
const validateCVVCode = () => {
    const cVVCodeValidated = /^(\d{3})$/.test(cvvCode.value);
    return cVVCodeValidated;
}; 

/* Real-time error message */
/* program one required field to listen for user interaction */
creditCardNumber.addEventListener('keyup', (e) => {
    validationErrors(validateCreditCard(), e, creditCardNumber, 'cc-hint');
});

zipCode.addEventListener('keyup', (e) => {
    validationErrors(validateZipCode(), e, zipCode, 'zip-hint');
});

cvvCode.addEventListener('keyup', (e) => {
    validationErrors(validateCVVCode(), e, cvvCode, 'cvv-hint');
});

/* ***Accessibility*** */
/* make focus state obvious to all users */
/* program "checkbox input" to listen for "focus" and "blur" */
for (let i=0; i < checkBoxOptions.length; i++ ) {
    /* when "focus" is detected, add "focus" className to parent element */
    checkBoxOptions[i].addEventListener("focus", (e) => {
        checkBoxOptions[i].parentElement.classList.add('focus');
    });
    /* when "blur" is detected, remove "focus" className from element that possesses it */
    checkBoxOptions[i].addEventListener('blur', (e) => {
        checkBoxOptions[i].parentElement.classList.remove('focus');
    });
}

/* make the form validation errors obvious to all users */
/* when user submits form */ 
document.querySelector('form').addEventListener('submit', (e) => {
    validationErrors(validateName(), e, inputName, 'name-hint');
    /* if required form field is invalid */
    if(!validateEmail()) {
        e.preventDefault();
        /* Conditional Error Message */
        /* alert - blank field */
        if (inputEmail.value === '') {
                inputEmail.parentElement.className = 'not-valid';
                inputEmail.parentElement.lastElementChild.className = 'email-hint';
                inputEmail.parentElement.lastElementChild.innerHTML = 'Input field cannot be blank.';
            /* alert - format incorrect */
            } else {
                inputEmail.parentElement.className = 'not-valid';
                inputEmail.parentElement.lastElementChild.className = 'email-hint';
                inputEmail.parentElement.lastElementChild.innerHTML = 'Email address must be formatted correctly.';
            } 
        } else {
            inputEmail.parentElement.className = 'valid';
            inputEmail.parentElement.lastElementChild.className = 'email hint hint';
        }
        /* if required form field is invalid */
        if(!validateActivities()) {
            e.preventDefault();
            registerForActivities.className = 'activities not-valid';
            registerForActivities.lastElementChild.className = 'activities-hint';
        } else {
            registerForActivities.className = 'activities valid';
            registerForActivities.lastElementChild.className = 'activities hint hint';
        }

        if(paymentSelection.value === 'credit-card') {
            validationErrors(validateCreditCard(), e, creditCardNumber, "cc-hint");
            validationErrors(validateZipCode(), e, zipCode, "zip-hint" );
            validationErrors(validateCVVCode(), e, cvvCode, "cvv-hint");
        }
});

/* remove ".valid" className from parent element */
/* display ".hint" element associated with form field or section */



/* remove ".not-valid" className from parent element */
/* hide ".hint" element associeted with element */

function validationErrors(functionName, e, requiredField, classUpdate) {
    /* if required form field or section is invalid when submitting */
    if(!functionName) {
        e.preventDefault();
        /* add ".not-valid" className to parent element */
        requiredField.parentElement.className = 'not-valid';
        requiredField.parentElement.lastElementChild.className = classUpdate;
        /* if required form field or section is valid */
    } else {
        /* add ".valid" className to parent element */
        requiredField.parentElement.className = 'valid';
        requiredField.parentElement.lastElementChild.className = `${classUpdate} hint`;
    }
};



