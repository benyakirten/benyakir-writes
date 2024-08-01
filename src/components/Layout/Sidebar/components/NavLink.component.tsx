import * as React from "react";

import { useAppDispatch } from "@/store/hooks";
import { setSidebarState } from "@/store/sidebar/sidebar.slice";
import { StyledNavLink } from "./NavLink.styles";

const NavLink = React.forwardRef<HTMLElement, NavLinkProps>(
	({ tabIndex, active, children, to }, ref) => {
		const dispatch = useAppDispatch();
		const reducedMotionActive = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		const onClick = () =>
			setTimeout(
				() => dispatch(setSidebarState(false)),
				reducedMotionActive ? 0 : 200,
			);

		return (
			<StyledNavLink
				// @ts-ignore
				ref={ref}
				aria-current={active && "page"}
				to={to}
				onClick={onClick}
				tabIndex={tabIndex}
				active={active}
			>
				{children}
			</StyledNavLink>
		);
	},
);

export default NavLink;
