'use server'
import {title} from "@/components/primitives";
import {Spacer} from "@nextui-org/spacer";
import SearchPlayerForm from "@/components/tft/search/form"

export default async function TFTPage() {
    return (
        <div className="w-full max-w-lg text-center mx-auto">
            <Spacer y={10}/>
            <Spacer y={10}/>
            <h1 className={title()}>Search TFT Player</h1>
            <SearchPlayerForm/>
        </div>
    );
}
