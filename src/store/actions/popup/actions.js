import {
    INCREMENT_BACKGROUND_COUNTER,
    DECREMENT_BACKGROUND_COUNTER,
    INCREMENT_UI_COUNTER,
    DECREMENT_UI_COUNTER
} from '../../constants/constants';

export function incrementUICounter() {
    return {
        type: INCREMENT_UI_COUNTER,
        value: 3
    };
}

export function decrementUICounter() {
    return {
        type: DECREMENT_UI_COUNTER,
        value: 3
    };
}

export function incrementBackgroundCounter() {
    return {type: INCREMENT_BACKGROUND_COUNTER};
}

export function decrementBackgroundCounter() {
    return {type: DECREMENT_BACKGROUND_COUNTER};
}
