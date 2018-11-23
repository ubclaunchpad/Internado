import ResultData from '../components/ResultData';

// Dummy data just to test that redux is working
const INITIAL_STATE = {
  postings: [
    new ResultData(
      "Nothing do-er",
      "http://hasthelargehadroncolliderdestroyedtheworldyet.com/",
      "nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop",
      "Vancouver",
      "BC",
      "Canada",
      "0.000",
      "0.000",
      "Google",
      "5",
      new Date()
    ),

    new ResultData(
      "CPU maker",
      "https://github.com/mattdiamond/fuckitjs",
      "Make CPUs and stuff. You also do things that make this string longer, so I can test how well this works for long strings. Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong ",
      "Vancouver",
      "BC",
      "Canada",
      "0.000",
      "0.000",
      "Microsoft",
      "5",
      new Date()
    ),

    new ResultData("Software Developer",
    "https://thedailywtf.com/articles/you-can-only-get-what-you-have",
    "Develop Software, short description",
    "Vancouver",
    "WA",
    "USA",
    "0.000",
    "0.000",
    "Facebook",
    "5",
    new Date()
  )
],
  error: undefined
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_POSTINGS_REQUEST':

    case 'FETCH_POSTINGS_SUCCESS':
      return Object.assign({}, state, {
        postings: action.postings
      });
    case 'FETCH_POSTINGS_FAILURE':
      return Object.assign({}, state, {
        error: action.error
      });
    default:
      return state;
  }
}
