export function randomOTPCode() {
  let randomNumber = JSON.stringify(Math.floor(Math.random() * 10000));
  while (randomNumber.length < 4) {
    randomNumber = `0${randomNumber}`;
  }
  return randomNumber;
}
export function moveOnMax(field, elementfocus) {
  if (field.value.length >= field.maxLength) {
    return field.nextElementSibling
      ? field.nextElementSibling.focus()
      : elementfocus.focus();
  }
}
