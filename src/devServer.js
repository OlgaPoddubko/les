import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-d...';
import config from './webpack.config.babel';
import Express from 'express';

const app = new Express();
const port = 3000;

const complier = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  niInfo: true,
  publicPath: config.output.publicPath,
}));

app.get('/', (req, res) => {
  res.sendFole(path.join(__dirname, 'index.html'))
});

app.listen(port, error => {
  /* eslint-disable no-console */
  if (error) {
    console.error(error);
  } else {
    // ..
  }
})
