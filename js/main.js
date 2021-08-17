const buttons__wrapper = document.querySelector('.buttons__wrapper');
const removeOneCharacterBtn = document.getElementById("removeOneCharacter");
const removeAllCharactersBtn = document.getElementById("removeAllCharacters");
const calculatorInput = document.getElementById('calculatorInput');
const lastActionsInput = document.getElementById('lastActions');
const actionsRegExp = /[\,\÷\×\-\+\=]/;

const keyPress = (e) => {
    let tagName = e.target.tagName;
    if(tagName != 'BUTTON') return;
    
    let buttonValue = e.target.innerText;
    let prevValue = calculatorInput.value.substring(calculatorInput.value.length - 1);
    let IsActionButtonValue = actionsRegExp.test(buttonValue);

    if(lastActionsInput.value.includes("=")) {
        actionAfterEquals(IsActionButtonValue);
    }

    if(calculatorInput.value.length === 0 && IsActionButtonValue && buttonValue !== '.') {
        return;
    }
    
    if(actionsRegExp.test(prevValue) && IsActionButtonValue && buttonValue !== '.') {
        removeOneCharacter();
    }

    if(prevValue === buttonValue && buttonValue === '.') {
        return;
    }

    calculateResult(buttonValue, IsActionButtonValue);
}

const removeOneCharacter = () => calculatorInput.value = calculatorInput.value.slice(0, -1);
const removeAllCharacters = () => {
    lastActionsInput.value = '';
    calculatorInput.value = '';
}

const actionAfterEquals = (IsActionButtonValue) => {
    if(!IsActionButtonValue) {
        removeAllCharacters();
    } else {
        const temp = calculatorInput.value;
        removeAllCharacters();
        calculatorInput.value = temp;
    }
}

const calculateResult = (buttonValue, IsActionButtonValue) => {
    let resultRegExp = calculatorInput.value.match(actionsRegExp);

    if(resultRegExp !== null && IsActionButtonValue) {
        let action = resultRegExp[0];
        let operands = calculatorInput.value.split(action);
        let [operandOne, operandTwo] = operands;


        if(operandOne && operandTwo) {
            lastActionsInput.value = `${operandOne} ${action} ${operandTwo}`;
            buttonActions(action, operandOne, operandTwo);
        }

        if(buttonValue === '=') {
            lastActionsInput.value += ` ${buttonValue}`;
        }

        if(buttonValue !== '=') {
            calculatorInput.value += buttonValue;
        }
    } else {
        if(buttonValue === '=') return;
        calculatorInput.value += buttonValue;
    }
}
const buttonActions = (action, operandOne, operandTwo) => {
    switch(action) {
        case '÷':
            if(+operandTwo === 0) {
                calculatorInput.value = "Деление на ноль невозможно";
                break;
            }
            calculatorInput.value = +operandOne / +operandTwo;
            break;
        case '+':
            calculatorInput.value = +operandOne + +operandTwo;
            break;
        case '×':
            calculatorInput.value = +operandOne * +operandTwo;
            break;
        case '-':
            calculatorInput.value = +operandOne - +operandTwo;
            break;
    }
}

buttons__wrapper.addEventListener('click', keyPress);
removeOneCharacterBtn.addEventListener('click', removeOneCharacter);
removeAllCharactersBtn.addEventListener('click', removeAllCharacters);