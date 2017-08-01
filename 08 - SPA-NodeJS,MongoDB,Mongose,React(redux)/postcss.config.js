const NODE_ENV = (process.env.NODE_ENV || 'development').trim();
const isProd = NODE_ENV === 'production';

function sortMediaQueries(a, b) {
  let A = a.replace(/\D/g, '');
  let B = b.replace(/\D/g, '');

  if (isMax(a) && isMax(b)) {
    return B - A;
  } else if (isMin(a) && isMin(b)) {
    return A - B;
  } else if (isMax(a) && isMin(b)) {
    return 1;
  } else if (isMin(a) && isMax(b)) {
    return -1;
  }

  return 1;
};

function isMax(mq) {
  return /max-width/.test(mq);
}

function isMin(mq) {
  return /min-width/.test(mq);
}

var config = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        'last 4 versions',
        '> 1%',
        'IE >= 9'
      ]
    }),
    require('css-mqpacker')({
      sort: sortMediaQueries
    })
  ].concat(isProd
    ? [
      require('postcss-csso')({
        restructure: false,
        comments: false
      })
    ]
    : []
    )
};

module.exports = config;
