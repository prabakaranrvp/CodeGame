
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
  'validWord': 'Not a valid word'
};

export {
  DIFFICULTY_MAP,
  DIFFICULTY_FILE_MAP,
  ERROR_MSG
};