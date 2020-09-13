export interface Questions {
  title: string;
  answers: string[];
  correctAnswer: string;
  image: string;
}

export interface TestData {
  id: string;
  title: string;
  subTitle: string;
  firstImage: string;
  lastImage: string;
  result: string[];
  questions: Questions[];
}
