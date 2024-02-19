import { SPEED_DOWN, SPEED_INERTIA, SPEED_LIMIT, SPEED_UP, TRACK_SIZE, TURN_AMOUNT} from "../consts/consts.js";

class Car {
    //Private properties the after are built in constructor
    #carDom;
    #speed;
    #angle;

    constructor(carDom) {
        this.#carDom = carDom;
        this.#speed = 0;
        this.#angle = 0;
        this.reset();
    }
    
    //I establish the left and top of the car for place it in the middle
    reset() {
        this.#carDom.style.left = TRACK_SIZE / 2 + 'px';
        this.#carDom.style.top = TRACK_SIZE / 2 + 'px';
        this.#speed = 0;
        this.#angle = 0;
    }
    //Aux function for updating car rotation
    Rotation() {
        this.#carDom.style.transform = `translate(-50%, -50%) rotate(${this.#angle}deg)`;
    }
    update(keyList) {
        //Conditional block for indicating we increase or decrease SPEED
        switch (true) {
            case keyList.includes('ArrowUp'):
                this.#speed = Math.min(this.#speed + SPEED_UP, SPEED_LIMIT);
                break;
            case keyList.includes('ArrowDown'):
                this.#speed = Math.max(this.#speed - SPEED_DOWN, -SPEED_LIMIT);
                break;
            case this.#speed > 0:
                this.#speed = Math.max(this.#speed - SPEED_INERTIA, 0);
                break;
            case this.#speed < 0:
                this.#speed = Math.min(this.#speed + SPEED_INERTIA, 0);
                break;
        }
        //Modification of angle
        this.#angle += (keyList.includes('ArrowRight') ? 1 : 0) * TURN_AMOUNT;
        this.#angle -= (keyList.includes('ArrowLeft') ? 1 : 0) * TURN_AMOUNT;
        //const deltax=this.#speed * Math.cos(radians);
        //const deltay=this.#speed * Math.sin(radians);
        //calculate of the position
        const radians = (this.#angle * Math.PI) / 180;
        const deltaX = parseFloat(this.#carDom.style.left) + this.#speed * Math.cos(radians);
        const deltaY = parseFloat(this.#carDom.style.top) + this.#speed * Math.sin(radians);
        this.#carDom.style.left = deltaX + 'px';
        this.#carDom.style.top = deltaY + 'px';
        this.Rotation();
        return { x: deltaX, y: deltaY };
    }
}

export { Car };