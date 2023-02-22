import store from '@/store'

/*部门选择过滤*/
export function departmentFilter(list=[]){
  let userDpeList = store.getters.departments
  let allowPartment = list.filter(item => userDpeList.includes(item.id))
  return allowPartment;
}
