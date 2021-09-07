import styled from 'styled-components';
import { BLACK, FONT_XXL } from '@StyleVars';

export const CheckboxGroup = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    margin: 1rem 0;

    input:checked + label > span {
        transform: scale(1);
        opacity: 1;
    }

    label {
        position: relative;
        height: 2rem;
        width: 3.5rem;
        margin-right: 1rem;

        background-color: #fff;
        outline: 3px solid ${BLACK};
        cursor: pointer;

        transition: all 0.4s;
        transition: transform 0.4s;
        transform-origin: left;

        &:hover {
            transform: scale(1.05);
        }

        &:active {
            transform: scale(1.02);
        }
        span {
            position: absolute;
            top: -1rem;

            color: ${BLACK};
            font-size: ${FONT_XXL};
            font-weight: bold;
            
            transition: all 0.4s;
            transform: scale(0.2);
            opacity: 0;
        }
    }
    input {
        display: none;
        position: relative;
    }
    span {
        cursor: pointer;
    }
`