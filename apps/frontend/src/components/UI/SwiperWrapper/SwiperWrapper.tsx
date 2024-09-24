import { ReactNode } from 'react';
import { Swiper } from 'swiper/react';

import 'swiper/css';

type SwiperWrapperProps = {
  children: ReactNode;
};

const SwiperWrapper = ({ children }: SwiperWrapperProps) => {
  return (
    <Swiper
      className="flex flex-row gap-4 p-1 hover:cursor-grab"
      spaceBetween={40}
      slidesPerView={2}
      role="list"
      breakpoints={{
        375: {
          slidesPerView: 2,
        },
        450: {
          slidesPerView: 3,
        },
        650: {
          slidesPerView: 4,
        },
        800: {
          slidesPerView: 5,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default SwiperWrapper;
