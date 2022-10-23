import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker Saga: will be fired on "FETCH_LESSONS"
// fetches lessons (calendar events) of current user
function* fetchInstructorLessons(){
    try{
        let response = yield axios({
            method: 'GET',
            url: '/api/lessons/instructor'
        })
        console.log('in fetchInstructorLessons', response.data);
        yield put ({ type: 'SET_LESSONS', payload: response.data});
    }
    catch(error){
        console.log('User Get Request Failed', error);
    }
}

// this saga fetches the lesson schedule and firstname, lastname, and id of the 
// selected instructor (user id is in action.payload)
function* fetchSelectedInstructorLessons(action) {
  try{
    let response = yield axios({
        method: 'GET',
        url: `/api/lessons/instructor/${action.payload}` //action.payload => selected instructor id
    });
    console.log('in fetchSelectedInstructorLessons', response.data);
    yield put ({ type: 'SET_SELECTED_INSTRUCTOR', payload: response.data});
  }
  catch(error){
      console.log('fetchSelectedInstructorLessons Get Request Failed', error);
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
    yield put({type: 'FETCH_LESSONS'});
    

  } catch (error) {
    console.log('There was an error with add lesson POST', error);
  }
}

function* reserveLessonTime(action){
  try {
    yield axios({
        method: 'PUT',
        url: `/api/lessons/reserve-lesson/${action.payload.lesson_id}`, // action.payload is the lesson id
    });

    //~~~ dispatch to get events saga to fetch updated events
    yield put ({ type: 'FETCH_SELECTED_INSTRUCTOR_LESSONS', payload: action.payload.instructor_id})

  } catch (error) {
    console.log('There was an error with add lesson POST', error);
  }
}



// worker Saga: will be fired on "DELETE_LESSON" actions
function* deleteLesson(action) {
  try {
    yield axios({
        method: 'DELETE',
        url: `/api/lessons/delete-lesson/${action.payload}`, // action.payload is the lesson id
    });

    //~~~ dispatch to get events saga to fetch updated events
    yield put({type: 'FETCH_LESSONS'});

  } catch (error) {
    console.log('There was an error with delete lesson DELETE', error);
  }
}

function* lessonSaga() {
    yield takeLatest('FETCH_LESSONS', fetchInstructorLessons);
    yield takeLatest('FETCH_SELECTED_INSTRUCTOR_LESSONS', fetchSelectedInstructorLessons);
    yield takeLatest('RESERVE_LESSON_TIME', reserveLessonTime);
    yield takeLatest('ADD_LESSON', addLesson);
    yield takeLatest('DELETE_LESSON', deleteLesson);
    yield takeLatest('LOGOUT', deleteLesson);
}

export default lessonSaga;
