import { Spacer } from '@nextui-org/spacer'
import {title, subtitle} from "@/components/primitives";
import { HomeButton } from "@/components/tft/buttons"
 
export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
			<div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title({color: "violet"})}>Page Not Found</h1>
        <h1 className={subtitle()}>Could not find requested resource</h1>
        <Spacer y={10}/>
        <HomeButton/>
      </div>
    </section>
  )
}