export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll("input");
    this.message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро мы с Вами свяжемся",
      failure: "Что-то пошло не так...",
    };
    this.path = "https://just-server-yo3y.onrender.com/api/data";
  }

  clearInputs() {
    this.inputs.forEach((input) => {
      input.value = "";
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');
    mailInputs.forEach((mailInput) => {
      mailInput.addEventListener("keypress", (event) => {
        const onlyLatin = /[^a-z 0-9 @ \.]/gi;
        if (event.key.match(onlyLatin)) {
          event.preventDefault();
        }
      });
    });
  }

  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    };

    const createMask = (event) => {
      const input = event.target;
      const matrix = "+1 (___) ___-____";
      let i = 0;
      let def = matrix.replace(/\D/g, "");
      let value = input.value.replace(/\D/g, "");

      if (def.length >= value.length) {
        value = def;
      }
      input.value = matrix.replace(/./g, (s) => {
        return /[_\d]/.test(s) && i < value.length
          ? value.charAt(i++)
          : i >= value.length
          ? ""
          : s;
      });
      if (event.type === "blur") {
        if (input.value.length === 2) {
          input.value = "";
        } else {
          setCursorPosition(input.value.length, this);
        }
      }
    };

    try {
      const input = document.getElementById("phone");
      input.addEventListener("input", createMask);
      input.addEventListener("focus", createMask);
      input.addEventListener("blur", createMask);
    } catch (e) {}
  }

  async postData(url, data) {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res;
  }

  init() {
    this.initMask();
    this.checkMailInputs();
    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        let statusMessage = document.createElement("div");
        statusMessage.style.css = `
            margin-top = '15px';
            font-size = '18px';
            color = grey;
          `;
        form.parentNode.appendChild(statusMessage);

        statusMessage.textContent = this.message.loading;

        const formData = new FormData(form);
        console.log(formData);
        const data = {};
        formData.forEach((value, key) => (data[key] = value));
        console.log(data);

        this.postData(this.path, data)
          .then((res) => {
            console.log(res);
            statusMessage.textContent = this.message.success;
          })
          .catch((err) => {
            console.log(err);
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 6000);
          });
      });
    });
  }
}
