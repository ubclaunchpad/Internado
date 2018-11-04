export default function fetchPostings(searchKeywords) {
  return function(dispatch) {
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
      .then(response => response.json().then(body => ({ response, body })))
      .then(({ response, body }) => {
        if (!response.ok) {
          dispatch({
            type: 'FETCH_POSTINGS_FAILURE',
            error: body.error
          });
        } else {
          dispatch({
            type: 'FETCH_POSTINGS_SUCCESS',
            postings: body.postings
          });
        }
      });
  }
}