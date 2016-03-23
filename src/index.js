/*
reqiure.ensure([], function(require) {
  // динамическая подгрузка
  require('./app');
}, 'auth' - название для общей сборки кусков);
*/
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.querySelector('.container'));
