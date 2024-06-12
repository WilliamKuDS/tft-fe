'use client'
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/table";
import React, { useEffect, useState } from "react";
import {GameAccordion} from "@/components/tft/player/game-accordion";
import { GetBasicPlayerMatchDataFromPUUIDRegion } from "../django_api";
import { Spinner } from "@nextui-org/spinner";
  
interface MatchData {
    match_id: string;
    puuid: string;
    game_creation: string;
    placement: number;
    lobby_rank: string | null;
    patch: string;
    companion_icon: string;
}
  
export function GameTable({ puuid, region }: { puuid: string, region: string }) {
    const [matchData, setMatchData] = useState<MatchData[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false); 
    const [hasMoreData, setHasMoreData] = useState(true);
    const fetchedMatchIds = new Set<string>();
    const [showEmptyContent, setShowEmptyContent] = useState(false);

    useEffect(() => {
        const fetchItems = async () => {
          if (!hasMoreData) return;

          setLoading(true);
          try {
            const fetchedData = await GetBasicPlayerMatchDataFromPUUIDRegion(puuid, region, page);
            if (fetchedData === null || fetchedData.length === 0) {
                setHasMoreData(false); 
                return;
            }

            const newMatches = fetchedData.filter((match: { match_id: string; }) => !fetchedMatchIds.has(match.match_id));
            newMatches.forEach((match: { match_id: string; }) => fetchedMatchIds.add(match.match_id));
            setMatchData((prevItems) => [...prevItems, ...newMatches]);

          } catch (error) {
            console.error("Error fetching items:", error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchItems();
      }, [page, puuid, region]);

    useEffect(() => {
        if (loading) {
          const timeout = setTimeout(() => {
            setShowEmptyContent(true);
          }, 1000); // Delay of 1 second
    
          return () => clearTimeout(timeout);
        } else {
          setShowEmptyContent(false);
        }
      }, [loading]);

    useEffect(() => {
        const onscroll = () => {
            const scrolledTo = window.scrollY + window.innerHeight;
            const threshold = 100;
            const isReachBottom = document.body.scrollHeight - threshold <= scrolledTo;

            if (isReachBottom && !loading && hasMoreData) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        window.addEventListener("scroll", onscroll);
        return () => {
          window.removeEventListener("scroll", onscroll);
        };
      }, [loading, hasMoreData])

    return (
        <Table hideHeader removeWrapper isCompact layout='fixed' aria-label="GameTable">
            <TableHeader>
                <TableColumn>Games</TableColumn>
            </TableHeader>
            <TableBody items={matchData} emptyContent={showEmptyContent ? "No games to display." : <Spinner label="Loading..." color="warning" />}>
                {(item: any) => (
                    <TableRow key={item.match_id}>
                        <TableCell>
                            <GameAccordion gameData={item}/>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}