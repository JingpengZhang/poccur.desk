import React from "react";

interface Props {
  onClick?: (icon: string) => void
}

const IconList: React.FC<Props> = (props) => {

  const icons = [
    'bi bi-0-circle', 'bi bi-0-circle-fill', 'bi bi-0-square', 'bi bi-0-square-fill',
    'bi bi-1-circle', 'bi bi-1-circle-fill', 'bi bi-1-square', 'bi bi-1-square-fill',
    'bi bi-2-circle', 'bi bi-2-circle-fill', 'bi bi-2-square', 'bi bi-2-square-fill',
    'bi bi-3-circle', 'bi bi-3-circle-fill', 'bi bi-3-square', 'bi bi-3-square-fill',
    'bi bi-4-circle', 'bi bi-4-circle-fill', 'bi bi-4-square', 'bi bi-4-square-fill',
    'bi bi-5-circle', 'bi bi-5-circle-fill', 'bi bi-5-square', 'bi bi-5-square-fill',
    'bi bi-6-circle', 'bi bi-6-circle-fill', 'bi bi-6-square', 'bi bi-6-square-fill',
    'bi bi-7-circle', 'bi bi-7-circle-fill', 'bi bi-7-square', 'bi bi-7-square-fill',
    'bi bi-8-circle', 'bi bi-8-circle-fill', 'bi bi-8-square', 'bi bi-8-square-fill',
    'bi bi-9-circle', 'bi bi-9-circle-fill', 'bi bi-9-square', 'bi bi-9-square-fill',
  ]

  return (
      <ul className='w-full h-48 grid grid-cols-8 icon-list overflow-y-auto'>
        {
          icons.map(icon =>
              <li key={icon}
                  onClick={() => props.onClick && props.onClick(icon)}
                  className='w-full aspect-square flex items-center justify-center border-l border-b hover:bg-gray-100 cursor-pointer'>
                <i className={icon}/>
              </li>
          )
        }
      </ul>
  )
}

export default IconList