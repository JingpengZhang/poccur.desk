import React from "react";
import Card from "@/components/card";
import {Tabs} from "antd";
import ArticleList from "@/pages/main/profile/components/data-detail/article-list";
import Gallery from "@/pages/main/profile/components/data-detail/gallery";
import FollowerList from "@/pages/main/profile/components/data-detail/follower-list";
import FriendList from "@/pages/main/profile/components/data-detail/friend-list";

const DataDetail: React.FC = () => {
  return (
      <Card noHeader className='px-6 pt-3 pb-6 w-full'>
        <Tabs
            items={[
              {
                key: '1',
                label: '博文',
                icon: <i className="bi bi-postcard"></i>,
                children: <ArticleList/>
              },
              {
                key: '2',
                label: '相册',
                icon: <i className="bi bi-images"></i>,
                children: <Gallery/>
              },
              {
                key: '3',
                label: '朋友',
                icon:<i className="bi bi-people-fill"></i>,
                children: <FriendList/>
              },
              {
                key: '4',
                label: '关注',
                icon:  <i className="bi bi-person-check-fill"></i>,
                children: <FollowerList/>
              },
              {
                key: '5',
                icon: <i className="bi bi-person-fill"></i>,
                label: '粉丝',
                children: <>sd</>
              }
            ]}
        />
      </Card>
  )
}

export default DataDetail