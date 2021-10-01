import styled from 'styled-components';
import { BLACK, FONT_LG, FONT_XXL } from '@StyleVars';

export const CheckboxGroup = styled.div`
    position: relative;

    display: flex;
    align-items: center;
    margin: 0.4rem 0;

    input:checked + label > span {
        transform: scale(1);
        opacity: 1;
    }

    label {
        cursor: pointer;

        position: relative;
        
        height: 2rem;
        width: 3.5rem;
        margin-right: 1rem;

        background-color: #fff;
        outline: 3px solid ${BLACK};

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
            top: -1.5rem;
            left: 0.4rem;

            

            @supports (-webkit-box-reflect: above) {
                top: -1rem;
                left: 0.4rem;
            }

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
        font-size: ${FONT_LG};
    }
`