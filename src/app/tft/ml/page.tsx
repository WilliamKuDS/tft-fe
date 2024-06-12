import React from 'react';
import HexGrid from '@/components/tft/ml/tft_board';
import UnitList from '@/components/tft/ml/unit_list';
import ItemList from '@/components/tft/ml/item_list';
import {title, subtitle} from "@/components/primitives";
import {Spacer} from "@nextui-org/spacer";

export default async function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <h1 className={title()}>Simulate a Board in</h1>
        <h1 className={title({color: "violet"})}>Teamfight Tactics</h1>
        <Spacer y={10} />
        <h1 className={title({color: "cyan"})}>Win Rate: </h1>
      </div>
      <Spacer y={10} />
      <div className="flex flex-row items-center" >
          <UnitList/>
          <HexGrid rows={4} cols={7} size={80} />
          <ItemList/>
      </div>
    </div>
  );
}
