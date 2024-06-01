export default function TFTTableLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="custom-inline-block max-w-2xl text-center justify-center">
				{children}
			</div>
		</section>
	);
}
