import ResultData from '../components/ResultData';

// Dummy data just to test that redux is working
const INITIAL_STATE = {
  postings: [
    new ResultData("Nothing do-er", "nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop ", "nop nop nop nop nop nop nop nop nop ", "Vancouver, BC, Canada", "http://hasthelargehadroncolliderdestroyedtheworldyet.com/", "https://thedailywtf.com/articles/you-can-only-get-what-you-have"),
    new ResultData("CPU maker", "Make CPUs and stuff. You also do things that make this string longer, so I can test how well this works for long strings. Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong ", "Make CPUs and stuff.",  "Vancouver, WA, USA", "https://ded.increpare.com/~locus/yourname.html", "https://ded.increpare.com/~locus/yourname.html"),
    new ResultData("Software Developer", "Develop Software, but more text", "Develop Software", "Vancouver, BC, Canada", "https://github.com/mattdiamond/fuckitjs", "https://github.com/ajalt/fuckitpy")
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