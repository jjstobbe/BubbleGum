import React, { Component } from 'react';
import BranchBarContainer from '../../containers/BranchBarContainer';
import RepoBarContainer from '../../containers/RepoBarContainer';
import RepoBar from '../RepoBar';
import styles from './Main.css';

export default class Main extends Component<Props> {

  render() {
    return (
      <div className={styles.projectWrapper}>
        <BranchBarContainer />
        <RepoBarContainer />
      </div>
    );
  }
}
