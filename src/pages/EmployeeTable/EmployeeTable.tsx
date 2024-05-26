import React from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from '@nextui-org/react'

import { UserType, columns, users } from './data'
import EyeIcon from 'src/pages/EmployeeTable/EyeIcon'
import EditIcon from 'src/pages/EmployeeTable/EditIcon'
import DeleteIcon from 'src/pages/EmployeeTable/DeleteIcon'

const statusColorMap = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning'
}

type ColorType = 'success' | 'danger' | 'warning' | 'default' | 'primary' | 'secondary' | undefined

type ColumnKey = keyof UserType | 'actions'

export default function EmployeeTable() {
  const renderCell = React.useCallback((user: UserType, columnKey: ColumnKey) => {
    const cellValue = user[columnKey as Exclude<ColumnKey, 'actions'>]

    switch (columnKey) {
      case 'name':
        return (
          <User avatarProps={{ radius: 'lg', src: user.avatar }} description={user.email} name={cellValue}>
            {user.email}
          </User>
        )
      case 'role':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize'>{cellValue}</p>
            <p className='text-bold text-sm capitalize text-default-400'>{user.team}</p>
          </div>
        )
      case 'status':
        const color = statusColorMap[user.status]
        return (
          <Chip className='capitalize' color={color as ColorType} size='sm' variant='flat'>
            {cellValue}
          </Chip>
        )
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Details'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content='Edit user'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color='danger' content='Delete user'>
              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        )
      default:
        return cellValue
    }
  }, [])

  return (
    <Table aria-label='Example table with custom cells'>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === 'actions' ? 'center' : 'start'}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={users as UserType[]}>
        {(item: UserType) => (
          <TableRow key={item.id}>{(columnKey: any) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  )
}
