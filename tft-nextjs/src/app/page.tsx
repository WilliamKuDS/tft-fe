import { title, subtitle } from "@/components/primitives";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Welcome to</h1>
				<h1 className={title({ color: "violet" })}>williamku.dev</h1>
				<h1 className={subtitle()}>Enjoy your stay, I guess</h1>
				<br />
			</div>
		</section>
	);
}