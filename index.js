const operations = '+-/*';
const digits = '1234567890';
const numberButtons = document.querySelectorAll('.number_button');

const display_active = document.querySelector(".display_active");
display_active.textContent = '0';

const display_history = document.querySelector(".display_history");

function isValid(str) {
    return /^[-+*/0-9.]+$/.test(str);
}

function isValidNumber(str) {
    if (str === '') return true;
    
    const parts = str.split('.');
    return parts.length <= 2 && /^\d*\.?\d*$/.test(str);
}

function clearDisplay() {
    display_active.textContent = '0';
    display_history.textContent = '';
}

function addNumber(number) {
    if (display_active.textContent === '0' || !isValid(display_active.textContent)) {
        display_active.textContent = '';
    }
    
    const newContent = display_active.textContent + number;
    if (isValidNumber(newContent)) {
        display_active.textContent = newContent;
    }
}

function applyOperation(operation) {
    if (display_active.textContent === '') {
        display_history.textContent = display_history.textContent.slice(0, -1) + operation;
        return;
    }
    
    if (!isValid(display_active.textContent) || !isValidNumber(display_active.textContent)) {
        clearDisplay();
        return;
    }
    
    if (display_active.textContent[display_active.textContent.length - 1] === '.') {
        display_active.textContent = display_active.textContent.slice(0, -1);
    }

    if (display_active.textContent !== '' && isValidNumber(display_active.textContent)) {
        display_history.textContent += display_active.textContent + ' ' + operation + ' ';
        display_active.textContent = '';
    }
}

function calculate() {
    try {
        if (display_active.textContent === '' && display_history.textContent === '') {
            return;
        }
        
        let expression = display_history.textContent + display_active.textContent;
        
        if (expression.trim() === '') {
            return;
        }
        
        const expressionParts = expression.split(/[\+\-\*\/]/);
        for (let part of expressionParts) {
            const trimmedPart = part.trim();
            if (trimmedPart !== '' && !isValidNumber(trimmedPart)) {
                throw new Error('Invalid number format');
            }
        }
        
        const result = Function('"use strict"; return (' + expression + ')')();
        
        if (!isFinite(result)) {
            throw new Error('Invalid calculation');
        }
        
        display_active.textContent = parseFloat(result.toFixed(10));
        display_history.textContent = '';
        
    } catch (error) {
        display_active.textContent = 'Error';
        setTimeout(() => clearDisplay(), 1500);
    }
}

function addDot() {
    if (!isValid(display_active.textContent)) {
        display_active.textContent = '0.';
        return;
    }
    
    if (!display_active.textContent.includes('.')) {
        display_active.textContent += '.';
    }
}

function back() {
    if (!isValid(display_active.textContent) || !isValidNumber(display_active.textContent)) {
        clearDisplay();
        return;
    }
    
    if (display_active.textContent.length === 1) {
        display_active.textContent = '0';
    } else {
        display_active.textContent = display_active.textContent.slice(0, -1);
    }
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    
    if (digits.includes(key)) {
        addNumber(parseInt(key));
    } else if (operations.includes(key)) {
        applyOperation(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    } else if (key === 'Backspace') {
        back();
    } else if (key === '.') {
        addDot();
    }
});

function showWarning(message) {
    const warning = document.createElement('div');
    warning.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e74c3c;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        transition: opacity 0.3s;
    `;
    warning.textContent = message;
    document.body.appendChild(warning);
    
    setTimeout(() => {
        warning.style.opacity = '0';
        setTimeout(() => warning.remove(), 300);
    }, 2000);
}