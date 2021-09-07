import * as React from "react";

import {
    MainContents,
    PageContainer,
    SideArea,
} from "./LeadPage.styles";

import { LeadPageProps } from "@Types/props";

const LeadPage: React.FC<LeadPageProps> = ({ children, filter }) => {
    return (
        <PageContainer>
            <SideArea>
                {filter}
            </SideArea>
            <MainContents>{children}</MainContents>
        </PageContainer>
    );
};

export default LeadPage;
