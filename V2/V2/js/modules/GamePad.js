class GamePad {
    #keylist;
    constructor() {
        this.#keylist = [];
        this.init();
    }
    //Getter
    getKeysPressed() {
        return this.#keylist;
    }
    //Initialize and add event listener.
    init() {
        addEventListener('keydown', this.onKeyPressed.bind(this));
        addEventListener('keyup', this.onKeyReleased.bind(this));
    }
    //Add key to keylist array if it is not in array
    onKeyPressed(Keypress) {
        if (this.isArrowKey(Keypress.key)) {
            if (!this.#keylist.includes(Keypress.key)) {
                this.#keylist.push(Keypress.key);
            }
        }
    }
    //Delete liberated key
    onKeyReleased(OnkeyReal) {
        if (this.isArrowKey(OnkeyReal.key)) {
            this.#keylist = this.#keylist.filter(key => key !== OnkeyReal.key);
        }
    }
    //AUX method check if include some Arrow
    isArrowKey(key) {
        return ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key);
    }
    //Delete 
    destroy() {
        removeEventListener('keydown', this.onKeyPressed);
        removeEventListener('keyup', this.onKeyReleased);
    }
}

export { GamePad };