import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

import PreviousIcon from "../assets/nav_prev.svg";
import NextIcon from "../assets/nav_next.svg";
import Stars from "./Stars";

const Container = styled.View`
    flex: 1;
    margin-top: 10px;
    margin-bottom: 10px;
    align-items: center;
    flex-direction: row;
    box-shadow: 0px 0px 8px #000000;
`
const TestimonialArea = styled.FlatList`
    background-color: #E37C28;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
`
const Button = styled.TouchableOpacity`
    padding: 10px;
    color: #FFFFFF;
`;

const Testimonial = styled.View`
    width: 52%;
    align-items: center;
    justify-content: center;
    margin: 10px;
`

const TestimonialText = styled.Text`
    font-size: 14px;
    text-align: left;
    margin: 10px;
    color: #FFFFFF;
`
const TestimonialInfo = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
    width: 100%;
`

const TestimonialAuthor = styled.Text`
    font-size: 14px;
    text-align: left;
    font-style: italic;
    font-weight: bold;
    color: #FFFFFF;
    margin-left: 10px;
`

export default ({ testimonials }) => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const handlePrev = () => {
      if (currentIndex > 0) {
        carouselRef.current.scrollToIndex({ index: currentIndex - 1 });
        setCurrentIndex(currentIndex - 1);
      }
    };
  
    const handleNext = () => {
      if (currentIndex < testimonials.length - 1) {
        carouselRef.current.scrollToIndex({ index: currentIndex + 1 });
        setCurrentIndex(currentIndex + 1);
      }
    };
    return (
        <Container>
            <Button onPress={handlePrev}>
                <PreviousIcon />
            </Button>

            <TestimonialArea 
                ref={carouselRef}
                data={testimonials}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <Testimonial>
                        <TestimonialInfo>
                            <TestimonialAuthor>{item.author}</TestimonialAuthor>
                            <Stars stars={item.stars} showNumber={false}></Stars>
                        </TestimonialInfo>
                        <TestimonialText>{item.text}</TestimonialText>
                    </Testimonial>
                )}
                contentContainerStyle= {{ alignItems: 'center' }}
                onMomentumScrollEnd={(event) => {
                        const newIndex = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
                        setCurrentIndex(newIndex);
                    }
                }
            />
            <Button onPress={handleNext}>
                <NextIcon />
            </Button>                        
        </Container>
    )
}

