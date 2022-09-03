import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../components";
import { deleteUser, getAllNotes, getUser, logout } from "../requests";
import { NoteState } from "../store";

const Dashboard = () => {
	const navigate = useNavigate();
	const {
		setIsAuth,
		user,
		setUser,
		setTotalImportantNotes,
		setTotalNotes,
		totalImportantNotes,
		totalNotes,
	} = NoteState();

	const fetchUser = async () => {
		const data = await getUser();
		if (data?.success) {
			setIsAuth(true);
			setUser(data.user);
		} else if (!data?.success) {
			navigate("/", { replace: true });
		}
	};

	const fetchAllNotes = async () => {
		const data = await getAllNotes();
		if (data.success) {
			setTotalImportantNotes(data.totalImportantNotes);
			setTotalNotes(data.totalNotes);
		}
	};

	useEffect(() => {
		fetchUser();
		fetchAllNotes();
		// eslint-disable-next-line
	}, []);

	const handleDeleteAccount = async () => {
		const data = await deleteUser();
		if (data.success) {
			setIsAuth(false);
			toast.success(data.message);
			navigate("/", { replace: true });
		} else {
			toast.error(data.message);
		}
	};

	const handleLogout = async () => {
		const data = await logout();
		if (data.success) {
			setIsAuth(false);
			toast.success(data.message);
			navigate("/", { replace: true });
		} else {
			toast.error(data.message);
		}
	};

	return (
		<section>
			<Header />
			<div className="center_screen fill_screen flex flex-col justify-between p-4">
				<div className="pb-8 border-b-2 border-b-gray-300">
					<h1 className="mb-4">Hello, {user.name} 👋🏻</h1>
					<h2>Welcome to your dashboard</h2>
				</div>
				<div className="mt-12">
					<h2 className="text-center mb-8">
						Registered e-mail :{" "}
						<span className="text-base sm:text-xl md:text-2xl">{user.email}</span>
					</h2>
					<div className="flex flex-col gap-2 items-center justify-center">
						<Link to="/notes" className="description">
							<strong>Total Notes : </strong> {totalNotes}
						</Link>
						<Link to="/notes" className="description">
							<strong>Important Notes : </strong> {totalImportantNotes}
						</Link>
					</div>
				</div>
				<div>
					<Link
						to="/user/update"
						className="primary_button ml-auto block w-[14em] mt-16 scale-90 xs:scale-100"
					>
						Update Info
					</Link>
					<button
						className="danger_button ml-auto block w-[14em] mt-6 scale-90 xs:scale-100"
						onClick={handleLogout}
					>
						Logout
					</button>
					<button
						className="danger_button ml-auto block w-[14em] mt-6 scale-90 xs:scale-100"
						onClick={handleDeleteAccount}
					>
						Delete Account
					</button>
				</div>
			</div>
		</section>
	);
};

export default Dashboard;
