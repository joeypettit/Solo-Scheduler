import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "ADD_LESSON"
function* addLesson(action) {
  try {
    //~~~ axios request to POST new lesson
    yield axios({
        method: 'POST',
        url: '/api/lessons/add-lesson/',
        data: action.payload
    });

    //~~~ dispatch to get events saga to fetch updated events
    
    
  } catch (error) {
    console.log('There was an error with add lesson POST', error);
  }
}

// worker Saga: will be fired on "DELETE_LESSON" actions
function* deleteLesson(action) {
  try {
    
  } catch (error) {
    
  }
}

function* lessonSaga() {
  yield takeLatest('ADD_LESSON', addLesson);
  yield takeLatest('LOGOUT', deleteLesson);
}

export default lessonSaga;
