const selectedInstructorReducer = (state = [], action) => {
    // state is an instructor object which contains instructor user info
    // and an (available) lessons object.
    // {instructor_id: ... , first_name: ... , last_name: ..., lessons: [{},{}] }
    console.log('in selectedInstructorReducer', action.payload);
      switch (action.type) {
        case 'SET_SELECTED_INSTRUCTOR':
          return action.payload;
        default:
          return state;
      }
    };
  
    export default selectedInstructorReducer;
    