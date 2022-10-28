
// this reducer holds all the lessons of a logged in instructor
const lessonsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_LESSONS':
        console.log('in SET_LESSON', action.payload);
        return action.payload;
      default:
        return state;
    }
  };
  
  export default lessonsReducer;