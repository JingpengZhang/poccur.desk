import React from "react";
import {Link} from "react-router-dom";
import {Space} from "antd";
import dayjs from "dayjs";

const ArticleList: React.FC = () => {

  const articles = [
    {
      id: 'asd',
      title: 'ThreeJS CSS3DRender 渲染 iframe 无法交互',
      summary: '在使用 CSS3DRender 渲染 iframe 时,可能会出现在某些角度下(使用 OrbitControls 旋转场景),鼠标无法与 iframe 中的元素交互的问题.',
      postTime: 1702697387261,
      cover: 'https://www.poccur.top/static/c4524c0605beab064473805196873bf2/postThumb.png',
    },
    {
      id: 'sf',
      title: 'Vue用＜br＞自定义换行，用v-html渲染，hover的时候title也需要使用自定义换行或者显示一行用省略号展示，hover展示全部',
      summary: '哈喽 大家好啊,最近遇到一个需求:需求一：用\<\br>自定义换行，hover的时候title也需要使用自定义换行,然后我便想到了用<br>自定义换行，然后用v-html渲染，则就正常显示了但是title只能用文本，然后我百度到其他博主写的用\\n可以实现title换行，然后我就用替换字符进行替换，以下是效果图和代码',
      postTime: 1702697387261,
      cover: 'https://spruko.com/demo/udon/dist/assets/images/media/media-23.jpg',
    },
    {
      id: 'sf',
      title: 'vue2.0 el-table 点击小图标 怎么修改行内某个值',
      summary: '需求分析:Vue 的双向数据绑定，使得修改数据后，视图就会跟着发生更新，比如对数组进行增加元素、切割等操作。然而直接通过下标修改数组内容后，视图却不发生变化，因此，我们要想通过index下标来改变数组来达到目的是行不通的。这时我们可以使用Vue.set(对象，属性，值)或 this.$set(对象，属性，值)来改变数组',
      postTime: 1702697387261,
      cover: 'https://spruko.com/demo/udon/dist/assets/images/media/media-74.jpg',
    },
  ]

  return (
      <ul className='flex flex-col'>
        {
          articles.map(item =>
              <li key={item.id} className='pb-4 border-b border-dashed last:border-b-0 mb-4 last:mb-0 first:mt-2'>
                <Link to={''} className='flex items-start group'>
                  <div className='flex-grow'>
                    <p className='line-clamp-2 group-hover:text-primary transition-all'>{item.title}</p>
                    <p className='line-clamp-3 text-xs text-zinc-500 mt-2 leading-5'>{item.summary}</p>
                    <Space className='text-xs text-zinc-500 mt-5'>
                      <span>{dayjs(item.postTime).format('YYYY-MM-DD HH:MM:ss')}</span>
                    </Space>
                  </div>
                  <div className='flex-shrink-0 w-48 aspect-[4/2.5] bg-gray-100 rounded ml-6 overflow-hidden'>
                    <img src={item.cover} className='w-full h-full object-cover' alt='封面图'/>
                  </div>
                </Link>
              </li>
          )
        }
      </ul>
  )
}

export default ArticleList