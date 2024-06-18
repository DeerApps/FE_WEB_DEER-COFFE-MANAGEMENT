import classNames from 'classnames'

interface Props {
  number: string
  name: string
  createAt: string
  formType: string
  isDanger?: Boolean
  handleClick: () => void
}

export default function ApprovalItem({ number, name, createAt, formType, isDanger, handleClick }: Props) {
  return (
    <button
      onClick={handleClick}
      className={classNames('p-3 mb-2 shadow-sm rounded-md  grid grid-cols-8 w-full transition hover:scale-105', {
        'bg-red-400 text-white': isDanger,
        'bg-gray-400/50 text-gray-600': !isDanger
      })}
    >
      <div className='col-span-1 border-r-2'>{number}</div>
      <div className='col-span-3 border-r-2 truncate'>{name}</div>
      <div className='col-span-2 border-r-2'>{formType}</div>
      <div className='col-span-2 pl-4 truncate'>{createAt}</div>
    </button>
  )
}
