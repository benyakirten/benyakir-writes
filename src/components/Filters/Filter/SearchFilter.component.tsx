import React from "react";
import styled from "styled-components";

import { Text } from "@/components/Input";
import { useFlyout } from "@/hooks/useFlyout.hook";
import { SIZE_MD } from "@/styles/variables";
import { SearchFilterProps } from "@/types/filters";
import {
  FilterButton,
  FilterMenu,
  FilterPill,
  FilterText,
} from "../components";
import { registerCleanupFn } from "../useFilterComponent.hook";

const PlaceholderSpan = styled.span`
  opacity: 0.8;
`;

const ValuesSpan = styled.span`
  text-transform: none;
`;

const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  onChangeType,
  onRemove,
  id,
  type,
  label,
  search,
}) => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const [searchOpenTop, searchOpen, setSearchSoftOpen, setSearchHardOpen] =
    useFlyout(menuRef);

  const closeAllMenus = React.useCallback(() => {
    setSearchSoftOpen(false);
    setSearchHardOpen(false);
  }, [setSearchHardOpen, setSearchSoftOpen]);

  React.useEffect(() => {
    const cleanup = registerCleanupFn(id, closeAllMenus);
    return cleanup;
  }, [id, closeAllMenus]);

  return (
    <FilterPill ref={menuRef} onRemove={onRemove}>
      <FilterText>{label}</FilterText>
      <FilterButton
        aria-label="Change search filter type"
        onClick={() => onChangeType(type === "all" ? "any" : "all")}
      >
        {type}
      </FilterButton>
      <FilterMenu
        $pointUpwards={searchOpenTop}
        aria-expanded={searchOpen}
        onMouseEnter={() => setSearchSoftOpen(true)}
        onMouseLeave={() => setSearchSoftOpen(false)}
      >
        <Text
          label="Search"
          name={id}
          value={search.join(", ")}
          onChange={onSearch}
        />
      </FilterMenu>
      <FilterButton
        borderRadiusCorners={{ topRight: SIZE_MD, bottomRight: SIZE_MD }}
        width="10rem"
        filledIn={searchOpen}
        onMouseEnter={() => setSearchSoftOpen(true)}
        onMouseLeave={() => setSearchSoftOpen(false)}
        onClick={() => setSearchHardOpen((val) => !val)}
      >
        {search.length === 0 ? (
          <PlaceholderSpan>Search...</PlaceholderSpan>
        ) : (
          <ValuesSpan>{search.join(" ")}</ValuesSpan>
        )}
      </FilterButton>
    </FilterPill>
  );
};

export default SearchFilter;
