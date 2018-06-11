const initialState = {
  events: [],
  event: {
    id: 0,
    title: '',
    location: '',
    description: '',
    maxMember: 0,
    date: (new Date()).getTime()
  }
}

export default (state=initialState, action={}) => {
  switch (action.type) {
    case 'RECEIVE_EVENTS':
      return {
        ...state,
        events: action.payload
      }
    case 'RECEIVE_EVENT':
      return {
        ...state,
        event: action.payload
      }
    case 'ADD_EVENT':
      return {
        ...state,
        events: [
          ...state.events,
          action.event
        ]
      }
    case 'NEW_EVENT':
      return{
        ...state,
        event: {...initialState.event}
      }
    case 'EDIT_EVENT':
      return {
        ...state,
        events: state.events.map(event =>
          event.id === action.event.id ? {...event, ...action.event} : event
        )
      }
    case 'DELETE_EVENT':
      return {
        ...state,
        events: [...state.events.filter(event => event.id != action.eventId)]
      }
    default:
      return state;
  }
}