const formPhone = document.querySelector(".phone-number");
const acceptPhoneNumber = document.querySelector(".submit-phone");
const submitPhone = document.querySelector(".submit-phone");
// xu ly ban phim
// function keyactive(form) {
//   const key = document.querySelectorAll(".number");
//   key.forEach((number, index) => {
//     number.addEventListener("click", () => {
//       let { value } = form;
//       value += number.innerText;
//       form.value = value;
//     });
//   });
// }
// if (formPhone) {
//   keyactive(formPhone);
// }
//validation phone number

function validation(phone) {
  const regrex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  return regrex.test(String(phone));
}

// handle if validation phone is true
formPhone.addEventListener("keyup", () => {
  if (formPhone.value.length === formPhone.maxLength) submitPhone.focus();
});

if (acceptPhoneNumber) {
  acceptPhoneNumber.addEventListener("click", (e) => {
    const phoneNumber = formPhone.value;
    if (validation(phoneNumber)) {
      window, localStorage.setItem("phone-number", JSON.stringify(phoneNumber));
      location.replace("accept-phonenumber.html");
      submitPhone.focus();
    } else {
      window.alert("Vui lòng nhập đúng số điện thoại ");
    }
  });
}
