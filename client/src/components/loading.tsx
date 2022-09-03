const Loading = () => {
	return (
		<section className="min-h-screen flex flex-col gap-8 items-center justify-center">
			<div className="animate-spin h-16 w-16 bg-primary rounded-xl"></div>
			<p className="description font-semibold animate-pulse duration-75">Loading ....</p>
		</section>
	);
};

export default Loading;
