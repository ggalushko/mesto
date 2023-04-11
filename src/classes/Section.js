export class Section {
  constructor({ items, rerender }, containerSelector) {
    this._items = items;
    this._containerSelector = containerSelector;
    this._rerender = rerender;
  }

  renderAll() {
    this._items.forEach((item) => this._rerender(item));
  }
  addItem(element) {
    document.querySelector(this._containerSelector).append(element);
  }
}
