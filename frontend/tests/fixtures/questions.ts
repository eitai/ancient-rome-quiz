import type { Question } from '../../src/types';

export const MOCK_QUESTIONS: Question[] = [
  {
    question_id: 1,
    question: 'Who was the first Roman Emperor?',
    choices: ['Julius Caesar', 'Augustus', 'Nero', 'Caligula'],
    answer_index: 1,
    hint: "He was Julius Caesar's adopted son",
  },
  {
    question_id: 2,
    question: 'In what year was Rome traditionally founded?',
    choices: ['753 BC', '509 BC', '264 BC', '44 BC'],
    answer_index: 0,
    hint: 'It was founded by Romulus, according to legend',
  },
  {
    question_id: 3,
    question: 'Which structure was built by Emperor Vespasian?',
    choices: ['The Pantheon', 'The Colosseum', 'The Forum of Trajan', 'The Circus Maximus'],
    answer_index: 1,
    hint: 'It could hold up to 80,000 spectators',
  },
  {
    question_id: 4,
    question: 'What language did the Romans speak?',
    choices: ['Greek', 'Etruscan', 'Latin', 'Oscan'],
    answer_index: 2,
    hint: 'It is the root of many modern European languages',
  },
  {
    question_id: 5,
    question: 'Who crossed the Rubicon river in 49 BC?',
    choices: ['Pompey', 'Mark Antony', 'Brutus', 'Julius Caesar'],
    answer_index: 3,
    hint: 'This act started a Roman civil war',
  },
];
