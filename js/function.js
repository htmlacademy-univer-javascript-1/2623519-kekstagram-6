// 1task
// eslint-disable-next-line no-unused-vars
function checkStringLength(text, maxLength) {
  return text.length <= maxLength;
}

//2task
// eslint-disable-next-line no-unused-vars
function isPalindromeSimple(word) {
  const reversed = word.split('').reverse().join('');
  return word === reversed;
}
// eslint-disable-next-line no-unused-vars
function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, meetingDuration) {
  // Функция для преобразования времени в минуты
  const timeToMinutes = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  // Преобразуем все времена в минуты
  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  // Проверяем, что встреча полностью в пределах рабочего дня
  return meetingStartMinutes >= workStartMinutes && meetingEndMinutes <= workEndMinutes;
}
