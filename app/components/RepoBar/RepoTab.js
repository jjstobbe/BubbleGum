import React, { Component } from 'react';
import styles from './RepoTab.css'

export default class RepoTab extends Component<Props> {
  setCurrentRepo = () => {
    const { selectedRepo, setCurrentRepo, repo } = this.props;

    console.log(this.props)
    if (selectedRepo && selectedRepo.repoName == repo.repoName) {
      return;
    }

    setCurrentRepo && setCurrentRepo(repo);
  }

  removeRepo = (e) => {
    e.stopPropigation();

    const { removeRepo, repo } = this.props;

    removeRepo && removeRepo(repo);
  }

  render() {
    const { selectedRepo, repo } = this.props;

    const isSelected = selectedRepo.repoName === repo.repoName;

    return (
      <div onClick={this.setCurrentRepo} className={ [styles.repoTab, isSelected ? styles.selected : null].join(' ') }>
        <span>{ repo.repoName }</span>
        <span
          className={styles.closeRepoButton}
          onClick={this.removeRepo}
        > x </span>
      </div>
    );
  }
}
