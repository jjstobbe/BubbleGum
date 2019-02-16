import React, { Component } from 'react';

export default class RepoTab extends Component<Props> {

  render() {
    return (
      <div>
        { this.props.name }
      </div>
    );
  }
}
