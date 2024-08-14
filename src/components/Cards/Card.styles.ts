import styled from "styled-components";

import { SIZE_SM } from "@/styles/variables";

export const CardContainer = styled.ul`
    display: grid;
    gap: ${SIZE_SM};
    grid-template-columns: repeat(4, minmax(300px, 1fr));
`;
