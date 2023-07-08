import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Container,
         ContainerLogo, 
         InputArea,
         Title, 
         CustomButton, 
         CustomButtonText, 
         SignMessageButton, 
         SignMessageButtonText, 
         SignMessageButtonTextBold } from './styles'

import SignInput from "../../components/SignInput";

import { default as Api } from '../../Api';

import EmailIcon from '../../assets/Email.svg';
import LockIcon from '../../assets/Lock.svg';
import PetrainerLoginLogo from '../../assets/Petrainer-Login.svg';

export default () => {
    const navigation = useNavigation();
    
    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');


    const handleSignClick = async () => {
        if(emailField != '' && passwordField != '') {
            await Api.signIn(emailField, passwordField);
        } else {
            alert("Preencha os campos corretamente!");
        }
    }

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignUp'}]
        });
    }

    return (
        <Container>
            <ContainerLogo />
            <Title>Petrainer</Title>
            <PetrainerLoginLogo width="100%" height="450" />
            <InputArea>
                <SignInput 
                    IconSvg={EmailIcon} 
                    placeholder="Digite seu e-mail" 
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                    />
                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Digite sua senha" password={true} 
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    isPassword={true}
                    />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Entrar</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick} >
                <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}