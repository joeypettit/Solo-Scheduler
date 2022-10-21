import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker Saga: will be fired on "FETCH_LESSONS"
function* fetchLessons(){
    try{
        let response = yield axios({
            method: 'GET',
            url: '/api/lessons/'
        })
        console.log('in fetchLessons', response.data);
        yield put ({ type: 'SET_LESSONS', payload: response.data});
    }
    catch(error){
        console.log('User Get Request Failed', error);
    }
}




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

    yield put({type: 'FETCH_LESSONS'})
    

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
  yield takeLatest('FETCH_LESSONS', fetchLessons);
  yield takeLatest('LOGOUT', deleteLesson);
}

export default lessonSaga;
