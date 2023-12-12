const adminPrefix = '/admin'

const AdminAPI = {
  menu: {
    create: adminPrefix + '/menu/create',
    list: adminPrefix + '/menu/list',
    tree: adminPrefix + '/menu/tree',
    update: adminPrefix + '/menu/update',
    updateIndex: adminPrefix + "/menu/update_index",
    delete: adminPrefix + "/menu/delete"
  },
}

export default AdminAPI
