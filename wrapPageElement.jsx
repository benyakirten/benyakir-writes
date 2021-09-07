import React from 'react';

import Layout from './src/components/Layout/Layout.component';

const wrapPageElement = ({ element, props }) => (
    <Layout {...props}>{element}</Layout>
)

export default wrapPageElement;