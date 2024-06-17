'use client'
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
  } from "@nextui-org/table";
import { useEffect, useState } from "react";
import { GetAugmentsByPatch } from "@/components/tft/django_api/augment_api";
import { GetUnitsByPatch } from "@/components/tft/django_api/units_api";

const getKeyValue = (obj: any, key: string) => {
  return obj[key];
};

export function DatabaseTableAugments({patch}: {patch: string | undefined}) {
  const [augmentData, setAugmentData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false)
  console.log(patch)
  
  useEffect(() => {
    if (patch !== undefined) {
      const fetchData = async () => {
          try {
              const response = await GetAugmentsByPatch({patch});
              setAugmentData(response);
          } catch (error) {
              console.error(error);
          }
      };
        fetchData();
    }
    else {
      setAugmentData([])
    }
  }, [patch]);

  console.log(augmentData)
  return (
    <p>teheh</p>
    // <Table aria-label="Example table with dynamic content">
    //   <TableHeader columns={columns}>
    //     {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
    //   </TableHeader>
    //   <TableBody items={rows}>
    //     {(item) => (
    //       <TableRow key={item.key}>
    //         {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
    //       </TableRow>
    //     )}
    //   </TableBody>
    // </Table>
  );
}

export function DatabaseTableUnits({patch}: {patch: string | undefined}) {
  const [unitsData, setUnitsData] = useState<any[]>([]);
  const [columns, setColumns] = useState<{ key: string, label: string }[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    if (patch !== undefined) {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await GetUnitsByPatch({ patch });
                setUnitsData(response);

                if (response.length > 0) {
                    // Dynamically create columns based on the keys of the first object
                    const keys = Object.keys(response[0]);
                    const dynamicColumns = keys.map(key => ({ key, label: key }));
                    setColumns(dynamicColumns);
                } else {
                    setColumns([]);
                }
            } catch (error) {
                setError("Failed to fetch data");
                console.error(error);
            }
            setLoading(false);
        };
        fetchData();
    } else {
        setUnitsData([]);
        setColumns([]);
    }
  }, [patch]);

  return (
    <div className="flex justify-center items-center gap-2.5">
          {loading ? (
              <p>Loading...</p>
          ) : error ? (
              <p>{error}</p>
          ) : columns.length === 0 ? (
              <p>No data available</p>
          ) : (
              <Table aria-label="Example table with dynamic content">
                  <TableHeader columns={columns}>
                      {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                  </TableHeader>
                  <TableBody items={unitsData}>
                      {(item) => (
                          <TableRow key={item.api_name || item.id || Math.random()}>
                              {(columnKey) => <TableCell>{getKeyValue(item, columnKey.toString())}</TableCell>}
                          </TableRow>
                      )}
                  </TableBody>
              </Table>
          )}
      </div>
  );
}
