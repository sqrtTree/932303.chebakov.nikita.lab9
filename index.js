const operations = '+-/*';
const digits = '1234567890';
var numberButtons = document.querySelectorAll('.number_button');

var display_active = document.querySelector(".display_active");
display_active.textContent = '0';

var display_history = document.querySelector(".display_history");

function isValid(str) {
    return /^[-+*/0-9.]+$/.test(str);
}

function clearDisplay()
{
    display_active.textContent = '0';
    display_history.textContent = '';
}


function addNumber(number)
{
    if(display_active.textContent == '0' || !(isValid(display_active.textContent))) display_active.textContent = ''

    display_active.textContent += number;
}

function applyOperation(operation)
 {
    if(display_active.textContent == '')
    {
        display_history.textContent = display_history.textContent.slice(0, -1) + operation;
        return;
    }
    if(!isValid(display_active.textContent))
    {
        clearDisplay();
        return;
    }
    if(display_active.textContent[display_active.textContent.length - 1] == '.') display_active.textContent = display_active.textContent.slice(0, -1);

    display_history.textContent += display_active.textContent + ' ' + operation;
    display_active.textContent = '';

}

function calculate()
{
    display_active.textContent = eval(display_history.textContent + display_active.textContent);
    display_history.textContent = '';
}

function addDot()
{
    if(isValid(display_active.textContent) && display_active.textContent[display_active.textContent.length - 1] != '.')
        display_active.textContent += '.';
}

function back()
{
    if(!isValid(display_active.textContent) )
    {
        clearDisplay();
        return;
    }
    if(display_active.textContent.length == 1) display_active.textContent = '0';
    else display_active.textContent = display_active.textContent.slice(0, -1);
}
