
const DIFFICULTY_MAP = {
  'easy': 4,
  'medium': 5,
  'hard': 6
};

const DIFFICULTY_FILE_MAP = {
  'easy': 'four.js',
  'medium': 'four.js',
  'hard': 'six.js'
};

const ERROR_MSG = {
  'usedGuess': 'You have already used this guess',
  'minLength': {
    'easy': 'Please enter a 4 letter word',
    'medium': 'Please enter a 5 letter word',
    'hard': 'Please enter a 6 letter word',
  },
  'validWord': 'Not a valid word. <a class="link" target="_blank" href="mailto:support@codegame.in?subject=Add%20missing%20word%20-%20{word}&body=Hi,%20Please%20add%20the%20missing%20word">Report</a>'
};

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

export {
  DIFFICULTY_MAP,
  DIFFICULTY_FILE_MAP,
  ERROR_MSG,
  LETTERS
};