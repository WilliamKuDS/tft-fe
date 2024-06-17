'use client'
import {GetDetailedPlayerMatchDataFromPUUIDRegion} from "@/components/tft/django_api";
import React, {useEffect} from "react";
import {
    Card,
    CardHeader,
    CardBody,
} from "@nextui-org/card";
import {Image} from "@nextui-org/image"
import {Tooltip} from "@nextui-org/tooltip"
import {Spacer} from "@nextui-org/spacer";
import { Divider } from "@nextui-org/divider";
import { Spinner } from "@nextui-org/spinner";


export function GameCard({match_id, puuid}: {match_id: string, puuid: string}) {
    const [game, setGame] = React.useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetDetailedPlayerMatchDataFromPUUIDRegion(match_id, puuid);
                setGame(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [match_id, puuid]);

    if (!game) {
        return (
            <Spinner label="Loading..." color="warning" />
        )
    }
    return (
        <Card isBlurred shadow="none">
            <CardBody>
                <Divider orientation='horizontal'/>
                <Spacer y={1}/>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <SummaryContainer matchInfo={game.match_info} summonerMatchInfo={game.summoner_match_data}/>
                    <div>
                        <TraitContainer data={game.summoner_match_data.traits}/>
                        <Spacer y={2}/>
                        <AugmentContainer data={game.summoner_match_data.augments}/>
                    </div>
                </div>
                <Spacer y={5}/>
                <Spacer y={10}/>
                <UnitContainer data={game.summoner_match_data.units}/>
            </CardBody>
        </Card>
    );
}

function SummaryContainer(data: any) {
    return (
        <div style={{marginRight: 'auto'}}>
            <p>Level: {data.summonerMatchInfo.level}</p>
            <p>Round: {data.summonerMatchInfo.last_round}</p>
            <p>Time Eliminated: {Math.round(data.summonerMatchInfo.time_eliminated/60)}</p>
            <p>Gold Left: {data.summonerMatchInfo.gold_left}</p>
            <p>Players Eliminated: {data.summonerMatchInfo.players_eliminated}</p>
            <p>Total Damage: {data.summonerMatchInfo.total_damage_to_players}</p>
        </div>
    )
}

function TraitContainer(data: any) {
    return (
        <div style={{display: "flex", flexDirection: "row", marginLeft: 'auto'}}>
            {data.data.map((trait: any, index: number) => (
                <div key={index} style={{margin: "auto", marginRight: "10px"}}>
                    <div className="flex items-center space-x-1">
                        <p>{trait.num_units}</p>
                        <Tooltip content={trait.display_name}>
                            <Image
                                alt={`Trait ${index}`}
                                src={`/tft/traits/${trait.icon}.png`}
                                width={12}
                                height={12}
                            />
                        </Tooltip>
                    </div>
                </div>
            ))}
        </div>
    )
}

function AugmentContainer(data: any) {
    return (
        <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: "4px"}}>
            {data.data.map((augment: any, index: number) => (
                <div key={index}>
                    <Tooltip content={augment.display_name}>
                        <Image
                            alt={`Augment ${augment.name}`}
                            src={`/tft/augments/${augment.icon}.png`}
                            width={40}
                            height={40}
                        />
                    </Tooltip>
                </div>
            ))}
        </div>
    )
}

function UnitContainer(data: any) {
    const getBorderStyle = (cost: number) => {
        switch (cost) {
          case 1:
            return { border: '1px solid gray' };
          case 2:
            return { border: '1px solid green' };
          case 3:
            return { border: '1px solid blue' };
          case 4:
            return { border: '1px solid purple' };
          case 5:
            return { border: '1px solid gold' };
          default:
            return {};
        }
    }

    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            {data.data.map((unit: any, index: number) => (
                <div key={index} style={{margin: "auto", textAlign: "center"}} >
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <WhichStarIcon tier={unit.tier}/>
                        <Tooltip content={unit.display_name}>
                            <Image
                                alt={`Unit ${unit.name}`}
                                src={`/tft/champions/${unit.icon}.png`}
                                loading='lazy'
                                className="w-[50px] h-[50px] object-cover object-[85%_center] rounded-[10px]"
                                style={getBorderStyle(unit.cost)}
                            />
                        </Tooltip>
                        <div style={{display: "flex", flexDirection: "row", height: 15, width: 45}}>
                            <UnitItemContainer data={unit.items}/>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

function UnitItemContainer(data: any) {
    if (data.data.length == 0) {
        return (
            <></>
        )
    } else {
        return (
            data.data.map((item: any, index: number) => (
                <div key={index} style={{margin: "auto"}}>
                    <Tooltip content={item.display_name}>
                        <Image
                            alt={`Item ${item.name}`}
                            src={`/tft/items/${item.icon}`}
                            width={15}
                            height={15}
                        />
                    </Tooltip>
                </div>
            ))

        )
    }
}

function WhichStarIcon(tier: any) {
    switch (tier.tier) {
        case 1:
          return (<Image src="/tft/stars/1-bronze-star.svg" alt="1-Star" width={12} height={12} />)
        case 2:
          return (<Image src="/tft/stars/2-silver-stars.svg" alt="2-Star" width={24} height={12} />)
        case 3:
          return (<Image src="/tft/stars/3-gold-stars.svg" alt="3-Star" width={36} height={12} />)
        case 4:
          return (<Image src="/tft/stars/4-emerald-stars.svg" alt="4-Star" width={48} height={12} />)
        default:
          return (<Image alt="0-Star"></Image>);
      }
}