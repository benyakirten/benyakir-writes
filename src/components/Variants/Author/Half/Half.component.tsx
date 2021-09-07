import * as React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import { Column } from "@Styles/general-components";

import { HalfProps } from "@Types/props";

const Half: React.FC<HalfProps> = ({ items, El }) => {
    return (
        <Column>
            <TransitionGroup>
                {items.map((i) => (
                    <CSSTransition
                        key={i.title}
                        timeout={800}
                        classNames="filterable-card"
                    >
                        <El item={i} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </Column>
    );
};

export default Half;