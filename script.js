// Base58 alphabet for Solana addresses
const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

// DOM elements
const addressInput = document.getElementById('address-input');
const clearBtn = document.getElementById('clear-btn');
const validateBtn = document.getElementById('validate-btn');
const copyBtn = document.getElementById('copy-btn');
const validationResult = document.getElementById('validation-result');
const resultIcon = document.getElementById('result-icon');
const resultText = document.getElementById('result-text');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    updateUI();
    handleTestAddress();
});

// Handle test address from URL parameters
function handleTestAddress() {
    const urlParams = new URLSearchParams(window.location.search);
    const testAddress = urlParams.get('test');
    if (testAddress) {
        addressInput.value = testAddress;
        updateUI();
        validateAddress();
    }
}

// Set up event listeners
function setupEventListeners() {
    // Input field events
    addressInput.addEventListener('input', handleInputChange);
    addressInput.addEventListener('keypress', handleKeyPress);
    
    // Button events
    clearBtn.addEventListener('click', clearInput);
    validateBtn.addEventListener('click', validateAddress);
    copyBtn.addEventListener('click', copyToClipboard);
}

// Handle input changes
function handleInputChange() {
    updateUI();
    
    // Reset validation result when user types
    if (validationResult.className !== 'validation-result') {
        resetValidationResult();
    }
}

// Handle key press events
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        validateAddress();
    }
}

// Update UI based on current state
function updateUI() {
    const hasInput = addressInput.value.trim().length > 0;
    
    // Show/hide clear button
    clearBtn.classList.toggle('visible', hasInput);
    
    // Enable/disable validate button
    validateBtn.disabled = !hasInput;
}

// Clear input field
function clearInput() {
    addressInput.value = '';
    addressInput.focus();
    updateUI();
    resetValidationResult();
}

// Reset validation result to initial state
function resetValidationResult() {
    validationResult.className = 'validation-result';
    resultIcon.textContent = '→';
    resultText.textContent = 'Click "Validate Address" to check if the address is valid';
    copyBtn.disabled = true;
}

// Validate Solana address
function validateAddress() {
    const address = addressInput.value.trim();
    
    if (!address) {
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Simulate async validation (for better UX)
    setTimeout(() => {
        const validation = performValidation(address);
        displayValidationResult(validation);
    }, 200);
}

// Show loading state
function showLoadingState() {
    validationResult.className = 'validation-result pending';
    resultIcon.innerHTML = '<div class="loading"></div>';
    resultText.textContent = 'Validating address...';
    copyBtn.disabled = true;
}

// Perform the actual validation
function performValidation(address) {
    const result = {
        isValid: false,
        errors: [],
        warnings: []
    };
    
    // Check if address is empty
    if (!address) {
        result.errors.push('Address cannot be empty');
        return result;
    }
    
    // Check base58 validity
    if (!isValidBase58(address)) {
        result.errors.push('Address contains invalid base58 characters');
        return result;
    }
    
    // Check length (should be 32 bytes = 44 characters in base58)
    if (address.length !== 44) {
        result.errors.push(`Address length is ${address.length} characters, expected 44 characters`);
        return result;
    }
    
    // Check for invalid characters (0, O, I, l)
    const invalidChars = address.match(/[0OIl]/g);
    if (invalidChars) {
        result.warnings.push(`Address contains potentially confusing characters: ${invalidChars.join(', ')}`);
    }
    
    // If we get here, the address is valid
    result.isValid = true;
    
    return result;
}

// Check if string is valid base58
function isValidBase58(str) {
    // Check if string contains only base58 characters
    for (let i = 0; i < str.length; i++) {
        if (BASE58_ALPHABET.indexOf(str[i]) === -1) {
            return false;
        }
    }
    return true;
}

// Display validation result
function displayValidationResult(validation) {
    if (validation.isValid) {
        validationResult.className = 'validation-result valid';
        resultIcon.textContent = '✓';
        resultText.textContent = 'Valid Solana address';
        copyBtn.disabled = false;
        
        // Show warnings if any
        if (validation.warnings.length > 0) {
            resultText.textContent += ` (${validation.warnings.join(', ')})`;
        }
    } else {
        validationResult.className = 'validation-result invalid';
        resultIcon.textContent = '✗';
        resultText.textContent = validation.errors.join(', ');
        copyBtn.disabled = true;
    }
}

// Copy address to clipboard
async function copyToClipboard() {
    const address = addressInput.value.trim();
    
    if (!address) {
        return;
    }
    
    try {
        await navigator.clipboard.writeText(address);
        
        // Show success feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied';
        copyBtn.style.background = '#1e7e34';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 1500);
        
    } catch (err) {
        console.error('Failed to copy address: ', err);
        
        // Fallback for older browsers
        fallbackCopyToClipboard(address);
    }
}

// Fallback copy method for older browsers
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
        
        // Show success feedback
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied';
        copyBtn.style.background = '#1e7e34';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
        }, 1500);
        
    } catch (err) {
        console.error('Fallback copy failed: ', err);
        alert('Failed to copy address. Please copy manually.');
    } finally {
        document.body.removeChild(textArea);
    }
}

// Utility function to generate a sample valid address for testing
function generateSampleAddress() {
    // This is just for demonstration - in real use, addresses come from wallet generation
    const sampleAddresses = [
        '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
        '11111111111111111111111111111112',
        'So11111111111111111111111111111111111111112'
    ];
    
    return sampleAddresses[Math.floor(Math.random() * sampleAddresses.length)];
}

// Add some example addresses for testing (uncomment to enable)
// Uncomment the following lines to add example buttons for testing
/*
function addExampleButtons() {
    const exampleContainer = document.createElement('div');
    exampleContainer.className = 'example-buttons';
    exampleContainer.innerHTML = `
        <h4>Test with examples:</h4>
        <button onclick="testAddress('9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM')">Valid Address</button>
        <button onclick="testAddress('invalid-address')">Invalid Address</button>
        <button onclick="testAddress('11111111111111111111111111111112')">System Program</button>
    `;
    
    document.querySelector('.validator-section').appendChild(exampleContainer);
}

function testAddress(address) {
    addressInput.value = address;
    updateUI();
    validateAddress();
}

// Uncomment to add example buttons
// addExampleButtons();
*/
