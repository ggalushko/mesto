export class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderAll(items) {
    items.reverse().forEach((item) => this.addItem(this._renderer(item)));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
