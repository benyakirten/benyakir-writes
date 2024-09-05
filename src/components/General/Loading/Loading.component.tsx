import * as React from "react";

import { SIZE_MD } from "@/styles/variables";
import { LoadingContainer } from "./Loading.styles";

const Loading: React.FC<LoadingProps> = ({ size = SIZE_MD }) => (
	<LoadingContainer size={size} />
);

export default Loading;
