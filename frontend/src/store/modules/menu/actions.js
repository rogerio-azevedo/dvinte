export const showMenuRequest = payload => ({
  type: '@menu/SHOW_MENU_REQUEST',
  payload,
})

export const showMenuSuccess = payload => ({
  type: '@menu/SHOW_MENU_SUCCESS',
  payload,
})

export const showMenuFailure = () => ({
  type: '@menu/SHOW_MENU_FAILURE',
})
