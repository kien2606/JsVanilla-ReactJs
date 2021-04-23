function Validation(options) {
  // validate handle funtion
  function validate(inputElement, rule) {
    let valueInput = inputElement.value;
    let errorMessage = rule.check(valueInput);
    let errorElement = inputElement.nextElementSibling;
    if (errorMessage) {
      errorElement.innerHTML = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerHTML = "";
      inputElement.parentElement.classList.remove("invalid");
    }
  }
  //ham xu ly neu nguoi dung bat dau input
  function inputToForm(inputElement) {
    let errorElement = inputElement.nextElementSibling;
    errorElement.innerHTML = "";
    inputElement.parentElement.classList.remove("invalid");
  }
  // take value form wanna validate
  let formElement = document.querySelector(options.form);
  if (formElement) {
    formElement.onsubmit = (e) => {
      e.preventDefault();
      let error = [];
      let value = {};
      options.rules.forEach((rule) => {
        let inputElement = document.querySelector(rule.selector);
        let valueInput = inputElement.value;
        let errorMessage = rule.check(valueInput);
        if (errorMessage) {
          error.push(errorMessage);
        }
        validate(inputElement, rule);
      });
      if (error.length === 0) {
        options.rules.forEach((rule) => {
            let inputElement = document.querySelector(rule.selector);
            let valueInput = inputElement.value;
            value[rule.selector] = valueInput;
          });
        options.onSubmit(value);
        // formElement.submit();
      }
    };
    options.rules.forEach((rule) => {
      let inputElement = document.querySelector(rule.selector);
      if (inputElement) {
        // neu blur khoi input
        inputElement.onblur = () => {
          validate(inputElement, rule);
        };
        // neu user bat dau nhap value
        inputElement.oninput = () => {
          inputToForm(inputElement);
        };
      }
    });
  }
}

Validation.isRequired = (selector) => {
  return {
    selector,
    check: (value) => {
      return value.trim() ? undefined : "Trường này là bắt buộc";
    },
  };
};

Validation.isEmail = (selector) => {
  return {
    selector,
    check: (value) => {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(value)
        ? undefined
        : "Vui lòng nhập đúng định dạng email";
    },
  };
};

Validation.isMinLength = (selector, min) => {
  return {
    selector,
    check: (value) => {
      return value.length >= min
        ? undefined
        : `Vui lòng nhập tối thiểu ${min} kí tự`;
    },
  };
};

Validation.isMatchPassWord = (selector, valueCheck, messageError) => {
  return {
    selector,
    check: (value) => {
      let password = document.querySelector(valueCheck).value;
      if (value === "") {
        return "Trường này là bắt buộc";
      }
      return value === password ? undefined : messageError;
    },
  };
};
