import React from "react";
import { Helmet } from "react-helmet";
import { TransitionGroup, Transition } from "react-transition-group";

import { GlobalStyles, LayoutContainer, MainContainer } from "./Layout.styles";

import Sidebar from "./Sidebar/Sidebar.component";
import { getTransitionStyles, TIMEOUT_500 } from "@Styles/page-transitions";

const Layout: React.FC = ({ children }) => {
    return (
        <LayoutContainer>
            <Helmet>
                <title>Benyakir Writes</title>
                <meta
                    name="description"
                    content="Benyakir Writes is a portal to Benyakir Horowitz's latest work. Learn about the latest books, projects and short stories he's written.
                    Or check out his blog posts, reviews of books or podcast episodes.."
                />
            </Helmet>
            <GlobalStyles />
            <Sidebar />
            <MainContainer>
                <TransitionGroup>
                    <Transition
                        key={location.pathname}
                        timeout={{
                            enter: TIMEOUT_500,
                            exit: TIMEOUT_500,
                        }}
                        unmountOnExit
                    >
                        {(status) => (
                            <div
                                style={{
                                    ...getTransitionStyles(TIMEOUT_500)[status]
                                }}
                            >
                                {children}
                            </div>
                        )}
                    </Transition>
                </TransitionGroup>
            </MainContainer>
        </LayoutContainer>
    );
};

export default Layout;
