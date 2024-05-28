import classNames from 'classnames'
import { Link } from 'react-router-dom'
import path from 'src/constant/path'

interface Props {
  number: string
  name: string
  createAt: string
  isDanger?: Boolean
}

export default function ApprovalItem({ number, name, createAt, isDanger }: Props) {
  return (
    <Link to={`${path.approval}/1`}>
      <div
        className={classNames('p-3 mb-4 shadow-sm rounded-md text-white grid grid-cols-8 transition hover:scale-105', {
          'bg-red-400': isDanger,
          'bg-sky-300': !isDanger
        })}
      >
        <div className='col-span-1 border-r-2'>{number}</div>
        <div className='col-span-4 border-r-2 pl-3'>{name}</div>
        <div className='col-span-3 pl-4'>{createAt}</div>
      </div>
    </Link>
  )
}
