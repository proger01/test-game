import { TestData } from '../models/TestData';

export class DataHandler {
  public data: TestData;

  constructor(data: TestData) {
    this.data = data;
  }

  public getTitle = (): string => {
    return this.data.title;
  };

  public getSubTitle = (): string => {
    return this.data.subTitle;
  };

  public getFirstImage = (): string => {
    return this.data.firstImage;
  };

  public getLastImage = (): string => {
    return this.data.lastImage;
  };

  public getQuestionImage = (questionNumber: number): string => {
    return this.data.questions[questionNumber].image;
  };

  public getQuestionTitle = (questionNumber: number): string => {
    return this.data.questions[questionNumber].title;
  };

  public getQuestionAnswers = (questionNumber: number): string[] => {
    return this.data.questions[questionNumber].answers;
  };

  public getQuestionCorrectAnswer = (questionNumber: number): string => {
    return this.data.questions[questionNumber].correctAnswer;
  };
}
