// "use server";
//
// import {Input} from "@nextui-org/input";
// import {Select, SelectItem} from "@nextui-org/select";
// import {regions} from "@/app/tft/data";
// import {Spacer} from "@nextui-org/spacer";
// import {Buttons} from "@/components/submit-button";
//
//
// export const PlayerForm = () => {
//     const searchPlayerName = django_api.bind(onformdata)
//     return (
//         <form onSubmit={searchPlayerName}>
//             <div className="d-input">
//                 <Input
//                     type="text"
//                     label="Player Name"
//                     name="player_name"
//                     variant="bordered"
//                     placeholder="Enter Player Name"
//                     className="max-w-xs"
//                 />
//                 <Input
//                     type="text"
//                     label="Player Tag"
//                     name="player_tag"
//                     variant="bordered"
//                     placeholder="Enter Player Tag"
//                     className="max-w-xs"
//                 />
//                 <Select
//                     label="Select a region"
//                     name="player_region"
//                     defaultSelectedKeys={["[region]"]}
//                     className="max-w-xs"
//                 >
//                     {regions.map((region) => (
//                         <SelectItem key={region.value} value={region.value}>
//                             {region.label}
//                         </SelectItem>
//                     ))}
//                 </Select>
//             </div>
//             <Spacer y={5}/>
//                 <Buttons/>
//         </form>
//
//     );
// };