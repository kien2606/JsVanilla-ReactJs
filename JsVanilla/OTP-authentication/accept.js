window.localStorage.setItem("otp-code", randomOTPCode());
if (localStorage.getItem("otp-code")) {
  window.alert("Mã OTP của bạn là : " + localStorage.getItem("otp-code"));
}
//require common function
import { randomOTPCode, moveOnMax } from "./common.js";
//khai vao bien
const verifyNow = document.querySelector(".btn-verify");
const wrap = document.querySelectorAll(".otp-code");
const elem = document.querySelector(".timeout-otpcode");
const btnResend = document.querySelector(".resend-otp");
const valueOTP = [];

// otp handle input

wrap.forEach((item) => {
  item.addEventListener("keyup", () => {
    moveOnMax(item, verifyNow);
    valueOTP.push(item.value);
  });
});

// time out otp code
let timeLeft = 30;
let timerId = setInterval(countdown, 1000);
function countdown() {
  if (timeLeft == -1) {
    clearTimeout(timerId);
  } else {
    if (timeLeft !== 0) {
      elem.innerHTML =
        "Mã OTP của bạn có hiệu lực còn lại trong " + timeLeft + " giây";
      timeLeft--;
    } else {
      elem.innerHTML = "Mã OTP đã hết hiệu lực vui lòng nhận lại mã ";
      localStorage.setItem("otp-code", randomOTPCode());
    }
  }
}
// button resend otp code
btnResend.addEventListener("click", () => {
  location.reload();
});

// check otp yes--> redirct / no --> try again
verifyNow.addEventListener("click", () => {
  let otpCode = "";
  if (localStorage.getItem("otp-code")) {
    otpCode = localStorage.getItem("otp-code");
  }
  let otpInput = valueOTP.join("");
  console.log(otpCode, otpInput);
  if (otpInput === otpCode) {
    location.replace("https://www.facebook.com/");
  } else {
    window.alert("Mã OTP không chính xác , thử lại ");
    location.reload();
  }
});
