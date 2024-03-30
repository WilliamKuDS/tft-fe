'use server'
import {title, subtitle} from "@/components/primitives";
import MLForm from "@/components/tft/ml/gameboard";
import {Spacer} from "@nextui-org/spacer";

export default async function Home() {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Machine Learning with&nbsp;</h1>
                <h1 className={title({color: "violet"})}>TFT&nbsp;</h1>
                <br/>
            </div>
            <Spacer y={10}/>
            <MLForm/>
        </section>
    );
}
