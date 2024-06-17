import { title, subtitle } from "@/components/primitives";
import { Spacer } from "@nextui-org/spacer";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>TFT Database&nbsp;</h1>
                <h1 className={subtitle()}>From Set 1 to Latest Set</h1>
                <Spacer y={10}/>
				<h1 className={title({ color: "violet" })}>WIP :)&nbsp;</h1>
				<br />
			</div>
		</section>
	);
}
