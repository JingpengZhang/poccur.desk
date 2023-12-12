const clientPrefix = '/client'

const ClientAPI = {
  articleCategory: {
    create: clientPrefix + '/category/create',
    list: clientPrefix + '/category/list',
    update:clientPrefix + '/category/update',
    delete:clientPrefix + '/category/delete'
  }
}

export default ClientAPI