const instructorsReducer = (state = [], action) => {
  console.log('in instructorReducer', action.payload);
    switch (action.type) {
      case 'SET_INSTRUCTORS':
        return action.payload;
      default:
        return state;
    }
  };

  export default instructorsReducer;
  