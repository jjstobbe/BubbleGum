import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RepoBar from '../components/RepoBar';
import * as repoActions from '../actions/repoActions';

function mapStateToProps(state) {
  return {
    repos: state.repo.repos,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(repoActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepoBar);
