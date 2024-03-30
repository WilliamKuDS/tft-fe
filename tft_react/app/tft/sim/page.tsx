'use server'
import { title, subtitle } from "@/components/primitives";

export  default async function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Simulate a&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>TFT Board&nbsp;</h1>
				<br />
			</div>
		</section>
	);
}
