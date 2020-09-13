import * as React from 'react';
import { testData } from './testData';
import { DataHandler } from '../src/app/logic/DataHandler';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Game } from '../src/app/components/Game/Game';
import renderer from 'react-test-renderer';

const data: DataHandler = new DataHandler(testData);

const pressStartButton = () => {
  render(<Game testData={data} />);
  const startButton = screen.getByTestId('start-button');
  userEvent.click(startButton);
};

describe('Start page', () => {
  it('renders without crashing', () => {
    render(<Game testData={data} />);
  });

  it('renders the correct content of the start page', () => {
    render(<Game testData={data} />);
    const title = screen.getByTestId('title');
    const subTitle = screen.getByTestId('sub-title');
    const startButton = screen.getByTestId('start-button');

    expect(title.textContent).toBe(data.getTitle());
    expect(subTitle.textContent).toBe(data.getSubTitle());
    expect(startButton.textContent).toBe('Начать');
  });

  it("click the button 'Начать'", () => {
    render(<Game testData={data} />);
    const startButton = screen.getByTestId('start-button');
    fireEvent.click(startButton);
  });

  it('matches snapshot', () => {
    const component = renderer.create(<Game testData={data} />);
    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe('First question', () => {
  const getVariantsArray = (htmlElement: HTMLElement): any => {
    return Array.from(htmlElement.childNodes).map((item) => item.textContent);
  };

  it("without crashing after clicking 'Начать' button", () => {
    pressStartButton();
  });

  it('renders the correct content of the 1st question page before selection a variant', () => {
    pressStartButton();

    const title = screen.getByTestId('title');
    const subTitle = screen.getByTestId('sub-title');
    const questionTitle = screen.getByTestId('question');
    const variantsArray = getVariantsArray(screen.getByTestId('variants'));

    expect(title.textContent).toBe(data.getTitle());
    expect(subTitle.textContent).toBe(data.getSubTitle());
    expect(questionTitle.textContent).toBe(data.getQuestionTitle(0));
    for (let i = 0; i < variantsArray.length; i++) {
      expect(variantsArray[i]).toBe(data.getQuestionAnswers(0)[i]);
    }
  });
  it('renders the correct answer', () => {
    pressStartButton();

    const variantsArray = getVariantsArray(screen.getByTestId('variants'));
    userEvent.click(variantsArray[2]);

    const result = screen.getByTestId('result');
    expect(result.textContent).toBe('Твой вариант правильный!');
  });
});
