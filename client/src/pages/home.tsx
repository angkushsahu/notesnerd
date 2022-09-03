import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { getUser } from "../requests";
import { NoteState } from "../store";

const Home = () => {
	const { setIsAuth, setUser } = NoteState();
	const navigate = useNavigate();

	const fetchUser = async () => {
		const data = await getUser();
		if (data.success) {
			navigate("/notes", { replace: true });
			setIsAuth(true);
			setUser(data.user);
		}
	};

	useEffect(() => {
		fetchUser();
		// eslint-disable-next-line
	}, []);

	return (
		<>
			<header className="flex items-center justify-between p-6 center_screen">
				<div className="flex items-center gap-2">
					<img src={logo} alt="logo" className="w-8" loading="lazy" />
					<p className="font-semibold text-xl">NotesNerd</p>
				</div>
				<nav className="hidden sm:flex items-center gap-6">
					<Link to="/login" className="hover:underline">
						Login
					</Link>
					<Link to="/signup" className="hover:underline">
						Signup
					</Link>
				</nav>
			</header>
			<section className="flex flex-col md:flex-row gap-12 lg:gap-32 items-center justify-center center_screen fill_screen p-6">
				<div>
					<h1 className="text-center md:text-left">Notes Nerd</h1>
					<h2 className="mt-4 mb-8 text-center md:text-left">
						Now simplify your daily tasks by adding them in your notes
					</h2>
					<div className="flex flex-col md:flex-row gap-6">
						<Link to="/login" className="primary_button mx-auto md:mx-0 w-[9em]">
							Login
						</Link>
						<Link to="/signup" className="secondary_button mx-auto md:mx-0 w-[9em]">
							Signup
						</Link>
					</div>
				</div>
				<div>
					<img src={logo} alt="logo" className="w-52" loading="lazy" />
				</div>
			</section>
		</>
	);
};

export default Home;
