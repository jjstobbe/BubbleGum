import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BranchBar from '../components/BranchBar';
import * as repoActions from '../actions/repoActions';

function mapStateToProps(state) {
  console.log(state)

  return {
    branchDict: state.repo.branchDict,
    remoteDict: state.repo.remoteDict
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(repoActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BranchBar);
