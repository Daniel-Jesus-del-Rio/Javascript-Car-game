import { TRACK_SIZE, INIT_LIVES, FRAME_RATE } from "../consts/consts.js";
import { GamePad } from "./GamePad.js";
import { Car } from "./Car.js";

class GameApp {
    #lives;
    #trackDom;
    car;
    keypad;
    tick;
   
    constructor(trackSelector, carSelector, livesSelector) {
    this.livesDom = document.querySelector(livesSelector);
    this.#trackDom = document.querySelector(trackSelector);
    this.car = new Car(document.querySelector(carSelector));
    this.#lives = INIT_LIVES;
    this.keypad = new GamePad();
    this.tick = setInterval(this.render.bind(this), FRAME_RATE);
    this.init();
    }
   //Initialize
    init() {
    this.#lives = INIT_LIVES;
    this.#trackDom = TRACK_SIZE;
    this.keypad.init();
    }
   
    render() {
    const counterKey = this.keypad.getKeysPressed();
    const position = this.car.update(counterKey);
   
    if (this.outLmit(position.x, position.y)) {
    this.crash();
    }
    }
    //AUX Method for knowing if car is not within limits.
    outLmit(x, y) {
   
    return x < 0 || x > TRACK_SIZE || y < 0|| y >TRACK_SIZE;
    }
   //Control if the car had accident with the limit. Substract lives and finish the game in case we have less than 1.
    crash() {
    this.#lives-=1;
    this.car.reset();
   
    if (this.#lives < 1) {
    this.finish();
    }
    this.livesMark();
    }
   // it updates lives selector
    livesMark() {
    const livesAvalible = document.querySelector('.js-lives');
   
    if (livesAvalible ) {
        livesAvalible .textContent = this.#lives > 0 ? this.#lives : '💀';
    }
    }
   //Finish the game
    finish() {
    clearInterval(this.tick);
    this.keypad.destroy();
    }
   
    
   }

export { GameApp };
