const INITIAL_STATE = {
  postings: [],
  error: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_POSTINGS_REQUEST':

    case 'FETCH_POSTINGS_SUCCESS':
      // Adding derived todos to state
      return Object.assign({}, state, {
        postings: action.postings
      });
    case 'FETCH_POSTINGS_FAILURE':
      // Providing error message to state, to be able display it in UI.
      return Object.assign({}, state, {
        error: action.error
      });
    default:
      return state;
  }
}