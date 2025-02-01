function clearDisplay() {
    document.getElementById('display').value = '';
}

function appendToDisplay(value) {
    const display = document.getElementById('display');
    const currentValue = display.value;
    
    // Prevent multiple decimal points in a single number
    if (value === '.') {
        const numbers = currentValue.split(/[-+*/]/).pop();
        if (numbers.includes('.')) return;
    }
    
    // Prevent invalid operator sequences
    const lastChar = currentValue.slice(-1);
    if ('+-*/'.includes(value) && '+-*/'.includes(lastChar)) {
        return;
    }
    
    display.value += value;
}

function calculateResult() {
    const display = document.getElementById('display');
    let expression = display.value;
    
    if (!expression) return;

    // Replace visual symbols with JavaScript operators
    expression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/');

    try {
        // Use Function constructor for safer evaluation
        const result = new Function('return ' + expression)();
        
        // Handle division by zero
        if (!isFinite(result)) {
            throw new Error('Infinity');
        }
        
        display.value = result % 1 === 0 ? result : result.toFixed(4);
        
        // Auto-clear after 3 seconds for successful calculations
        setTimeout(() => {
            if (display.value === result.toString()) {
                clearDisplay();
            }
        }, 3000);
        
    } catch (error) {
        display.value = 'Error';
        // Auto-clear error after 1.5 seconds
        setTimeout(clearDisplay, 1500);
    }
}
