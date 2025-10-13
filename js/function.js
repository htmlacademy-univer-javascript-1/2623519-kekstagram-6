// 1task
function checkStringLength(text, maxLength) {
    return text.length <= maxLength;
}

//2task
function isPalindromeSimple(word) {
    let reversed = word.split('').reverse().join('');
    return word === reversed;
}
