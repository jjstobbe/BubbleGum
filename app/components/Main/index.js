import React, { Component } from 'react';
import BranchBarContainer from '../../containers/BranchBarContainer';
import RepoBarContainer from '../../containers/RepoBarContainer';
import RepoBar from '../RepoBar';

export default class Main extends Component<Props> {

  render() {
    return (
      <div>
        <RepoBarContainer />
        <BranchBarContainer />
      </div>
    );
  }
}
