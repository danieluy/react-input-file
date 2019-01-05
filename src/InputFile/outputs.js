const outputs = {
  ANY: {
    transform: input => input,
    accept: null,
    mimeType: null,
  },
  JSON: {
    transform: input => JSON.parse(input),
    accept: '.json,application/json',
    mimeType: 'application/json',
  },
  IMG: {
    transform: input => input,
    accept: 'image/*',
    mimeType: null,
  },
};

export default outputs;
