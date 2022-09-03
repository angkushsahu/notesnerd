import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loading, Protected } from "./components";
import { NoteProvider } from "./store";
const Home = lazy(() => import("./pages/home"));
const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const ForgotPassword = lazy(() => import("./pages/forgotPassword"));
const ResetPassword = lazy(() => import("./pages/resetPassword"));
const CreateNote = lazy(() => import("./pages/createNote"));
const ShowAllNotes = lazy(() => import("./pages/showAllNotes"));
const ShowAllImportantNotes = lazy(() => import("./pages/showAllImportantNotes"));
const UpdateNote = lazy(() => import("./pages/updateNote"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const UpdateUser = lazy(() => import("./pages/updateUser"));
const Error = lazy(() => import("./pages/error"));

const App = () => {
	return (
		<main className="root">
			<NoteProvider>
				<BrowserRouter>
					<Suspense fallback={<Loading />}>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/signup" element={<Signup />} />
							<Route path="/forgot-password" element={<ForgotPassword />} />
							<Route path="/reset-password/:id" element={<ResetPassword />} />
							<Route
								path="/note/create"
								element={
									<Protected>
										<CreateNote />
									</Protected>
								}
							/>
							<Route
								path="/notes"
								element={
									<Protected>
										<ShowAllNotes />
									</Protected>
								}
							/>
							<Route
								path="/notes/important"
								element={
									<Protected>
										<ShowAllImportantNotes />
									</Protected>
								}
							/>
							<Route
								path="/note/update/:id"
								element={
									<Protected>
										<UpdateNote />
									</Protected>
								}
							/>
							<Route
								path="/dashboard"
								element={
									<Protected>
										<Dashboard />
									</Protected>
								}
							/>
							<Route
								path="/user/update"
								element={
									<Protected>
										<UpdateUser />
									</Protected>
								}
							/>
							<Route path="/*" element={<Error />} />
						</Routes>
					</Suspense>
				</BrowserRouter>
			</NoteProvider>
			<ToastContainer />
		</main>
	);
};

export default App;
