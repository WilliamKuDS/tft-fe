'use client';

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell
} from "@nextui-org/table";
import { useCallback, useEffect, useRef, useState } from "react";
import { GetAugmentsByPatch } from "@/components/tft/django_api/augment_api";
import { GetUnitsByPatch } from "@/components/tft/django_api/unit_api";
import { GetTraitsByPatch } from "@/components/tft/django_api/trait_api";
import { GetItemsByPatch } from "@/components/tft/django_api/item_api";
import { Spinner } from "@nextui-org/spinner";

function flattenObject(obj: any, prefix = ''): any {
  return Object.keys(obj).reduce((acc: any, k: string) => {
    const pre = prefix.length ? prefix + '.' : '';
    if (Array.isArray(obj[k])) {
      acc[pre + k] = JSON.stringify(obj[k]);
    } else {
      acc[pre + k] = obj[k];
    }
    return acc;
  }, {});
}

const ROWS_PER_FETCH = 20;

function useDatabaseTable(patch: string | undefined, fetchFunction: Function) {
  const [data, setData] = useState<any[]>([]);
  const [columns, setColumns] = useState<{ key: string, label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
  }, [patch]);

  useEffect(() => {
    if (patch === undefined) {
      setData([]);
      setColumns([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFunction({ patch, page, pageSize: ROWS_PER_FETCH });
        const newData = response.results.map((item: any) => flattenObject(item));

        setData(prevData => [...prevData, ...newData]);
        setHasMore(response.results.length === ROWS_PER_FETCH);

        const excludedKeys = ['api_name', 'icon'];
        if (page === 1 && newData.length > 0) {
          const keys = Object.keys(newData[0]).filter(key => !excludedKeys.includes(key));
          setColumns(keys.map(key => ({ key, label: key })));
        }
      } catch (error) {
        setError("Failed to fetch data");
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, [patch, page]);

  return { data, columns, loading, error, lastElementRef };
}

export function DatabaseTableAugments({ patch }: { patch: string | undefined }) {
  const { data, columns, loading, error, lastElementRef } = useDatabaseTable(patch, GetAugmentsByPatch);

  return (
    <div className="overflow-hidden w-full">
      {patch === undefined ? (
        <p>Please select a patch</p>
      ) : error ? (
        <p>{error}</p>
      ) : columns.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Table aria-label="Augment Table" className="w-full">
            <TableHeader>
              {columns.map(column => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id || item.api_name || index}>
                  {columns.map(column => (
                    <TableCell key={column.key}>
                      {typeof item[column.key] === 'object'
                        ? JSON.stringify(item[column.key])
                        : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <Spinner />}
          <div ref={lastElementRef} style={{ height: '20px' }}></div>
        </>
      )}
    </div>
  );
}

export function DatabaseTableItems({ patch }: { patch: string | undefined }) {
  const { data, columns, loading, error, lastElementRef } = useDatabaseTable(patch, GetItemsByPatch);

  return (
    <div className="flex flex-col gap-4">
      {patch === undefined ? (
        <p>Please select a patch</p>
      ) : error ? (
        <p>{error}</p>
      ) : columns.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Table aria-label="Item Table">
            <TableHeader>
              {columns.map(column => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id || item.api_name || index}>
                  {columns.map(column => (
                    <TableCell key={column.key}>
                      {typeof item[column.key] === 'object'
                        ? JSON.stringify(item[column.key])
                        : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <Spinner />}
          <div ref={lastElementRef} style={{ height: '20px' }}></div>
        </>
      )}
    </div>
  );
}

export function DatabaseTableTraits({ patch }: { patch: string | undefined }) {
  const { data, columns, loading, error, lastElementRef } = useDatabaseTable(patch, GetTraitsByPatch);

  return (
    <div className="flex flex-col gap-4">
      {patch === undefined ? (
        <p>Please select a patch</p>
      ) : error ? (
        <p>{error}</p>
      ) : columns.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Table aria-label="Trait Table">
            <TableHeader>
              {columns.map(column => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id || item.api_name || index}>
                  {columns.map(column => (
                    <TableCell key={column.key}>
                      {typeof item[column.key] === 'object'
                        ? JSON.stringify(item[column.key])
                        : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <Spinner />}
          <div ref={lastElementRef} style={{ height: '20px' }}></div>
        </>
      )}
    </div>
  );
}

export function DatabaseTableUnits({ patch }: { patch: string | undefined }) {
  const { data, columns, loading, error, lastElementRef } = useDatabaseTable(patch, GetUnitsByPatch);

  return (
    <div className="flex flex-col gap-4">
      {patch === undefined ? (
        <p>Please select a patch</p>
      ) : error ? (
        <p>{error}</p>
      ) : columns.length === 0 ? (
        <Spinner />
      ) : (
        <>
          <Table aria-label="Unit Table">
            <TableHeader>
              {columns.map(column => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={item.id || item.api_name || index}>
                  {columns.map(column => (
                    <TableCell key={column.key}>
                      {typeof item[column.key] === 'object'
                        ? JSON.stringify(item[column.key])
                        : item[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <Spinner />}
          <div ref={lastElementRef} style={{ height: '20px' }}></div>
        </>
      )}
    </div>
  );
}
