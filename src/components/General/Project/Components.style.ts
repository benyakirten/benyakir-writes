import styled from "styled-components";

import { SIZE_XS } from "@/styles/variables";

export const TechContainer = styled.div`
    flex: 1;
    grid-column: 1 / -1;
    
    display: flex;
    align-items: center;
    gap: ${SIZE_XS};
    flex-wrap: wrap;
`;
