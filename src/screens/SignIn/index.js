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

import EmailIcon from '../../assets/Email.svg';
import LockIcon from '../../assets/Lock.svg';
import PetrainerLoginLogo from '../../assets/Petrainer-Login.svg';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";

export default () => {
    const navigation = useNavigation();

    const firebaseConfig = {
        apiKey: 'AIzaSyCUj7rv7NP1S2rZdTcMqBhMW4UvIxludbw',
        authDomain: 'petrainer-9fde5.firebaseapp.com',
        databaseURL: 'https://petrainer-9fde5-default-rtdb.firebaseio.com',
        projectId: 'petrainer-9fde5',
        storageBucket: 'petrainer-9fde5.appspot.com',
        messagingSenderId: '979129407192',
        appId: '1:979129407192:ios:38d15b05cc9ee05f7fa9ad',
      };
      
    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');


    const handleSignClick = () => {
        signInWithEmailAndPassword(auth, emailField, passwordField)
        .then((userCredential) => {
            const user = userCredential.user;
            // navigation.reset({
            //     routes: [{name: 'MainTab'}]
            // });
            Alert.alert("Sucesso!", "Login efetuado com sucesso!");
        })
        .catch((error) => {
            Alert.alert("Erro!", "Usuário ou senha inválidos!");
        });
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