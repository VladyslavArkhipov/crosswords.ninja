const defaultState = {
  isCrosswordHidden: true,
};

export const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case "HIDE_CROSSWORD":
      return {
        ...state,
        isCrosswordHidden: true,
      };

    case "SHOW_CROSSWORD":
      return {
        ...state,
        isCrosswordHidden: false,
      };
    default:
      return state;
  }
};
