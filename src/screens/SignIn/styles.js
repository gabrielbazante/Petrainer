import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background-color: #2C8FA8;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ContainerLogo = styled.View`
    flex: 1;
    width: 100%;
    height: 370px;
    top: 0;
    position: absolute;
    backgroundColor: #F2F2F2;
    borderBottomLeftRadius: 100px;
    borderBottomRightRadius: 100px;
`;

export const Title = styled.Text`
    position: absolute;
    fontWeight: 700;
    fontSize: 60px;
    lineHeight: 66px;
    color: #E37C28;
    textAlign: center;
    top: 75px;
`;

export const InputArea = styled.View`
    width: 100%;
    padding: 40px;
    top: -70px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: #E37C28;
    border-radius: 20px;
    justify-content: center;
    align-items: center;

`;
export const CustomButtonText = styled.Text`
    color: #FFF;
    font-weight: 400;
    font-size: 23px;
`;

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 50px;
`;
export const SignMessageButtonText = styled.Text`
    font-size: 16px;
    color: #FFF;
    font-weight: 400;
    margin-right: 5px;
`;
export const SignMessageButtonTextBold = styled.Text`
    font-size: 16px;
    color: #FFF;
    font-weight: bold;
    margin-left: 2px;
`;