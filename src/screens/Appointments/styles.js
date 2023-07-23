import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #2C8FA8;
`;

export const PageTitle = styled.Text`
    font-size: 24px;
    color: #FFFFFF;
    margin-top: 20px;
    text-align: left;
    font-weight: bold;
    margin-left: 20px;
`;

export const ListArea = styled.View`
    flex: 1;
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const Scroller = styled.ScrollView`
    flex: 1;
    padding: 10px;
`;

export const LoadingIcon = styled.ActivityIndicator`
    margin-top: 50px;
`;

export const WithoutAppointments = styled.Text`
    font-size: 28px;
    color: #FFFFFF;
    text-align: center;    
    font-weight: bold;
    margin-bottom: 20px;
    margin-top: 20px;
`;

export const TextArea = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`;