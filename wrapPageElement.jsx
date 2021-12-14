import React from 'react';
import { Provider } from 'react-redux'

import store from './src/store';

import Layout from './src/components/Layout/Layout.component';

const wrapPageElement = ({ element, props }) => (
    <Provider store={store}>
        <Layout {...props}>{element}</Layout>
    </Provider>
)

export default wrapPageElement