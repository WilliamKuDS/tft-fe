'use client'
import {useForm, SubmitHandler, Controller} from "react-hook-form"
import {Input} from "@nextui-org/react";
import {Select, SelectItem} from "@nextui-org/select";
import {regions} from "@/app/tft/search/data";
import {Spacer} from "@nextui-org/spacer";
import {QueryButton, SearchButton} from "@/components/tft/buttons";
import {GetPlayer} from "@/components/django_api";
import {useState} from "react";

interface IFormInput {
    player_name: string
    player_tag: string
    player_region: string
}


export default function PlayerForm() {
    const [playerData, setPlayerData] = useState()
    const {control, handleSubmit} = useForm({
        defaultValues: {
            player_name: "",
            player_tag: "",
            player_region: "",
        },
    })

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const rawFormData = {
            player_name: data['player_name'] + '-' + data['player_tag'],
            region: data['player_region'],
        }
        const response = await GetPlayer(rawFormData, true)

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-input">
                <Controller
                    name="player_name"
                    control={control}
                    render={({field}) =>
                        <Input {...field}
                               type="text"
                               label="Player Name"
                               placeholder="Enter Player Name"
                               className="max-w-xs"
                               variant="underlined"
                        />}
                />
                <Controller
                    name="player_tag"
                    control={control}
                    render={({field}) =>
                        <Input {...field}
                               type="text"
                               label="Player Tag"
                               variant="underlined"
                               placeholder="Enter Player Tag"
                               className="max-w-xs"
                        />}
                />
                <Controller
                    name="player_region"
                    control={control}
                    render={({field}) => (
                        <Select
                            {...field}
                            label="Player Region"
                            placeholder="Select a region"
                            className="max-w-xs"
                            variant="underlined"
                        >
                            {regions.map((region) => (
                                <SelectItem key={region.value} value={region.value}>
                                    {region.label}
                                </SelectItem>
                            ))}
                        </Select>
                    )}
                />
            </div>
            <Spacer y={5}/>
            <div className='inline'>
                    <SearchButton/>
                    <Spacer x={1}/>
                    <QueryButton/>
            </div>
        </form>
    )
}