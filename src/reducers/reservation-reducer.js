const initialState = {
  reservations: []
}

export default (state=initialState, action={}) => {
  switch (action.type) {
    case 'RECEIVE_RESERVATIONS':
      return {
        ...state,
        reservations: action.payload
      }
    case 'DELETE_RESERVATION':
      return {
        ...state,
        reservations: [...state.reservations.filter(reservation => reservation.id != action.reservationId)]
      }
    case 'MAKE_RESERVATION':
      return {
        ...state,
        reservations: [
          ...state.reservations,
          { ...action.payload }
        ]
      }
    default:
      return state;
  }
}