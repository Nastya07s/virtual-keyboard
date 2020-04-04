class Keyboard {

  constructor() {

    this.elements = {
      main: null,
      textarea: null,
      keyboard: null,
      keysCountainer: null,
      keys: [],
    };

    this.properties = {
      valueInput: '',
      capsLock: false,
      language: 'ru',
    };

    this.init();
  }

  init() {
    this.elements.main = document.createElement('div');
    this.elements.textarea = document.createElement('textarea');
    this.elements.keyboard = document.createElement('div');
    this.elements.keysCountainer = document.createElement('div');

    this.elements.main.classList.add('main');
    this.elements.keyboard.setAttribute('id', 'keyboard');
    this.elements.keysCountainer.classList.add('keyboard-buttons');

    this.elements.keysCountainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysCountainer.querySelectorAll('.keyboard-key');

    this.elements.keyboard.appendChild(this.elements.keysCountainer);
    this.elements.main.appendChild(this.elements.textarea);
    this.elements.main.appendChild(this.elements.keyboard);

    document.body.appendChild(this.elements.main);

    window.addEventListener('keydown', event => {
      console.log(event);
      let key = event.key;
      // if (event.key !== 'CapsLock')
      console.log(key);
      console.log(this.elements.keys);
      Array.from(this.elements.keys)
        .filter(el => el.textContent === key || el.textContent.length === 0 && key === ' ' || el.textContent === 'Ctrl' && key === 'Control' || el.textContent === 'Win' && key === 'Meta')
        .forEach(el => this._togglePress(el, true));
      switch (key) {
        case 'Backspace':
          this.elements.textarea.focus();
          event.preventDefault();
          if (this.elements.textarea.selectionStart !== 0) {
            if (this.elements.textarea.selectionEnd === this.elements.textarea.selectionStart) {
              this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart - 1) + this.properties.valueInput.substring(this.elements.textarea.selectionStart, this.properties.valueInput.length);
              this._oninput(key, this.elements.textarea.selectionStart - 1);
            } else {
              this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + this.properties.valueInput.substring(this.elements.textarea.selectionEnd, this.properties.valueInput.length);
              this._oninput(key, this.elements.textarea.selectionStart);
            }
          } else
            this._oninput(key, this.elements.textarea.selectionStart);

          break;

        case 'Delete':
          this.elements.textarea.focus();
          event.preventDefault();
          if (this.elements.textarea.selectionEnd === this.elements.textarea.selectionStart)
            this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + this.properties.valueInput.substring(this.elements.textarea.selectionStart + 1, this.properties.valueInput.length);
          else
            this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + this.properties.valueInput.substring(this.elements.textarea.selectionEnd, this.properties.valueInput.length);
          this._oninput(key, this.elements.textarea.selectionStart);

          break;

        case "Tab":
          this.elements.textarea.focus();
          event.preventDefault();
          this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + '\t' + this.properties.valueInput.substring(this.elements.textarea.selectionStart, this.properties.valueInput.length);
          this._oninput(key, ++this.elements.textarea.selectionStart);
          break;

        case "CapsLock":
          this._toggleCapsLock();
          Array.from(this.elements.keys).find(el => el.textContent === event.key).classList.toggle('keyboard-key-pressed', this.properties.capsLock);
          break;

        case "Enter":
          this.elements.textarea.focus();
          event.preventDefault();
          this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + '\n' + this.properties.valueInput.substring(this.elements.textarea.selectionStart, this.properties.valueInput.length);
          this._oninput(key, ++this.elements.textarea.selectionStart);

          break;

        case " ":
          this.elements.textarea.focus();
          event.preventDefault();
          this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + ' ' + this.properties.valueInput.substring(this.elements.textarea.selectionStart, this.properties.valueInput.length);
          this._oninput(key, ++this.elements.textarea.selectionStart);

          break;

        case "Shift":
          break;

        case "Home":
          this.elements.textarea.focus();
          event.preventDefault();
          this._oninput(key, 0);
          break;

        case "End":
          this.elements.textarea.focus();
          event.preventDefault();
          this._oninput(key, this.properties.valueInput.length);
          break;

        case "Control":
          break;

        case "Meta":
          // event.preventDefault();
          break;

        case "Alt":
          break;


        default:
          this.elements.textarea.focus();
          event.preventDefault();
          let keySymbol = this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
          this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + keySymbol + this.properties.valueInput.substring(this.elements.textarea.selectionStart, this.properties.valueInput.length);
          this._oninput(key, ++this.elements.textarea.selectionStart);

          break;
      }
    });

    window.addEventListener('keyup', event => {
      console.log(event);
      if (event.key !== 'CapsLock')
        Array.from(this.elements.keys)
        .filter(el => el.textContent === event.key || el.textContent.length === 0 && event.key === ' ' || el.textContent === 'Ctrl' && event.key === 'Control' || el.textContent === 'Win' && event.key === 'Meta')
        .forEach(el => this._togglePress(el, false));
    })
  }

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keysLayout = this.properties.language === 'ru' ? [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'delete',
      'capslock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'enter',
      'shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', 'rshift',
      'ctrl', 'win', 'alt', 'space', 'ctrl', 'home', '←', '↓', '→', 'end',
    ] : [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'backspace',
      'tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', 'delete',
      'capslock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter',
      'shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', 'rshift',
      'ctrl', 'win', 'alt', 'space', 'ctrl', 'home', '←', '↓', '→', 'end',
    ];

    keysLayout.forEach(key => {
      const keyElement = document.createElement('button');

      keyElement.classList.add('keyboard-key');
      keyElement.setAttribute('type', 'button');

      const lineBreak = ['backspace', 'delete', 'enter', 'rshift', 'end'].includes(key);

      switch (key) {
        case "backspace":
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = 'Backspace';

          keyElement.addEventListener('click', () => {
            this.elements.textarea.focus();
            event.preventDefault();
            if (this.elements.textarea.selectionStart !== 0) {
              if (this.elements.textarea.selectionEnd === this.elements.textarea.selectionStart) {
                this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart - 1) + this.properties.valueInput.substring(this.elements.textarea.selectionStart, this.properties.valueInput.length);
                this._oninput(key, this.elements.textarea.selectionStart - 1);
              } else {
                this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + this.properties.valueInput.substring(this.elements.textarea.selectionEnd, this.properties.valueInput.length);
                this._oninput(key, this.elements.textarea.selectionStart);
              }
            } else
              this._oninput(key, this.elements.textarea.selectionStart);
          });
          break;

        case "delete":
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = 'Delete';

          keyElement.addEventListener('click', () => {
            this.elements.textarea.focus();
            event.preventDefault();
            if (this.elements.textarea.selectionEnd === this.elements.textarea.selectionStart)
              this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + this.properties.valueInput.substring(this.elements.textarea.selectionStart + 1, this.properties.valueInput.length);
            else
              this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + this.properties.valueInput.substring(this.elements.textarea.selectionEnd, this.properties.valueInput.length);
            this._oninput(key, this.elements.textarea.selectionStart);
          });
          break;

        case "tab":
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = 'Tab';

          keyElement.addEventListener('click', () => {
            this.elements.textarea.focus();
            event.preventDefault();
            this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + '\t' + this.properties.valueInput.substring(this.elements.textarea.selectionStart, this.properties.valueInput.length);
            this._oninput(key, ++this.elements.textarea.selectionStart);
          });
          break;

        case "capslock":
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = 'CapsLock';

          keyElement.addEventListener('click', () => {
            this._toggleCapsLock();
            keyElement.classList.toggle('keyboard-key-pressed', this.properties.capsLock);
          });
          break;

        case "enter":
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = 'Enter';

          keyElement.addEventListener('click', () => {
            this.elements.textarea.focus();
            event.preventDefault();
            this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + '\n' + this.properties.valueInput.substring(this.elements.textarea.selectionStart, this.properties.valueInput.length);
            this._oninput(key, ++this.elements.textarea.selectionStart);
          });
          break;

        case "space":
          keyElement.classList.add('keyboard-key-extra-wide');

          keyElement.addEventListener('click', () => {
            this.elements.textarea.focus();
            event.preventDefault();
            this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + ' ' + this.properties.valueInput.substring(this.elements.textarea.selectionStart, this.properties.valueInput.length);
            this._oninput(key, ++this.elements.textarea.selectionStart);
          });
          break;

        case "shift":
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = 'Shift';

          break;

        case "rshift":
          keyElement.classList.add('keyboard-key-wide');
          keyElement.innerHTML = 'Shift';

          break;

        case "home":
          keyElement.innerHTML = 'Home';

          keyElement.addEventListener('click', () => {
            this.elements.textarea.focus();
            event.preventDefault();
            this._oninput(key, 0);
          });
          break;

        case "end":
          keyElement.innerHTML = 'End';

          keyElement.addEventListener('click', () => {
            this.elements.textarea.focus();
            event.preventDefault();
            this._oninput(key, this.properties.valueInput.length);
          });
          break;

        case "ctrl":
          keyElement.innerHTML = 'Ctrl';
          break;

        case "win":
          keyElement.innerHTML = 'Win';
          break;

        case "alt":
          keyElement.innerHTML = 'Alt';
          break;

        default:
          keyElement.textContent = key.toLowerCase();

          keyElement.addEventListener('click', () => {
            this.elements.textarea.focus();
            event.preventDefault();
            let keySymbol = this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
            this.properties.valueInput = this.properties.valueInput.substring(0, this.elements.textarea.selectionStart) + keySymbol + this.properties.valueInput.substring(this.elements.textarea.selectionStart, this.properties.valueInput.length);
            this._oninput(key, ++this.elements.textarea.selectionStart);
          });
          break;
      }

      fragment.appendChild(keyElement);

      if (lineBreak) {
        const breakk = document.createElement('div');
        breakk.classList.add('break');
        fragment.appendChild(breakk);
      }
    });
    return fragment;
  }

  _oninput(handlerName, sS) {

    this.elements.textarea.value = this.properties.valueInput;

    this.elements.textarea.selectionStart = sS;
    this.elements.textarea.selectionEnd = sS;
  }

  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.textContent.length === 1)
        key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
    }
  }

  _togglePress(element, option) {

    element.classList.toggle('keyboard-key-pressed', option);
    console.log(element);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const keyboard = new Keyboard();
})