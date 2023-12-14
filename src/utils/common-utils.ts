import {Role} from "@/libs/role.enum.ts";
interface RolesFormat {
  name: string,
  color: string,
  bgColor: string
}

class CommonUtils {
  constructor() {
  }

  static rolesFormat(roles: Role[]): RolesFormat[] {
    let result: RolesFormat[] = []
    roles.forEach(item => {
      let color, name,bgColor
      switch (item) {
        case Role.Super:
          name = '站长'
          bgColor = '#ffedd5'
          color = '#ea580c'
          break
        case Role.Admin:
          name = '管理员'
          bgColor = '#ffedd5'
          color = '#ea580c'
          break
        case Role.User:
          name = '用户'
          bgColor = '#dbeafe'
          color = '#2563eb'
          break

      }
      result.push({
        name,
        color,
        bgColor
      })
    })

    return result
  }
}

export default CommonUtils