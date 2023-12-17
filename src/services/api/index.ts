import AdminAPI from "@/services/api/admin.ts";
import ClientAPI from "@/services/api/client.ts";
import AuthAPI from "@/services/api/auth.ts";

const API = {
  AdminAPI,
  ClientAPI,
  AuthAPI,
  user: {
    updateAvatar: '/user/update-avatar'
  }
}

export default API