'use server'
import {title} from "@/components/primitives";
import PlayerForm from "@/components/tft/form"
import {Spacer} from "@nextui-org/spacer";

export default async function TFTPage() {
    return (
        <div className="inline-block max-w-lg text-center justify-center">
            <Spacer y={10}/>
            <Spacer y={10}/>
            <Spacer y={10}/>
            <h1 className={title()}>Find TFT Player</h1>
            <Spacer y={10}/>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                <PlayerForm/>
            </div>
        </div>
    );
}
