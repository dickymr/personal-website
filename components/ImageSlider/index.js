import { useState } from 'react';
import { Image } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Slider from 'react-slick';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';

const ImageSlider = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const PrevArrow = ({ onClick }) => (
    <ChevronLeftIcon
      position="absolute"
      top={'50%'}
      left={0}
      zIndex={1}
      fontSize={40}
      color={currentSlide === 0 ? 'gray.700' : 'gray.500'}
      cursor={'pointer'}
      onClick={onClick}
    />
  );

  const NextArrow = ({ onClick }) => (
    <ChevronRightIcon
      position="absolute"
      top={'50%'}
      right={0}
      zIndex={1}
      fontSize={40}
      color={currentSlide === images.length - 1 ? 'gray.700' : 'gray.500'}
      cursor={'pointer'}
      onClick={onClick}
    />
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  return (
    <Slider {...settings}>
      {images.map((image, i) => (
        <Image mt={5} key={i} h={400} src={image.url} alt="images" />
      ))}
    </Slider>
  );
};

export default ImageSlider;
