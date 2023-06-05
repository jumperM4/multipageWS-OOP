export default class Download {
  constructor(triggers) {
    this.btns = document.querySelectorAll(triggers);
    this.path = "src/assets/img/text.txt";
  }

  downloadItem(path) {
    const elementLink = document.createElement("a");
    elementLink.setAttribute("href", path);
    elementLink.setAttribute("download", "text-file");

    elementLink.style.display = "none";

    document.body.appendChild(elementLink);
    elementLink.click();
    document.body.removeChild(elementLink);
  }

  init() {
    this.btns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        this.downloadItem(this.path);
      });
    });
  }
}
