export function fetchPostings(searchKeywords) {
  // Instead of plain objects, we are returning function.
  return function(dispatch) {
    // Dispatching REQUEST action, which tells our app, that we are started requesting job postings.
    dispatch({
      type: 'FETCH_POSTINGS_REQUEST'
    });
    return fetch('http://localhost:5000/search', {
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: {
        'keywords': searchKeywords
        }
      })
      // Here, we are getting json body(in our case it will contain `postings` or `error` prop, depending on request was failed or not) from server response
      // And providing `response` and `body` variables to the next chain.
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          // If request was failed, dispatching FAILURE action.
          dispatch({
            type: 'FETCH_POSTINGS_FAILURE',
            error: body.error
          });
        } else {
          // When everything is ok, dispatching SUCCESS action.
          dispatch({
            type: 'FETCH_POSTINGS_SUCCESS',
            postings: body.postings
          });
        }
      });
  }
}