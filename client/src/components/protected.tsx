import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NoteState } from "../store";

const Protected = ({ children }: { children: ReactNode }) => {
	const { isAuth } = NoteState();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) {
			navigate("/", { replace: true });
		}
	}, [isAuth, navigate]);

	return <>{children}</>;
};

export default Protected;
