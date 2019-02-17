import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BranchBar from '../components/BranchBar';
import * as repoActions from '../actions/repoActions';
import * as branchActions from '../actions/branchActions';

function mapStateToProps(state = {}) {
  console.log(state);

  return {
    branchDict: state.branch && state.branch.branchDict,
    remoteDict: state.branch && state.branch.remoteDict
  };
}

function mapDispatchToProps(dispatch) {
  console.log(branchActions)
  console.log(repoActions);

  return bindActionCreators({ ...branchActions, ...repoActions }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BranchBar);
