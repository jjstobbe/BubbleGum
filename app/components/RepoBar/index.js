import React, { Component } from 'react';
import { remote } from 'electron';

import RepoTab from './RepoTab'

export default class RepoBar extends Component<Props> {

  importRepoDialog = () => {
    console.log(this.props);

    let selectedPath = remote.dialog.showOpenDialog({ properties: ['openDirectory'] });
    if (selectedPath && selectedPath.length > 0) {
      console.log(selectedPath)
      this.props.importRepo(selectedPath[0]);
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <RepoTab name="Video" />

        <button onClick={this.importRepoDialog}>
          +
        </button>
      </div>
    );
  }
}
