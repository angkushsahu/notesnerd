import { useNavigate } from "react-router-dom";
import error from "../assets/images/error.png";

const Error = () => {
	const navigate = useNavigate();

	return (
		<section className="flex flex-col gap-4 items-center justify-center min-h-screen">
			<img src={error} alt="error" loading="lazy" className="w-[38em]" />
			<h2>This page does not exist</h2>
			<button
				className="primary_button mt-4"
				onClick={() => navigate("/", { replace: true })}
			>
				Go to home
			</button>
		</section>
	);
};

export default Error;
