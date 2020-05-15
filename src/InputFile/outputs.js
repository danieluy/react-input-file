const outputs = {
  JSON: {
    transform: input => JSON.parse(input),
    accept: '.json,application/json',
    mimeType: 'application/json',
  },
};

export default outputs;
