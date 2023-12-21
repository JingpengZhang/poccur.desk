import AdminAPI from "@/services/api/admin.ts";
import ClientAPI from "@/services/api/client.ts";
import AuthAPI from "@/services/api/auth.ts";

const API = {
  AdminAPI,
  ClientAPI,
  AuthAPI,
  user: {
    updateAvatar: '/user/update-avatar',
    update: '/user/update',
    profile: '/user/profile',
    getCurrentUserProfile: '/user/current-user-profile'
  },
  tag: {
    create: '/tag/create',
    update: '/tag/update',
    delete: '/tag/delete',
    list: '/tag/list',
  }
}

export default API