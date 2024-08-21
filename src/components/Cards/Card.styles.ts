import styled from "styled-components";

import { SIZE_LG } from "@/styles/variables";

export const CardContainer = styled.ul`
    display: grid;
    gap: ${SIZE_LG};
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
`;
