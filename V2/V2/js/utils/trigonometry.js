class Trigonometry {

    static toDegrees(radians) {
        return radians * 180 / Math.PI;
    }

    static toRadians(degrees) {
        return degrees * Math.PI / 180;
    }
}

export { Trigonometry };
