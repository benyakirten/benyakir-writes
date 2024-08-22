import styled from "styled-components";

import { SIZE_LG } from "@/styles/variables";
import { media } from "@/styles/queries";

export const CardContainer = styled.ul`
    display: grid;
    gap: ${SIZE_LG};
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

    ${media.phone} {
        grid-template-columns: 1fr;
    }
`;

export const CardTitle = styled.h3`
    font-weight: bold;
    grid-column: span 2;
`;
