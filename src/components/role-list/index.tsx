import {Role} from "@/libs/role.enum.ts";
import React, {useMemo} from "react";
import {Tag} from "antd";

interface Props {
  roles: Role[],
  className?: string,
  onlyOne?: boolean
}

interface RoleRender {
  value: Role,
  color: string,
  label: string
}

const RoleList: React.FC<Props> = (props) => {

  const getRolesLabelAndColor = (role: Role): RoleRender => {
    switch (role) {
      case Role.Super:
        return {
          value: role,
          color: 'volcano',
          label: '站长'
        }
      case Role.Admin:
        return {
          value: role,
          color: 'purple',
          label: '管理员'
        }
      case Role.User:
        return {
          value: role,
          color: 'cyan',
          label: '普通用户'
        }
    }
  }

  const roles = useMemo(() => {
    const _roles = props.roles.sort();
    let result: RoleRender[] = []

    if (props.onlyOne && props.roles.length > 0) {
      result.push(getRolesLabelAndColor(_roles[0]))
    } else {
      _roles.forEach(role => {
        result.push(getRolesLabelAndColor(role))
      })
    }

    return result
  }, [props.roles, props.onlyOne])
  return (
      <div className={props.className}>
        {
          roles.map(role =>
              <Tag key={role.value} color={role.color}>{role.label}</Tag>
          )
        }
      </div>
  )
}

export default RoleList