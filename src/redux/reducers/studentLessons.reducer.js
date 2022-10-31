
// this reducer holds all the lessons of a logged in instructor
const studentLessonsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_STUDENT_LESSONS':
        console.log('in SET_STUDENT_LESSONS', action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  
  export default studentLessonsReducer;