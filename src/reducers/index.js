import { combineReducers } from 'redux';
import UserReducer from './user-reducer';
import EventReducer from './event-reducer';
import reservationReducer from './reservation-reducer';

const rootReducer = combineReducers({
  userStore: UserReducer,
  eventStore: EventReducer,
  reservationStore: reservationReducer
});

export default rootReducer;