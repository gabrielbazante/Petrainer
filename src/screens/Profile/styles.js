import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #2C8FA8;
    justify-content: center;
    align-items: center;
`;

export const Button = styled.TouchableOpacity`
    margin-top: 20px;
    background-color: #E37C28;
    border-radius: 10px;
    width: 90%;
    height: 50px;
    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text`
    font-size: 18px;
    color: #FFFFFF;
    font-weight: bold;
`;