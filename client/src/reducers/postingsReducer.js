import ResultData from '../components/ResultData';

// Dummy data just to test that redux is working
const INITIAL_STATE = {
  postings: [
    new ResultData("Title",
     "https://github.com/ajalt/fuckitpy",
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempor sollicitudin nisi, in condimentum turpis viverra lobortis. Nunc dignissim dictum massa, eu egestas est. Praesent ullamcorper imperdiet eros eu pulvinar. Sed blandit nunc vel nibh finibus porta. Quisque eget quam ullamcorper, faucibus nunc a, malesuada ipsum. Mauris enim arcu, imperdiet id ligula a, pellentesque sodales elit. Vivamus ornare sem id euismod auctor. Nunc dictum mi at turpis tempor finibus. In ut consequat quam. Fusce ac lorem varius, dignissim quam luctus, lacinia odio. Suspendisse aliquet, erat quis viverra venenatis, nisi odio lobortis neque, eu iaculis nunc ipsum non risus. Aenean pretium massa euismod pharetra facilisis. Duis dictum consequat risus, nec sodales diam fringilla in.",
     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer tempor sollicitudin nisi, in condimentum turpis viverra lobortis. Nunc dignissim dictum massa, eu egestas est. Praesent ullamcorper imperdiet eros eu pulvinar...",
     "Vancouver",
     "BC",
     "Canada",
     "0.000",
     "0.000",
     "Google",
     "$10",
     new Date()
   ),
    new ResultData("Nothing do-er",  "http://hasthelargehadroncolliderdestroyedtheworldyet.com/", "nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop nop ", "nop nop nop nop nop nop nop nop nop ", "Vancouver" , "BC" , "Canada"),
    new ResultData("CPU maker", "https://thedailywtf.com/articles/you-can-only-get-what-you-have", "Make CPUs and stuff. You also do things that make this string longer, so I can test how well this works for long strings. Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong Looooooooong ", "Make CPUs and stuff.",  "Vancouver", "WA", "USA", "https://ded.increpare.com/~locus/yourname.html", "https://ded.increpare.com/~locus/yourname.html"),
    new ResultData("Software Developer", "https://github.com/mattdiamond/fuckitjs", "Develop Software, but more text", "Develop Software", "Vancouver", "BC", "Canada")
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
