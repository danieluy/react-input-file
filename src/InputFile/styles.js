const style = {
  button(options) {
    options = Object.assign({
      children: null,
      noClick: false,
    }, options);
    if (options.noClick)
      return;
    if (options.children)
      return { cursor: 'pointer' };
    return {
      display: 'inline-block',
      fontFamily: 'sans-serif',
      borderRadius: '5px',
      color: '#555',
      padding: '5px 10px',
      textAlign: 'center',
      cursor: 'pointer',
      backgroundColor: '#EEE',
    };
  },
  input() {
    return {
      display: 'none',
    };
  },
};

export default style;
