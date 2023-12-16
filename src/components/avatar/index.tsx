import React from "react";
import RandomColor from "randomcolor";
import {Avatar as AntAvatar, AvatarProps} from "antd";

interface Props {
  fontSize?: string
  placeholder?: string
  placeholderCount?: number
  config: AvatarProps
}

const Avatar: React.FC<Props> = (props) => {
  return (
      <AntAvatar
          style={{
            backgroundColor: props.config.src ? 'unset' : RandomColor({
              luminosity: 'dark',
            })
          }}
          {...props.config}>
        <div style={{
          height: (props.config.size || 46) + 'px',
          width: (props.config.size || 46) + 'px'
        }} className={`flex items-center justify-center ${props.fontSize}`}>
          {props.placeholder && props.placeholder[props.placeholderCount || 0]}
        </div>
      </AntAvatar>
  )
}

export default Avatar