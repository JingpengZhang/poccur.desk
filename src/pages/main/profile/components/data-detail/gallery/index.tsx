import React from "react";
import {Image} from "antd";

const Gallery: React.FC = () => {

  const gallery = [
    'https://www.poccur.top/static/c4524c0605beab064473805196873bf2/postThumb.png',
    'https://spruko.com/demo/udon/dist/assets/images/media/media-23.jpg',
    'https://spruko.com/demo/udon/dist/assets/images/media/media-74.jpg',
    'https://www.poccur.top/static/c4524c0605beab064473805196873bf2/postThumb.png',

  ]

  return (
      <div className='w-full'>
        <ul className='grid grid-cols-6 gap-4 w-full'>
          {
            gallery.map(item =>
                <li key={item} className='overflow-hidden aspect-square rounded'>
                  <Image  src={item} width={'100%'} height={'100%'} className='object-cover'/>
                </li>
            )
          }
        </ul>
      </div>
  )
}

export default Gallery