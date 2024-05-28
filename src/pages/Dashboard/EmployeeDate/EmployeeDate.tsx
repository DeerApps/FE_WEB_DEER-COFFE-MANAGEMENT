import React, { useState } from 'react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue
} from '@nextui-org/react'
import { users } from './data'

export default function EmployeeDate() {
  const [page, setPage] = useState(1)
  const rowsPerPage = 8

  const pages = Math.ceil(users.length / rowsPerPage)

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return users.slice(start, end)
  }, [page, users])

  return (
    <Table
      aria-label='Example table with client side pagination'
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='primary'
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      fullWidth
      classNames={{
        wrapper: 'min-h-[420px]'
      }}
    >
      <TableHeader className='grid grid-cols-5 grid-rows-5'>
        <TableColumn align='center' key='name'>
          NAME
        </TableColumn>
        <TableColumn align='center' key='role'>
          <div className='flex justify-start'>ROLE</div>
        </TableColumn>
        <TableColumn align='center' key='status'>
          STATUS
        </TableColumn>
      </TableHeader>
      <TableBody items={items} className='pb-0!'>
        {(item) => (
          <TableRow key={item.name}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  )
}
