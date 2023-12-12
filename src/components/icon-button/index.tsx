import React, {useMemo} from "react";

interface Props {
  type?: 'delete' | 'edit' | 'copy',
  onClick?: () => void
}

const IconButton: React.FC<Props> = (props) => {

  const state = useMemo(() => {
    let iconclass, color;

    switch (props.type) {
      case 'delete':
        iconclass = ' bi bi-trash3'
        color = 'text-red-600'
        break;
      case 'edit':
        iconclass = ' bi bi-pencil-square'
        color = 'text-primary'
        break;
      case 'copy':
        iconclass = ' bi bi-pencil-square'
        color = 'text-primary'
        break;
      default :
        iconclass = ' bi bi-brightness-high'
        color = 'text-orange-600'
    }
    return {
      iconclass, color
    }
  }, [props.type])

  return (
      <i onClick={() => props.onClick && props.onClick()}
         className={state.iconclass + ' hover:' + state.color + ' transition-all cursor-pointer'}></i>
  )
}

export default IconButton