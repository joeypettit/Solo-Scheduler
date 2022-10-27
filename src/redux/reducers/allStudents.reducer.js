const allStudentsReducer = (state = [], action) => {

    // this reducer holds a list of all student names
    console.log('in allStudentsReducer', action.payload);
      switch (action.type) {
        case 'SET_STUDENT_LIST':
          return action.payload;
        default:
          return state;
      }
    };
  
    export default allStudentsReducer;
    