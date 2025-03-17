export type Quiz = {
  questionCode: string[] | null;
  questionText: string;
  options: {
    a: string;
    b: string;
    c?: string;
    d?: string;
  };
  answer: 'a' | 'b' | 'c' | 'd';
  link: string;
  wrongs: number;
  isShowed: boolean;
};
