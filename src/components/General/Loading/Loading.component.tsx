import * as React from 'react';

import { LoadingContainer } from './Loading.styles';
import { LoadingProps } from '@Types/props';

const Loading: React.FC<LoadingProps> = ({ size = '2rem' }) => {
    return (
        <LoadingContainer size={size} />
    );
}

export default Loading;