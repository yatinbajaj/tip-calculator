let resetBtn = document.getElementById('reset');
let displayTotalAmount = document.getElementById('total-amount');
let displayTipAmount = document.getElementById('tip-amount');
let numberOfPeopleInput = document.getElementById('number-of-people');
let billInput = document.getElementById('bill-input');
let tipButton = document.getElementsByClassName('percentage-btn');
let billErrorLabel = document.getElementById('bill-error-label');
let peopleErrorLabel = document.getElementById('people-error-label');
let customTipInput = document.getElementById('custom-tip-input');

let billAmount = 0;
let peopleCount = 0;
let tipPercentage = 0;

billInput.oninput = ({ target }) => {
    billAmount = target.value;
};

billInput.onblur = ({ target }) => {
    billAmount = parseFloat(target.value);
    if (billAmount === 0 || isNaN(billAmount)) {
        billErrorLabel.innerHTML = "can't be zero";
        billInput.classList.add('input-error');
    } else {
        billErrorLabel.innerHTML = "";
        billInput.classList.remove('input-error');
        calculateBill();
    }
};

numberOfPeopleInput.oninput = ({ target }) => {
    peopleCount = parseInt(target.value);
    
};

numberOfPeopleInput.onblur = ({ target }) => {
    peopleCount = parseInt(target.value);
    if (peopleCount === 0 || isNaN(peopleCount)) {
        peopleErrorLabel.innerHTML = "can't be zero";
        peopleErrorLabel.classList.add('input-error');
    } else {
        peopleErrorLabel.innerHTML = "";
        peopleErrorLabel.classList.remove('input-error');
        calculateBill();
    }
};

customTipInput.oninput = ({ target }) => {
    tipPercentage = parseInt(target.value);
};

customTipInput.onblur = ({ target }) => {
    tipPercentage = parseInt(target.value);
    if (tipPercentage === 0) {
        displayTotalAmount.innerHTML = ' 0.00'
        displayTipAmount.innerHTML = ' 0.00'
        return;
    }
    
    calculateBill();
}

resetBtn.onclick = () => {
    reset();
}

const getTipValue = (val, id) => {
    tipPercentage = val;

    Object.values(tipButton).forEach(button => {
        if (button.id === id) {
            button.style.backgroundColor = "hsl(172, 67%, 45%)";
            button.style.border = "dashed";
            button.style.color = "black";
        } else {
            button.style.backgroundColor = "hsl(183, 100%, 15%)";
            button.style.color = "white";
        }
    })
};

const calculateBill = () => {
    if (peopleCount === 0 || isNaN(peopleCount) || isNaN(billAmount) || billAmount === 0) {
        displayTotalAmount.innerHTML = ' 0.00'
        displayTipAmount.innerHTML = ' 0.00'
        return;
    }
    console.log("hi");
    resetBtn.disabled = false;
    let tipAmount = billAmount * (tipPercentage / 100);
    let totalAmount = billAmount + tipAmount;

    let totalAmountPerPerson = totalAmount / peopleCount;
    let tipAmountPerPerson = tipAmount / peopleCount;

    displayTipAmount.innerHTML = tipAmountPerPerson.toFixed(2).toString();
    displayTotalAmount.innerHTML = totalAmountPerPerson.toFixed(2).toString();

}

const reset = () => {
    billAmount = 0;
    peopleCount = 0;
    tipPercentage = 0;

    Object.values(tipButton).forEach(button => {
        button.style.backgroundColor = "hsl(183, 100%, 15%)";
        button.style.color = "white";
        button.style.border = "solid";
    });

    displayTotalAmount.innerHTML = ' 0.00'
    displayTipAmount.innerHTML = ' 0.00'
    
    billInput.value = "";
    customTipInput.value = "";
    numberOfPeopleInput.value = "";
    resetBtn.disabled = false;
}