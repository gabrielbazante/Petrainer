import React, { useState, useEffect } from "react";
import { default as Api } from "../../Api";
import { Container, LoadingIcon, WithoutAppointments, TextArea, Scroller, ListArea, PageTitle } from "./styles";
import { RefreshControl } from "react-native";
import TrainerItemAppointment from "../../components/TrainerItemAppointment";
import SadDogSvg from "../../assets/Sad_dog.svg";

export default () => {
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const getAppointments = async () => {
        setLoading(true);
        setList([]);

        try {
            const appointments = await Api.getAppointment();
            if(appointments && Object.values(appointments).length > 0){
                setList(Object.values(appointments));
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setList([]);
            alert("Erro ao carregar os agendamentos!");
            alert(error);
        }
    }

    useEffect(() => {
        getAppointments();
    }, []);

    const onRefresh = () => {
        getAppointments();
        setRefreshing(false);
    }
    return (
        <Container>
            <PageTitle>Seus Agendamentos</PageTitle>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
            }>
                {loading ? (
                    <LoadingIcon size="large" color="#FFFFFF" />
                ) : list.length > 0 ? (
                    <ListArea>
                        {list.map((item, index)=>(
                            <TrainerItemAppointment key={item.id} data={item} />
                        ))}
                    </ListArea>
                ) : (
                    <TextArea>
                        <SadDogSvg width="100%" height="400" />
                        <WithoutAppointments numberOfLines={2}>Você ainda não possui agendamentos</WithoutAppointments>
                    </TextArea>
                )}
            </Scroller>
        </Container>
    );
}

