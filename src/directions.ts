export interface Direction {
    angle: number; // angle in DEG
    skewX: number; // angle DEG
    skewY: number; // angle DEG
    nodeRotation: number; // DEG
}

const PI6 = Math.PI / 6;

export const directions: Record<string, Direction> = {
    front: {
        angle: 0,
        skewX: 0,
        skewY: 0,
        nodeRotation: 0,
    },
    /* top */
    downRight: {
        angle: 0,
        skewX: 0,
        skewY: PI6,
        nodeRotation: -150,
    },
    downLeft: {
        angle: 0,
        skewX: 0,
        skewY: -PI6,
        nodeRotation: 150,
    },
    upRight: {
        angle: 0,
        skewX: 0,
        skewY: -PI6,
        nodeRotation: -30,
    },
    upLeft: {
        angle: 0,
        skewX: 0,
        skewY: PI6,
        nodeRotation: 30,
    },
    /* left */
    leftUp: {
        angle: 0,
        skewX: 0,
        skewY: PI6,
        nodeRotation: -30,
    },
    leftLeft: {
        angle: 0,
        skewX: 0,
        skewY: -PI6,
        nodeRotation: 90,
    },
    leftRight: {
        angle: 0,
        skewX: 0,
        skewY: -PI6,
        nodeRotation: -90,
    },
    leftDown: {
        angle: 0,
        skewX: 0,
        skewY: PI6,
        nodeRotation: 150,
    },
    /* right */
    rightDown: {
        angle: 0,
        skewX: 0,
        skewY: -PI6,
        nodeRotation: -150,
    },
    rightUp: {
        angle: 0,
        skewX: 0,
        skewY: -PI6,
        nodeRotation: 30,
    },
    rightLeft: {
        angle: 0,
        skewX: 0,
        skewY: PI6,
        nodeRotation: 90,
    },
    rightRight: {
        angle: 0,
        skewX: 0,
        skewY: PI6,
        nodeRotation: -90,
    }
}



