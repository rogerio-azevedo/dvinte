const INITIAL_STATE = {
  chatMenu: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case '@menu/SHOW_MENU_SUCCESS':
      return {
        ...state,
        chatMenu: action.payload,
      }
    default:
      return state
  }
}
