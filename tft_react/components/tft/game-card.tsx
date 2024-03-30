'use client'
import {GetPlayerGames} from "@/components/django_api";
import React, {useEffect} from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Image,
    Tooltip
} from "@nextui-org/react";
import {Spacer} from "@nextui-org/spacer";


export function GameCard(data: any) {
    const [game, setGame] = React.useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetPlayerGames(data.player_id, data.game_id);
                setGame(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [data.player_id, data.game_id]);

    if (!game) {
        return (
            <></>
        )
    }
    return (
        <Card isBlurred fullWidth='true' shadow="none">
            {/*<CardHeader className="flex gap-3">*/}
            {/*    <Image*/}
            {/*        alt="playericon"*/}
            {/*        height={40}*/}
            {/*        radius="sm"*/}
            {/*        src={game.icon}*/}
            {/*        width={40}*/}
            {/*    />*/}
            {/*    <div className="flex flex-col">*/}
            {/*        <p className="text-md">{pathList[4]}</p>*/}
            {/*        <p className="text-small text-default-500">{game.date}</p>*/}
            {/*    </div>*/}
            {/*</CardHeader>*/}
            {/*<Divider/>*/}
            <CardBody>
                <div style={{display: "flex", flexDirection: "row"}}>
                    <SummaryContainer level={game.level} round={game.round} length={game.length}/>
                    <div>
                        <TraitContainer data={game.game_trait_id}/>
                        <Spacer y={2}/>
                        <AugmentContainer data={game.augment_id}/>
                    </div>
                </div>
                <Spacer y={5}/>

                <Spacer y={10}/>
                <UnitContainer data={game.game_unit_id}/>
            </CardBody>
            {/*<Divider/>*/}
            {/*<CardFooter>*/}
            {/*</CardFooter>*/}
        </Card>
    );
}

function SummaryContainer(data: any) {
    return (
        <div style={{marginRight: 'auto'}}>
            <p>Level: {data.level}</p>
            <p>Round: {data.round}</p>
            <p>Length: {data.length}</p>
        </div>
    )
}

function TraitContainer(data: any) {
    return (
        <div style={{display: "flex", flexDirection: "row", marginLeft: 'auto'}}>
            {data.data.map((trait: any[], index: number) => (
                <div key={index} style={{margin: "auto", marginRight: "10px"}}>
                    <div className="flex items-center space-x-1">
                        <p>{trait[1]}</p>
                        <Tooltip content={trait[0]}>
                            <Image
                                alt={`Trait ${index}`}
                                src={trait[2]}
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
        <div style={{display: "flex", flexDirection: "row"}}>
            {data.data.map((augment: any[], index: number) => (
                <div key={index} style={{margin: "auto", marginLeft: "auto"}}>
                    <Tooltip content={augment[0]}>
                        <Image
                            alt={`Augment ${index}`}
                            src={augment[1]}
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
    return (
        <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            {data.data.map((unit: any[], index: number) => (
                <div key={index} style={{margin: "auto", height: 45, width:45}}>
                    <Tooltip content={unit[0]}>
                        <Image
                            alt={`Unit ${index}`}
                            src={unit[3]}
                            loading='lazy'
                            // width={100}
                            // height={100}
                        />
                    </Tooltip>
                    <div style={{display: "flex", flexDirection: "row", height: 15, width: 45}}>
                        <UnitItemContainer data={unit[2]}/>
                    </div>
                    {/*<p>{unit[0]}: {unit[1]}</p>*/}
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
            data.data.map((item: any[], index: number) => (
                <div key={index} style={{margin: "auto"}}>
                    <Tooltip content={item[0]}>
                        <Image
                            alt={`Item ${item[0]}`}
                            src={item[1]}
                            width={15}
                            height={15}
                        />
                    </Tooltip>
                </div>
            ))

        )
    }
}