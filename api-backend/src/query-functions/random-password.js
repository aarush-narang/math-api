const e = require("express")

class Password {
    constructor(uppercase, lowercase, numbers, symbols, includeCharacters, excludeCharacters, length) {
        if (!uppercase && !lowercase && !numbers && !symbols) throw new Error('Password options must have at least one option set to "true"')
        if (typeof (uppercase) !== 'boolean' || typeof (lowercase) !== 'boolean' || typeof (numbers) !== 'boolean' || typeof (symbols) !== 'boolean' || typeof (includeCharacters) !== 'string' || typeof (excludeCharacters) !== 'string' || typeof (length) !== 'number')
            throw new Error('Password options must be of type "boolean" for options, a "string" for custom characters, and "int" for length.')
        if (length > 100) throw new Error('Password length must be less than 100.')
        if (includeCharacters.length > 30) throw new Error('Number of included characters must be less than 30.')
        if (excludeCharacters.length > 20) throw new Error('Number of excluded characters must be less than 20.')
        this.uppercase = uppercase
        this.lowercase = lowercase
        this.numbers = numbers
        this.symbols = symbols
        this.includeCharacters = includeCharacters
        this.excludeCharacters = excludeCharacters
        this.length = length
    }
    generateCharacterSet() { // generates the character set for the password
        let characterSet = ''
        const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
        const numbers = '1234567890'
        const symbols = '`~!@#$%^&*()_+-=[]{}\\|:;\'",<.>/?'

        if (this.uppercase) characterSet += uppercaseLetters
        if (this.lowercase) characterSet += lowercaseLetters
        if (this.numbers) characterSet += numbers
        if (this.symbols) characterSet += symbols
        if (this.includeCharacters.length > 0) { // checks for repeats in the included characters and the character set
            const includeCharsArray = [...new Set(this.includeCharacters.split(''))] // removes all repeated characters in the included characters
            for (let i = 0; i < this.includeCharacters.length; i++) { // if it finds a repeat, delete it
                if (characterSet.includes(includeCharsArray[i])) {
                    includeCharsArray.splice(i, 1)
                }
            }
            this.includeCharacters = includeCharsArray.join('')
            characterSet += this.includeCharacters // add the remaining characters (if any) to the set
        }
        if (this.excludeCharacters.length > 0) { // checks for exclude characters in the character set and removes them
            const excludeCharsArray = this.excludeCharacters.split('')
            for (let j = 0; j < this.excludeCharacters.length; j++) {
                characterSet = characterSet.replace(excludeCharsArray[j], '') // remove the excluded characters from the set
            }
        }
        if (characterSet.length < 12) throw new Error('Not enough characters allowed to create a strong password')

        return characterSet
    }
    evaluateStrength(pwd) {
        if (pwd.length > 25) return 'VERY_STRONG'
        let test = ''
        const upCaseCount = (pwd.match(new RegExp('[A-Z]', 'g')) || []).length
        const lowCaseCount = (pwd.match(new RegExp('[a-z]', 'g')) || []).length
        const numCount = (pwd.match(new RegExp('[0-9]', 'g')) || []).length
        const symbCount = (pwd.match(new RegExp('[!@#\$%\^&\*\(\)]', 'g')) || []).length
        //very scuffed way to calculate password strength (doesnt work too well)
        const strength = Math.abs((Math.log(10 / (upCaseCount === 0 ? 1 : upCaseCount)) + Math.log(10 / (lowCaseCount === 0 ? 1 : lowCaseCount)) + Math.log(10 / (numCount === 0 ? 1 : numCount)) + Math.log(10 / (symbCount === 0 ? 1 : symbCount))) * pwd.length)
        if (strength >= 80) return 'VERY_STRONG'
        else if (strength >= 70) return 'STRONG'
        else if (strength >= 60) return 'MEDIUM'
        else return 'WEAK'

    }
    generatePassword() {
        const characterSet = this.generateCharacterSet()
        let password = ''
        while (password.length < this.length) {
            password += characterSet.substr(((Math.random() * (characterSet.length - 1)) + 1), 1) // get a random character from the set and add it to the password string
        }
        const strength = this.evaluateStrength(password)
        return {
            password,
            strength
        }
    }
}


module.exports = {
    Password
}