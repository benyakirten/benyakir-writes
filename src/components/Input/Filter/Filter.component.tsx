import * as React from "react";
import { FilterContainer } from "./Filter.styles";

import Text from "@Input/Text/Text.component";

import { Subtitle } from "@Styles/general-components";

import { FilterProps } from "@/types/props";

const Filter: React.FC<FilterProps> = ({ name, onSearch, children }) => {
    const SEARCH_TIMEOUT = 600;
    const [timer, setTimer] = React.useState<NodeJS.Timeout>();
    const [searchText, setSearchText] = React.useState<string>("");
    function onSearchChange(val: string) {
        setSearchText(val);
        if (timer) {
            clearTimeout(timer);
            setTimer(undefined);
        }
        if (!val) {
            onSearch(val);
            return;
        }
        const _timeout = setTimeout(() => onSearch(val), SEARCH_TIMEOUT);
        setTimer(_timeout);
    }
    return (
        <FilterContainer>
            <Subtitle>Filter {name}</Subtitle>
            <Text
                value={searchText}
                onChange={onSearchChange}
                label="Search"
                name={`${name}-filter-search`}
            />
            {children}
        </FilterContainer>
    );
};

export default Filter;
