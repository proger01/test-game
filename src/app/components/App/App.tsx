import * as React from 'react';
import MetaTags from 'react-meta-tags';
import Particles from 'react-particles-js';
import axios from 'axios';
import { Game } from '../Game/Game';
import { particlesOptions } from './particlesOptions';
import styles from './style.css';
import { DataHandler } from '../../logic/DataHandler';
import { Spinner } from '../../helpers/Spinner';

interface AppState {
  testData: DataHandler | null;
}

export class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      testData: null,
    };
  }

  public componentDidMount(): void {
    if (!this.state.testData) {
      axios.get('https://mighty-bayou-95591.herokuapp.com/get-testdata').then(({ data }) => {
        // axios.get('http://localhost:3000/get-testdata').then(({ data }) => {
        const dataHandler = new DataHandler(data);
        this.setState({ testData: dataHandler });
      });
    }
  }

  public render() {
    return (
      <div>
        <MetaTags>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </MetaTags>
        <div className="container text-center">
          <div className="row">
            <div className="col mb-3">
              <Particles className={styles.particles} params={particlesOptions} />
              {this.state.testData ? <Game testData={this.state.testData} /> : <Spinner />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
