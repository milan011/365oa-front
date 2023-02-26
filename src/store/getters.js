const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  nickName: state => state.user.nickName,
  roles: state => state.user.roles,
  roleIds: state => state.user.roleIds,
  departments: state => state.user.departments,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters
