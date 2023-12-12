import {Breadcrumb} from "antd";
import {useAppDispatch, useAppSelector} from "@/hooks/use-redux.ts";
import {initialBreadcrumbItems, setBreadcrumbItems} from "@/store/main";
import {useNavigate} from "react-router-dom";

export interface BreadCrumbItem {
  id: string;
  name: string;
  iconclass: string;
  path: string;
}

const AppBreadcrumb = () => {

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const breadcrumbs = useAppSelector(state => state.main.breadcrumbItems)

  const handleItemClick = (route: BreadCrumbItem) => {
    if (route.id === initialBreadcrumbItems[0].id) {
      dispatch(setBreadcrumbItems([]))
      navigate(route.path)
    } else {
      const index = breadcrumbs.findIndex(item => item.id === route.id)
      if (index) {
        dispatch(setBreadcrumbItems(breadcrumbs.slice(1, index + 1)))
        navigate(route.path)
      }
    }

  }

  return <Breadcrumb
      items={breadcrumbs}
      itemRender={(route: any) => <a onClick={() => handleItemClick(route)} className='flex items-center'>
        <i className={route.iconclass}/>
        <span className='ml-1'>{route.name}</span>
      </a>}
  />
}

export default AppBreadcrumb