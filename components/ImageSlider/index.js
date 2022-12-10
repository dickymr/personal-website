import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import Slider from 'react-slick';
import '../../node_modules/slick-carousel/slick/slick.css';
import '../../node_modules/slick-carousel/slick/slick-theme.css';
import { Box } from '@chakra-ui/react';

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
        <Box key={i} position={'relative'} h={{ base: '15rem', md: '25rem' }} mt={5}>
          <Image sizes={10} src={image.url} alt="images" fill priority />
        </Box>
      ))}
    </Slider>
  );
};

export default ImageSlider;
