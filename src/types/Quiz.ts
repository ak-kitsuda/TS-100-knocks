export type Quiz = {
  id: number;
  questionCode: string[];
  questionText: string;
  options: {
    a: string;
    b: string;
    c?: string;
    d?: string;
  };
  answer: 'a' | 'b' | 'c' | 'd';
  link: string;
};
