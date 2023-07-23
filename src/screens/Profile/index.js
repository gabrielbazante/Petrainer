import React from "react";
import { Container, Button, ButtonText } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { default as Api } from "../../Api";

export default () => {
    const navigation = useNavigation();
    const handleLogoutClick = async () => {
        await Api.logout();
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }
    return (
        <Container>
            <Button onPress={handleLogoutClick}>
                <ButtonText>Logout</ButtonText>
            </Button>
        </Container>
    );
}