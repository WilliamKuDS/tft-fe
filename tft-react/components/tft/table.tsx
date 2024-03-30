// 'use client'
// import React from "react";
// import {
//     Table,
//     TableHeader,
//     TableBody,
//     TableColumn,
//     TableRow,
//     TableCell, getKeyValue
// } from "@nextui-org/table";
// import {Accordion, AccordionItem} from "@nextui-org/accordion";
// import {Tooltip} from "@nextui-org/tooltip";
//
//
// const columns = [
//     {name: "GAMEID", uid: "game_id"},
//     {name: "QUEUE", uid: "queue"},
//     {name: "LOBBYRANK", uid: "lobby_rank"},
//     {name: "ACTIONS", uid: "actions"},
// ];
//
// export default function Old_gameTable(playerGames) {
//     const games = playerGames.playerGames
//     const renderCell = React.useCallback((user, columnKey) => {
//         const cellValue = user[columnKey];
//         switch (columnKey) {
//             case "actions":
//                 return (
//                     <div className="relative flex items-center gap-2">
//                         <Tooltip content="Expand">
//                                           <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
//                             <AccordionItem aria-label="Accordion 1" title="Accordion 1"> fuck front end
//                             </AccordionItem>
//                                           </span>
//                         </Tooltip>
//                     </div>
//                 );
//             default:
//                 return cellValue;
//         }
//     }, []);
//
//     return (
//         <Table aria-label="Example table with dynamic content">
//             <TableHeader columns={columns}>
//                 {(column) => (
//                     <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
//                         {column.name}
//                     </TableColumn>
//                 )}
//             </TableHeader>
//             <TableBody items={games}>
//                 {(item) => (
//                     <TableRow key={item.game_id}>
//                         {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
//                     </TableRow>
//                 )}
//             </TableBody>
//         </Table>
//     );
// }
