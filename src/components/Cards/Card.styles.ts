import styled from "styled-components";

import { SIZE_LG, SIZE_MD, SIZE_XL } from "@/styles/variables";

export const CardContainer = styled.ul`
    display: grid;
    gap: ${SIZE_XL};
    grid-template-columns: repeat(2, minmax(20rem, 1fr));
`;
