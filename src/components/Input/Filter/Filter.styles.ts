import styled from 'styled-components';

import { PRIMARY_200, SECONDARY_800, SHADOW_MD } from '@StyleVars';

export const FilterContainer = styled.aside`
    display: flex;
    flex-direction: column;

    overflow: hidden;

    padding: 1rem 1rem 1rem 2rem;

    background: ${SECONDARY_800};
    color: ${PRIMARY_200};

    box-shadow: ${SHADOW_MD};

    transition: all 1s ease;

    input[type=text] {
        margin-bottom: 1.5rem;
        width: 50%;
    }
`