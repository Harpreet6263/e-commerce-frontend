import React, { useEffect, useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table" // adjust path if different
import { Skeleton } from "@/components/ui/skeleton" // or your own skeleton

export default function DataTable({ columns, tableData, apiHit }) {
  const [isLoading, setIsLoading] = useState(!apiHit)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (!apiHit) {
      setFadeOut(true)
      setTimeout(() => setIsLoading(false), 500)
    } else {
      setIsLoading(true)
      setFadeOut(false)
    }
  }, [apiHit])

  return (
    <Table
      className={`transition-opacity duration-500`}
    >
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key} className="text-gray-800 text-base font-bold">
              {column.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {(isLoading
          ? Array.from({ length: 10 }, (_, index) => ({ id: `skeleton-${index}` }))
          : tableData
        ).map((item, index) => (
          <TableRow key={item.id || `row-${index}`}>
            {columns.map((column, colIndex) => (
              <TableCell key={column.key || `cell-${colIndex}`}>
                {isLoading ? (
                  <Skeleton
                    className={`h-8 w-full rounded-md bg-gray-300 dark:bg-gray-700 transition-all duration-500 ${
                      fadeOut ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                  />
                ) : column.transform ? (
                  column.transform(item[column.key], item)
                ) : (
                  item[column.key] || "-"
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
