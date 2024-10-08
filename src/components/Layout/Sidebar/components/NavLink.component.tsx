import * as React from "react";

import { useAppDispatch } from "@/store/hooks";
import { setSidebarState } from "@/store/sidebar/sidebar.slice";
import { StyledNavLink } from "./NavLink.styles";

const NavLink = React.forwardRef<HTMLElement, NavLinkProps>(
	({ tabIndex, active, children, to }, ref) => {
		const dispatch = useAppDispatch();
		const onClick = () => dispatch(setSidebarState(false));

		return (
			<StyledNavLink
				// @ts-ignore
				ref={ref}
				aria-current={active && "page"}
				to={to}
				onClick={onClick}
				tabIndex={tabIndex}
			>
				{children}
			</StyledNavLink>
		);
	},
);

export default NavLink;
