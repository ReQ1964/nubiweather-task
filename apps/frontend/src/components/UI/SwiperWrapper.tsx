import { ReactNode } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
type SwiperWrapperProps = {
  children: ReactNode;
};

const SwiperWrapper = ({ children }: SwiperWrapperProps) => {
  return (
    <Swiper
      className='flex flex-row gap-5'
      spaceBetween={0}
      slidesPerView={2}
      breakpoints={{
        375: {
          slidesPerView: 2,
        },
        450: {
          slidesPerView: 3,
        },
        550: {
          slidesPerView: 4,
        },
        700: {
          slidesPerView: 5,
        },
      }}
    >
      {children}
    </Swiper>
  );
};

export default SwiperWrapper;
