export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderAll() {
    this._items.forEach((item) => this.addItem(this._renderer(item)));
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
