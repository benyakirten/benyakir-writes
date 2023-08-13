import React from 'react';
import { Provider } from 'react-redux';

import store from './src/store';

import Layout from './src/components/Layout/Layout.component';

export const wrapPageElement = ({ element, props }) => (
    <Layout {...props}>{element}</Layout>
)

export const wrapRootElement = ({ element }) => (
    <Provider store={store}>
        {element}
    </Provider>
)
