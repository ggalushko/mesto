import { Popup } from "./Popup";

export class PopupWithForm extends Popup {
    constructor(popupSelector, submitCallback) {
        super(popupSelector)
        this._submitCallback = submitCallback
    }
    _getInputValues() {

    }
    setEventListeners(){
        super()
        this._submitCallback
    }
    close(){
        document.querySelector(popupSelector).querySelector("form").reset()
    }
}