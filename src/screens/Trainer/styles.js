import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: #FFFFFF;
    margin-top: -50px;
`;
export const Scroller = styled.ScrollView`
    flex: 1;
`;
export const FakeSwiper = styled.View`
    flex: 1;
    height: 240px;
    background-color: #2D90A9;
`;
export const FakeSwiperImage = styled.Image`
    flex: 1;
    width: 100%;
    height: 240px;
`;
export const PageBody = styled.View`
    background-color: #FFFFFF;
    border-top-left-radius: 50px;
    margin-top: -50px;
    min-height: 400px;
`;
export const UserInfoArea = styled.View`
    flex-direction: row;
    margin-top: -30px;
`;

export const UserAvatar = styled.Image`
    width: 110px;
    height: 110px;
    border-radius: 20px;
    margin-left: 30px;
    margin-right: 20px;
`;
export const UserInfo = styled.View`
    flex: 1;
    justify-content: flex-end;
`;
export const UserInfoName = styled.Text`
    color: #000000;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;
export const UserFavButton = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    background-color: #FFFFFF;
    border: 2px solid #999999;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    margin-left: 20px;
    margin-top: 10px;
`;
export const ServiceArea = styled.View`
    margin-top: 30px;
`;
export const ServicesTitle = styled.Text`
    font-size: 40px;
    font-weight: 400;
    color: #2D90A9;
    margin-left: 30px;
    margin-bottom: 20px;
`;
export const ServiceItem = styled.View`
    flex-direction: row;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 50px;
`;
export const ServiceInfo = styled.View`
    flex: 1;
`;
export const ServiceName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #2D90A9;
    flex-wrap: wrap;
`;
export const ServicePrice = styled.Text`
    margin-top: 5px;
    font-size: 16px;
    font-weight: 400;
    color: #2D90A9;
`;
export const ServiceChooseButton = styled.TouchableOpacity`
    background-color: #2D90A9;
    border-radius: 10px;
    padding: 10px 15px;
`;
export const ServiceChooseBtnText = styled.Text`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
`;
export const TestimonialArea = styled.View`
    margin-top: -30px;
    margin-bottom: 30px;
`;
export const BackButton = styled.TouchableOpacity`
    position: absolute;
    left: 10px;
    top: 90px;
    z-index: 9;
`;
export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const HandleSubmitDateAndTime = styled.TouchableOpacity`
    background-color: #2D90A9;
    border-radius: 10px;
    padding: 10px 15px;
    margin-top: 20px;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 50px;
`;
export const HandleSubmitDateAndTimeText = styled.Text`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 400;
    color: #FFFFFF;
`;
