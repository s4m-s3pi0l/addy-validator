# Solana Wallet Address Validator

A simple, user-friendly tool to validate Solana wallet addresses and check if they are valid base58 strings.

## Live demo

https://streamable.com/biea96

## How to Use

1. Open `index.html` in your web browser
2. Enter a Solana wallet address in the input field
3. Click "Validate Address" to check if the address is valid
4. View the validation result with clear success/error messages
5. Use the "Copy Address" button to copy valid addresses to your clipboard

## Validation Rules

A valid Solana wallet address must:

- Be encoded in base58 format
- Be exactly 44 characters long (32 bytes)
- Contain only valid base58 characters: `123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz`
- Not contain confusing characters: `0`, `O`, `I`, `l`

## Examples

### Valid Addresses
```
9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM
11111111111111111111111111111112
So11111111111111111111111111111111111111112
```

### Invalid Addresses
```
invalid-address          # Contains invalid characters
9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM123  # Too long
9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWM      # Too short
```

## Technical Details

### Base58 Encoding
Solana addresses use base58 encoding, which is similar to base64 but excludes characters that could be confused:
- Excludes: `0` (zero), `O` (capital O), `I` (capital I), `l` (lowercase L)
- Includes: `123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz`

### Address Length
Solana wallet addresses are exactly 32 bytes, which translates to 44 characters when base58 encoded.

## File Structure

```
wallet-checker/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript validation logic
├── package.json        # Project configuration
├── .gitignore          # Git ignore file
└── README.md           # This documentation
```

## Development

To run locally:
1. Clone or download this repository
2. Open `index.html` in a web browser
3. No build process or dependencies required