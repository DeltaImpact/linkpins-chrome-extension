import {
  INCREMENT_BACKGROUND_COUNTER,
  DECREMENT_BACKGROUND_COUNTER,
  INCREMENT_UI_COUNTER,
  DECREMENT_UI_COUNTER
} from "../constants/constants";

function createCounterReducer(increment, decrement) {
  return function(state = 0, action) {
    const value = action.value || 1;
    switch (action.type) {
      case increment:
        return state + value;
      case decrement:
        return state - value;
      default:
        return state;
    }
  };
}

const backgroundCounter = createCounterReducer(
  INCREMENT_BACKGROUND_COUNTER,
  DECREMENT_BACKGROUND_COUNTER
);
const uiCounter = createCounterReducer(
  INCREMENT_UI_COUNTER,
  DECREMENT_UI_COUNTER
);

export { backgroundCounter, uiCounter };
