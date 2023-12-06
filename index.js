// Get the add button element
const addButton = document.querySelector('.add');
const ageInput = document.getElementById('age');
const smokerInput = document.getElementById('smoker');
const relationshipInput = document.getElementById('rel');
const submitButton = document.querySelector('button[type="submit"]');

// set ageInput to number
ageInput.setAttribute('type', 'number');

// set aria-label for relationshipInput to Relationship
relationshipInput.setAttribute('aria-label', 'Relationship');

// Create error elements
const ageErrorElement = document.createElement('div');
const relationshipErrorElement = document.createElement('div');

// Add classes to error elements
ageErrorElement.classList.add('ageError');
relationshipErrorElement.classList.add('relationshipError');

// Add aria-live polite to error elements
ageErrorElement.setAttribute('aria-live', 'polite');
relationshipErrorElement.setAttribute('aria-live', 'polite');

// Add accessible names to buttons
addButton.setAttribute('aria-label', 'Add Household Member');
submitButton.setAttribute('aria-label', 'Submit Household');

// Add error elements to the DOM
ageInput.parentNode.appendChild(ageErrorElement);
relationshipInput.parentNode.appendChild(relationshipErrorElement);

// Add event listener to the add button
addButton.addEventListener('click', (e) => {
    // prevent page refresh on button click
    e.preventDefault();
    // reset error fields on add click
    resetErrorFields();
    // if form is not valid, show error messages and return, else create household memeber and clear form fields
    if (!validateForm()) {
        return;
    } else {
        createHouseholdMember(ageInput.value, relationshipInput.value, smokerInput.checked);
        clearFormFields();
    }
});

// check if age exists and is over 0, and if relationship exists
function validateForm() {
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
        return false;
    } else if (age <= 0) {
        addErrorNotification(ageError, ageOverZeroError);
        return false;
    } else if (!relationship) {
        addErrorNotification(relationshipError, relationshipExistError);
        return false;
    }
    return true;
}

// reset error fields
function resetErrorFields() {
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

function createHouseholdMember(age, relationship, smoker) {
    // Create new li element
    const memberElement = document.createElement('li');

    // create household member info element
    const householdMemberInfo = document.createElement('div');

    // create a div element to display age
    const memberAge = document.createElement('div');
    memberAge.setAttribute('name', 'Age');
    memberAge.classList.add('memberAge');
    memberAge.textContent = `age: ${age}`;

    // create a div element to display relationship
    const memberRelationship = document.createElement('div');
    memberRelationship.setAttribute('name', 'Relationship');
    memberRelationship.classList.add('memberRelationship');
    memberRelationship.textContent = `relationship: ${relationship}`;

    // create a div element to display smoking status
    const memberSmoker = document.createElement('div');
    memberSmoker.setAttribute('name', 'Smoker');
    memberSmoker.classList.add('memberSmoker');
    memberSmoker.textContent = `smoker: ${smoker}`;

    // append age, relationship, and smoker to household member info element
    householdMemberInfo.appendChild(memberAge);
    householdMemberInfo.appendChild(memberRelationship);
    householdMemberInfo.appendChild(memberSmoker);

    // display age, relationship, and smoker in div element
    // householdMemberInfo.textContent = `age: ${age} / relationship: ${relationship} / Smoker: ${smoker}`;
    
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    
    // Add click event listener to delete button
    deleteButton.addEventListener('click', () => {
        memberElement.remove(); // Remove the entire li element
    });
    
    // Append member information and delete button to li element
    memberElement.appendChild(householdMemberInfo);
    memberElement.appendChild(deleteButton);
    
    // Get household list element
    const householdListElement = document.querySelector('.household');
    
    // Append li element to household list
    householdListElement.appendChild(memberElement);
};

// Clear form fields
function clearFormFields() {
    document.getElementById('age').value = '';
    document.getElementById('rel').value = '';
    document.getElementById('smoker').checked = false;
}

// prevent page refresh when submit button is clicked
submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    submitForm();
});
// submitForm serialize form data as JSON and display in element with classname of debug, then clear ol element
function submitForm() {
    // get household list element
    const householdMemberList = document.querySelector('.household');
    console.log(householdMemberList);
    // get household list items
    const householdListItems = householdMemberList.querySelectorAll('li');
    // create array to store household members
    const householdMembers = [];
    // loop through household list items and get household member information
    householdListItems.forEach((item) => {
        // get household member information
        const memberAge = item.querySelector('.memberAge').textContent;
        const memberRelationship = item.querySelector('.memberRelationship').textContent;
        const memberSmoker = item.querySelector('.memberSmoker').textContent;

        const householdMember = {
            age: memberAge.replace('age: ',''),
            relationship: memberRelationship.replace('relationship: ',''),
            smoker: memberSmoker.replace('smoker: ','')
        }
        // push household member object to household members array
        householdMembers.push(householdMember);
    });
    // create JSON object
    const household = {
        household: householdMembers
    }
    // get debug element
    const debugElement = document.querySelector('.debug');
    //fake a trip to the server
    sendForm(household, debugElement);
    // clear household list
    householdMemberList.innerHTML = '';
}

// fake a trip to the server
function sendForm(payload, debugElement) {
    fetch('/fake-server', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then((response) => debugElement.textContent = JSON.stringify(payload, null, 2))
    .catch((error) => {
        console.error(error);
    });
}
