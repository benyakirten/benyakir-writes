import styled from "styled-components";

import { SIZE_XL } from "@/styles/variables";

export const CardContainer = styled.ul`
    display: grid;
    gap: ${SIZE_XL};
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(2, minmax(20rem, 1fr));
`;
