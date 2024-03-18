import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
    <HashRouter>
        <ScrollToTop>
            <Provider store={store}>
                <App></App>
            </Provider>
        </ScrollToTop>
    </HashRouter>,
    document.getElementById('root')
);
