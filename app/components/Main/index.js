import React, { Component } from 'react';
import styles from './Main.css';
import BranchBar from '../BranchBar';
import RepoBar from '../RepoBar';

export default class Main extends Component<Props> {

  render() {
    const {
      importRepo,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter
    } = this.props;

    return (
      <div>
        <BranchBar />
        <RepoBar importRepo={importRepo}/>

        <div className={styles.backButton} data-tid="backButton">
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
          Counter: {counter}
        </div>
        <div className={styles.btnGroup}>
          <button
            className={styles.btn}
            onClick={decrement}
            data-tclass="btn"
            type="button"
          >
            <i className="fa fa-minus" />
          </button>
          <button
            className={styles.btn}
            onClick={incrementIfOdd}
            data-tclass="btn"
            type="button"
          >
            odd
          </button>
          <button
            className={styles.btn}
            onClick={() => incrementAsync()}
            data-tclass="btn"
            type="button"
          >
            async
          </button>
        </div>
      </div>
    );
  }
}
