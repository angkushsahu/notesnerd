import { useState } from "react";
import { Link } from "react-router-dom";
import { GiCancel, GiHamburgerMenu } from "react-icons/gi";
import logo from "../assets/images/logo.png";

const Header = () => {
	const [toggleNavigation, setToggleNavigation] = useState<boolean>(false);

	const closeNavigationBar = () => {
		setToggleNavigation(false);
	};

	return (
		<header className="flex items-center justify-between p-6 center_screen">
			<div>
				<img src={logo} alt="logo" loading="lazy" className="w-8" />
			</div>
			<nav className="hidden sm:flex items-center gap-6">
				<Link to="/note/create" className="hover:underline">
					Create
				</Link>
				<Link to="/notes" className="hover:underline">
					Notes
				</Link>
				<Link to="/notes/important" className="hover:underline">
					Important
				</Link>
				<Link to="/dashboard" className="hover:underline">
					Dashboard
				</Link>
			</nav>
			<nav className="block sm:hidden">
				<GiHamburgerMenu
					size={25}
					cursor="pointer"
					onClick={() => setToggleNavigation(true)}
				/>
			</nav>
			<nav
				className={`fixed z-[1] inset-0 left-auto bg-primary min-w-[16em] flex sm:hidden gap-2 flex-col p-6 transition-transform duration-300 origin-right shadow-lg shadow-primary text-white ${
					toggleNavigation ? "scale-x-100" : "scale-x-0"
				}`}
			>
				<GiCancel
					size={30}
					cursor="pointer"
					onClick={() => setToggleNavigation(false)}
					className="ml-auto mb-10"
				/>
				<Link
					to="/note/create"
					className="hover:underline w-fit"
					onClick={closeNavigationBar}
				>
					Create
				</Link>
				<Link to="/notes" className="hover:underline w-fit" onClick={closeNavigationBar}>
					Notes
				</Link>
				<Link
					to="/notes/important"
					className="hover:underline w-fit"
					onClick={closeNavigationBar}
				>
					Important
				</Link>
				<Link
					to="/dashboard"
					className="hover:underline w-fit"
					onClick={closeNavigationBar}
				>
					Dashboard
				</Link>
			</nav>
		</header>
	);
};

export default Header;
