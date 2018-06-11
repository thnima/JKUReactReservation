const initialState = {
  isAdmin: false,
  userName: ''
}

export default (state=initialState, action={}) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        ...action.user
      }
    }
    default:
      return state;
  }
}