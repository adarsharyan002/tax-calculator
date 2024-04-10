const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

document.addEventListener('DOMContentLoaded', function() {
    const numberInputs = document.querySelectorAll('.number-input');
    const ageSelect = document.getElementById('age');
    const calculateButton = document.getElementById('calculateButton');


   //event listener for input validation
    numberInputs.forEach(input => {
        input.addEventListener('input', function() {
            const isValid = validateNumberInput(this);
            toggleErrorIcon(this, !isValid);
        });
    });

    ageSelect.addEventListener('change', function() {
        const isValid = this.value !== '';
        toggleErrorIcon(this, !isValid);
    });

    calculateButton.addEventListener('click', function() {
        const isValidAge = ageSelect.value !== '';

        if (!isValidAge) {
            toggleErrorIcon(ageSelect, true);
            return;
        }

       //displaying model
        displayTaxModal();
    });
});

function validateNumberInput(input) {
    const value = input.value.trim();
    return !isNaN(value) && value !== '';
}

function toggleErrorIcon(input, show) {
    const errorIcon = input.nextElementSibling; 

    if (show) {
        errorIcon.classList.remove('d-none');
    } else {
        errorIcon.classList.add('d-none');
    }
}

function displayTaxModal() {
    const incomeInput = document.getElementById('income');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');
    const age = document.getElementById('age').value;

    const isValidIncome = validateNumberInput(incomeInput);
    const isValidExtraIncome = validateNumberInput(extraIncomeInput);
    const isValidDeductions = validateNumberInput(deductionsInput);

    // Display error icons based on input validity
    toggleErrorIcon(incomeInput, !isValidIncome);
    toggleErrorIcon(extraIncomeInput, !isValidExtraIncome);
    toggleErrorIcon(deductionsInput, !isValidDeductions);
    

    //validating inputs
    if (!isValidIncome || !isValidExtraIncome || !isValidDeductions) {
        return;
    }

    const income = parseFloat(incomeInput.value) / 100000;
    const extraIncome = parseFloat(extraIncomeInput.value) / 100000 || 0;
    const deductions = parseFloat(deductionsInput.value) / 100000 || 0;
    

    //logic to calculate the tax
    const totalIncome = income + extraIncome - deductions;
    let tax = 0;

    if (totalIncome > 8) {
        const incomeAbove8 = totalIncome - 8;

        if (age === '<40') {
            tax = 0.3 * incomeAbove8;
        } else if (age === '40-60') {
            tax = 0.4 * incomeAbove8;
        } else if (age === '60+') {
            tax = 0.1 * incomeAbove8;
        }
    }

    const taxInRupees = tax * 100000;

    const modalText = document.getElementById('modalText');
    modalText.textContent = `₹${taxInRupees.toFixed(2)}`;

    const modal = document.getElementById('modal');
    modal.style.display = 'flex';
}


//function to close the model
function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}