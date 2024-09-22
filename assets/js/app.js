$(document).ready(() => {
    class NumberConverter {
        constructor(mapping) {
            this.mapping = mapping;
        }

        convert(input) {
            let convertedNumber = '';
            for (let i = 0; i < input.length; i++) {
                convertedNumber += this.mapping[input[i]] || input[i];
            }
            return convertedNumber;
        }
    }

    class RomanToEnglishConverter {
        constructor() {
            this.mapping = {
                'I': 1,
                'V': 5,
                'X': 10,
                'L': 50,
                'C': 100,
                'D': 500,
                'M': 1000
            };
        }

        convert(input) {
            let total = 0;
            let prevValue = 0;

            for (let i = input.length - 1; i >= 0; i--) {
                const currentValue = this.mapping[input[i].toUpperCase()];

                if (!currentValue) {
                    return 'Invalid Roman Number';
                }

                if (currentValue < prevValue) {
                    total -= currentValue;
                } else {
                    total += currentValue;
                }

                prevValue = currentValue;
            }

            return total.toString();
        }
    }

    class EnglishToRomanConverter extends NumberConverter {
        constructor() {
            super({
                '1': 'I',
                '5': 'V',
                '10': 'X',
                '50': 'L',
                '100': 'C',
                '500': 'D',
                '1000': 'M'
            });
        }
        convert(input) {
            const romanNumerals = [
                { value: 1000, symbol: 'M' },
                { value: 900, symbol: 'CM' },
                { value: 500, symbol: 'D' },
                { value: 400, symbol: 'CD' },
                { value: 100, symbol: 'C' },
                { value: 90, symbol: 'XC' },
                { value: 50, symbol: 'L' },
                { value: 40, symbol: 'XL' },
                { value: 10, symbol: 'X' },
                { value: 9, symbol: 'IX' },
                { value: 5, symbol: 'V' },
                { value: 4, symbol: 'IV' },
                { value: 1, symbol: 'I' }
            ];

            let number = Number.parseInt(input);
            let result = '';

            for (let i = 0; i < romanNumerals.length; i++) {
                while (number >= romanNumerals[i].value) {
                    result += romanNumerals[i].symbol;
                    number -= romanNumerals[i].value;
                }
            }

            return result;
        }
    }

    const ConverterFactory = {
        getConverter(type) {
            if (type === 'to-roman') {
                return new EnglishToRomanConverter();
            } 
            if (type === 'to-english') {
                return new RomanToEnglishConverter();
            }
            throw new Error('Unknown converter type');
        }
    };

    function isValidInput(input, type) {
        const validRomanChars = /^[IVXLCDM]+$/i;
        const validEnglishChars = /^[0-9]+$/;

        if (type === 'to-roman') {
            return validEnglishChars.test(input);
        } 
        if (type === 'to-english') {
            return validRomanChars.test(input);
        }

        return false;
    }

    function handleConversion(type) {
        const input = $('#input-number').val();
        if (!isValidInput(input, type)) {
            $('#output').text('Error: Invalid characters. Only English numbers or Roman numerals are allowed.').addClass('alert-danger').removeClass('alert-info');
            return;
        }

        const converter = ConverterFactory.getConverter(type);
        const convertedNumber = converter.convert(input);
        const resultText = type === 'to-roman' ? `Roman Number: ${convertedNumber}` : `English Number: ${convertedNumber}`;
        $('#output').text(resultText).addClass('alert-info').removeClass('alert-danger');
    }

    $('#to-roman').click(() => handleConversion('to-roman'));
    $('#to-english').click(() => handleConversion('to-english'));
});
