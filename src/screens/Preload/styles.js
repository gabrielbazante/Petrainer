import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    background-color: #2C8FA8;
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Title = styled.Text`
    font-weight: 700;
    font-size: 90px;
    text-align: center;
    color: #E37C28;
    top: -100px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: -100px;
`;