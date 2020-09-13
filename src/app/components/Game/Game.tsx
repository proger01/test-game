import * as React from 'react';
import { DataHandler } from '../../logic/DataHandler';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './style.css';

enum TestsQuantity {
  Start = -1,
  Quantity = 10,
}

interface GameProps {
  testData: DataHandler;
}

interface GameState {
  correctAnswers: number;
  isCorrectAnswer: boolean;
  showAnswer: boolean;
  testNumber: number;
}

export class Game extends React.Component<GameProps, GameState> {
  constructor(props: GameProps) {
    super(props);

    this.state = {
      correctAnswers: 0,
      isCorrectAnswer: false,
      showAnswer: false,
      testNumber: -1,
    };
  }

  public onSubmit = (): void => {
    this.setState({
      isCorrectAnswer: false,
      showAnswer: false,
      testNumber: this.state.testNumber + 1,
    });
  };

  public onSelect = (e: any): void => {
    if (
      e.target.textContent === this.props.testData!.getQuestionCorrectAnswer(this.state.testNumber)
    ) {
      this.setState({ isCorrectAnswer: true, correctAnswers: this.state.correctAnswers + 1 });
    }
    this.setState({ showAnswer: true });
  };

  public getVariantAnswers = () => {
    const answers = this.props.testData!.getQuestionAnswers(this.state.testNumber);
    if (answers.length) {
      return answers.map((answer: string, i: number) => {
        return (
          <button
            className={styles.variant}
            key={i}
            onClick={this.onSelect}
            disabled={this.state.showAnswer}
          >
            <div className={styles.variantAnswer}>{answer}</div>
            {!this.state.showAnswer ? null : (
              <div className={styles.fontawesome}>
                <FontAwesomeIcon
                  icon={
                    answer === this.props.testData!.getQuestionCorrectAnswer(this.state.testNumber)
                      ? faCheckCircle
                      : faTimesCircle
                  }
                />
              </div>
            )}
          </button>
        );
      });
    }
    return null;
  };

  public render() {
    return (
      <div>
        <h2 data-testid="title" className={styles.mainText}>
          {this.props.testData!.getTitle()}
        </h2>
        <h5 data-testid="sub-title" className={styles.subMainText}>
          {this.props.testData!.getSubTitle()}
        </h5>
        {this.mainRender()}
      </div>
    );
  }

  public mainRender = () => {
    if (this.state.testNumber === TestsQuantity.Start) {
      return this.renderStartGame();
    } else if (this.state.testNumber < TestsQuantity.Quantity) {
      return this.renderGame();
    }
    return this.renderEndGame();
  };

  public renderStartGame = () => {
    return (
      <div>
        <img className={styles.image} src={this.props.testData!.getFirstImage()} alt="img" />
        <div>
          <button data-testid="start-button" className={styles.button} onClick={this.onSubmit}>
            Начать
          </button>
        </div>
      </div>
    );
  };

  public renderGame = () => {
    return (
      <div>
        <img
          className={styles.image}
          src={this.props.testData!.getQuestionImage(this.state.testNumber)}
          alt="img"
        />
        <section>
          <h5>
            <strong data-testid="question" className={styles.question}>
              {this.props.testData!.getQuestionTitle(this.state.testNumber)}
            </strong>
          </h5>
          <div data-testid="variants" className={styles.variantsBlock}>
            {this.getVariantAnswers()}
          </div>
        </section>
        <div>
          {this.state.showAnswer ? (
            this.afterAnswer()
          ) : (
            <div className={styles.insteadResult}></div>
          )}
        </div>
      </div>
    );
  };

  public renderEndGame = () => {
    const correctAnswers = this.state.correctAnswers;
    const result = correctAnswers < 5 ? 'Можно лучше' : correctAnswers < 8 ? 'Сойдет' : 'Красава!';

    return (
      <div>
        <img className={styles.image} src={this.props.testData!.getLastImage()} alt="img" />
        <div className={styles.endResult}>
          <div>{`${correctAnswers}/10`}</div>
          <p>{result}</p>
        </div>
      </div>
    );
  };

  public afterAnswer = () => {
    const result = this.state.isCorrectAnswer
      ? 'Твой вариант правильный!'
      : 'Твой вариант неправильный!';
    return (
      <div>
        <div data-testid="result" className={styles.result}>
          {result}
        </div>
        <button data-testid="continue-button" className={styles.button} onClick={this.onSubmit}>
          Продолжить
        </button>
      </div>
    );
  };
}
