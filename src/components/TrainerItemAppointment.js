import React from "react";
import styled from "styled-components/native";

const Area = styled.View`
    background-color: #FFFFFF;
    margin-bottom: 20px;
    border-radius: 20px;
    padding: 10px;
    flex-direction: column;
    width: 100%;
`;

const HeaderArea = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`;

const Avatar = styled.Image`
    width: 88px;
    height: 88px;
    border-radius: 20px;
    margin-left: 10px;
`;
const ServiceArea = styled.View`
    margin-left: 10px;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;

const ServiceName = styled.Text`
    font-size: 17px;
`;

const ServicePrice = styled.Text`
    font-size: 17px;
    margin-right: 10px;
`;

const AppointmentArea = styled.View`
    margin-left: 10px;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 20px;
`;

const UserName = styled.Text`
    font-size: 18px;
    margin-left: 20px;
`;
const DateField = styled.View`
    width: 105px;
    height: 46px;
    background-color: #E37C28;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
`;
const DateFieldText = styled.Text`
    font-size: 14px;
    color: #FFFFFF;
`;

const TimeField = styled.View`
    width: 85px;
    height: 46px;
    background-color: #E37C28;
    border-radius: 10px;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
`;
const TimeFieldText = styled.Text`
    font-size: 14px;
    color: #FFFFFF;
`;

export default ({ data }) => {
    return (
        <Area key={data.id} 
            style={{
                opacity: data.status ? 1 : 0.5
            }}
        >
            <HeaderArea>
                <Avatar source={{ uri: data.trainerAvatar }} />
                <UserName>{data.trainerName}</UserName>
            </HeaderArea>
            <ServiceArea>
                <ServiceName>{data.service.name}</ServiceName>
                <ServicePrice>R$ {data.service.price.toFixed(2)}</ServicePrice>
            </ServiceArea>
            <AppointmentArea>
                <DateField>
                    <DateFieldText>{`${data.day}/${data.month}/${data.year}`}</DateFieldText>
                </DateField>
                <TimeField>
                    <TimeFieldText>{data.hour}</TimeFieldText>
                </TimeField>
            </AppointmentArea>
        </Area>
    );
}