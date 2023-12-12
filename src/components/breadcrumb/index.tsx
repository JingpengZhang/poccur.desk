import React from "react";
import {useAppDispatch, useAppSelector} from "@/hooks/use-redux.ts";
import {useNavigate} from "react-router-dom";
import {initialBreadcrumbItems, setBreadcrumbItems} from "@/store/main";

export interface BreadCrumbItem {
  id: string;
  name: string;
  iconclass: string;
  path: string;
}

const Breadcrumb: React.FC = () => {

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

  return <ul className='flex items-center text-sm'>
    {
      breadcrumbs.map((item, index) =>
          <li key={item.id} className='flex items-center'>
            <div
                onClick={() => handleItemClick(item)}
                className={`flex items-center cursor-pointer hover:bg-blue-100 hover:text-primary transition-all h-6  px-1 rounded ${index === breadcrumbs.length - 1 ? ' text-primary' : ''}`}>
              {item.name}
            </div>
            {
                index !== breadcrumbs.length - 1 && <span className='mx-1  '>/</span>
            }
          </li>
      )
    }
  </ul>
}

export default Breadcrumb