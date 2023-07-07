import React, { useEffect } from "react";
import { Container, LoadingIcon, Title } from './styles'
import { useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-community/async-storage";

import PetrainerLogo from "../../assets/Petrainer.svg";

export default () => {
    const navigation = useNavigation();
    
    useEffect(() => {
        // const checkToken = async () => {
            // const token = await AsyncStorage.getItem('token');
            // if(token !== null) {
            //     // Validar token
            // } else {
            //     navigation.navigate('SignIn');
            // }
        // }
        // checkToken();
        setTimeout(() => {
            navigation.navigate('SignIn');
        }, 2000);
    }, []);

    return (
        <Container>
            <PetrainerLogo width="100%" height="460" />
            <Title>Petrainer</Title>
            <LoadingIcon size="large" color="#FFFFFF" />
        </Container>
    );
}