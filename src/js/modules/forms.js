export default class Form {
  constructor(forms) {
    this.forms = document.querySelectorAll(forms);
    this.message = {
      loading: "Загрузка...",
      success: "Спасибо! Скоро мы с Вами свяжемся",
      failure: "Что-то пошло не так...",
    };
    this.path = "https://just-server-yo3y.onrender.com/api/data";
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
    this.forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        console.log(e);
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
        const data = {};
        formData.forEach((value, key) => (data[key] = value));

        this.postData(this.path, data)
          .then((res) => {
            console.log(res);
            statusMessage.textContent = this.message.success;
          })
          .catch((err) => {
            console.log(err);
            statusMessage.textContent = this.message.failure;
          });
      });
    });
  }
}
