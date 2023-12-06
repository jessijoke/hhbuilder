
// Get the add button element
const addButton = document.querySelector('.add');
const ageInput = document.getElementById('age');
ageInput.setAttribute('type', 'number');
const relationshipInput = document.getElementById('rel');

// Create error elements
const ageErrorElement = document.createElement('div');
const relationshipErrorElement = document.createElement('div');

// Add classes to error elements
ageErrorElement.classList.add('ageError');
relationshipErrorElement.classList.add('relationshipError');

// Add error elements to the DOM
ageInput.parentNode.appendChild(ageErrorElement);
relationshipInput.parentNode.appendChild(relationshipErrorElement);

// Add event listener to the add button
addButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetErrorFields();
    if (!validateForm()) console.log('invalid form');
    
    // if (relationshipInput.value === '') {
    //     addErrorNotification(relationshipInput, 'Relationship is required.');
    // }
});

// check if age exists and is over 0, and if relationship exists
const validateForm = () => {
    // get age and relationship values
    const age = document.getElementById('age').value;
    const relationship = document.getElementById('rel').value;
    // get error elements
    const ageError = document.querySelector('.ageError');
    const relationshipError = document.querySelector('.relationshipError');
    // create consts for error messages
    const ageExistError = "Age is required";
    const ageOverZeroError = "Age must be over 0";
    const relationshipExistError = "Relationship is required";
    // check if age and relationship exist and if age is over 0
    if (!age) {
        addErrorNotification(ageError, ageExistError);
    } else if (age <= 0) {
        addErrorNotification(ageError, ageOverZeroError);
    } else if (!relationship) {
        addErrorNotification(relationshipError, relationshipExistError);
    }
    return true;
}

// reset error fields
const resetErrorFields = () => {
    // get error elements
    const ageError = document.querySelector('.ageError');
    const relationshipError = document.querySelector('.relationshipError');
    // reset error fields
    ageError.textContent = '';
    relationshipError.textContent = '';
}

function addErrorNotification(errorElement, errorMessage) {
    // Get the warning message element
    errorElement.textContent = errorMessage;
    // Set the warning message element's color to red
    errorElement.style.color = 'red';
}


