import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Main from '../components/Main/index';
import * as RepoActions from '../actions/repoActions';

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(RepoActions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
