const buttons = document.querySelectorAll('.btnSelectTip');
const valueCustom = document.getElementById('valueCustom');
const billNumber = document.getElementById('billNumber');
const numberPeopleInput = document.getElementById('numberPeople');
const tipAmount = document.getElementById('tipAmount');
const totalPerPersonDiv = document.getElementById('totalPerPerson');
const resetBtn = document.getElementById('resetBtn');

/* Mensagens de erro */
const messageError = document.querySelector('.messageError');
const billError = document.querySelector('.billError');


/* Estado botões */
buttons.forEach(button => {
    button.addEventListener('click', () => {
        setActivated(button);
        valueCustom.value = "";
        valueCustom.classList.remove('inputError');
        activateResetBtn();
    });
});

function setActivated(buttonActive) {
    buttons.forEach(button => {
        button.classList.remove('buttonActive');
    });
    buttonActive.classList.add('buttonActive');
}

/* Ao focar no custom, desativa botões */
valueCustom.addEventListener('focus', () => {
    buttons.forEach(btn => btn.classList.remove('buttonActive'));
});


/* Validação Number of People */
numberPeopleInput.addEventListener('input', () => {
    const value = Number(numberPeopleInput.value);

    if (value === 0 || numberPeopleInput.value === "") {
        numberPeopleInput.classList.add('inputError');
        messageError.textContent = "Can't be zero";
    } else {
        numberPeopleInput.classList.remove('inputError');
        messageError.textContent = "";
    }

    calculate();
    activateResetBtn();
});


/* Validação Bill */
billNumber.addEventListener('input', () => {
    const value = Number(billNumber.value);

    if (value <= 0 || billNumber.value === "") {
        billNumber.classList.add('inputError');
        billError.textContent = "Invalid bill";
    } else {
        billNumber.classList.remove('inputError');
        billError.textContent = "";
    }

    calculate();
    activateResetBtn();
});


/* Validação Custom Tip */
valueCustom.addEventListener('input', () => {
    let value = Number(valueCustom.value);

    // desativa botões ao digitar
    buttons.forEach(btn => btn.classList.remove('buttonActive'));

    // limita o valor máximo
    if (value > 100) {
        valueCustom.value = 100;
        value = 100;
    }

    // limita o valor mínimo
    if (value < 0) {
        valueCustom.value = 0;
        value = 0;
    }

    // estilização de erro (opcional)
    if (value < 0 || value > 100) {
        valueCustom.classList.add('inputError');
    } else {
        valueCustom.classList.remove('inputError');
    }

    calculate();
    activateResetBtn();
});


/* Botão reset */
resetBtn.addEventListener('click', ()=>{
 resetAll();
})

function resetAll() {
    // 1. Zerar inputs
    billNumber.value = "";
    numberPeopleInput.value = "";
    valueCustom.value = "";

    // 2. Remover classes de erro
    billNumber.classList.remove('inputError');
    numberPeopleInput.classList.remove('inputError');
    valueCustom.classList.remove('inputError');

    billError.textContent = "";
    messageError.textContent = "";

    // 3. Desativar botões de tip
    buttons.forEach(btn => btn.classList.remove('buttonActive'));

    // 4. Resetar valores da direita
    tipAmount.textContent = "$0.00";
    totalPerPersonDiv.textContent = "$0.00";

    // 5. Cor botão
    resetBtn.classList.add('btnResetEmpty')
}

function activateResetBtn() {
    resetBtn.classList.remove('btnResetEmpty');
}


/*Função Calculate */

function calculate() {
    const billValue = Number(billNumber.value);
    const peopleValue = Number(numberPeopleInput.value);

    let tipPercentage;

    const activeButton = document.querySelector('.buttonActive');

    if (activeButton) {
        tipPercentage = Number(activeButton.id);
    } else if (valueCustom.value !== "") {
        tipPercentage = Number(valueCustom.value);
    }

    // Validação final
    if (billValue <= 0 || peopleValue <= 0 || tipPercentage === undefined) {
        tipAmount.textContent = "$0.00";
        totalPerPersonDiv.textContent = "$0.00";
        return;
    }

    const tipTotal = billValue * (tipPercentage / 100);
    const tipPerPerson = tipTotal / peopleValue;
    const totalPerPerson = (billValue / peopleValue) + tipPerPerson;

    tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalPerPersonDiv.textContent = `$${totalPerPerson.toFixed(2)}`;
}

