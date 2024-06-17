import { title, subtitle } from "@/components/primitives";
import DatabaseSelect from "@/components/tft/database/database-header";
import { DatabaseTableUnits } from "@/components/tft/database/database-table";
import { GetAllPatches } from "@/components/tft/django_api/patch_api";
import { GetAllSets } from "@/components/tft/django_api/set_api";
import { Spacer } from "@nextui-org/spacer";

export default async function Home() {
	const setData = await GetAllSets()
	const patchData = await GetAllPatches()
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center w-full">
				<h1 className={title()}>TFT Database&nbsp;</h1>
                <h1 className={subtitle()}>From Set 1 to the Latest Set</h1>
                <Spacer y={10}/>
				<h1 className={title({ color: "violet" })}>WIP :)&nbsp;</h1>
				<Spacer y={10}/>
				<br />
			</div>
			<DatabaseSelect setData={setData} patchData={patchData}/>
		</section>
	);
}
