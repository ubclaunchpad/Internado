import { connect } from 'react-redux'
import ResultsTable from '../components/ResultsTable'

const mapStateToProps = state => {
  return {
    results: state.postings
  }
}

const mapDispatchToProps = dispatch => {
  return {

  }
}
​
const ResultsTableContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsTable)
​
export default ResultsTableContainer