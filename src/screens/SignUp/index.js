import React, { useState, useEffect } from "react";
import { useNavigation } from '@react-navigation/native';
import { Container,
         ContainerLogo, 
         InputArea,
         Row, 
         CustomButton, 
         CustomButtonText, 
         SignMessageButton, 
         SignMessageButtonText, 
         SignMessageButtonTextBold } from './styles';

import SignInput from "../../components/SignInput";

import axios from 'axios';

import { auth } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import EmailIcon from '../../assets/Email.svg';
import LockIcon from '../../assets/Lock.svg';
import PersonIcon from '../../assets/person.svg';
import HomeIcon from '../../assets/home.svg';
import GenderIcon from '../../assets/gender.svg';
import MyLocationIcon from '../../assets/my_location.svg';
import PetrainerMan from '../../assets/Petrainer-Man.svg';
import PetrainerWoman from '../../assets/Petrainer-Woman.svg'
import { Alert } from "react-native";

export default () => {
    const navigation = useNavigation();

    const db = getFirestore();

    const [emailField, setEmailField] = useState('');
    const [passwordField, setPasswordField] = useState('');
    const [nomeField, setNomeField] = useState("");
    const [ruaField, setRuaField] = useState("");
    const [bairroField, setBairroField] = useState("");
    const [cepField, setCepField] = useState("");
    const [cidadeField, setCidadeField] = useState("");
    const [estadoField, setEstadoField] = useState("");
    const [generoField, setGeneroField] = useState("");
    const [petrainerIcon, setPetrainerIcon] = useState(
        <PetrainerMan width="100%" height="300" style={{ top: 25 }} />
      );

    const buscarCep = async () => {
        const cep = cepField.replace("-", "");
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        setRuaField(response.data.logradouro);
        setBairroField(response.data.bairro);
        setCidadeField(response.data.localidade);
        setEstadoField(response.data.uf);
    }

    useEffect(() => {
        if(cepField.length === 8) {
            buscarCep();
        }
    }, [cepField]);

    useEffect(() => {
        if (generoField === "Masculino" || generoField === "") {
          setPetrainerIcon(<PetrainerMan width="100%" height="300" style={{ top: 25 }} />);
        } else if (generoField === "Feminino"){
          setPetrainerIcon(<PetrainerWoman width="100%" height="260" style={{ top: 35, margin: 20 }} />);
        }
      }, [generoField]);
      

    const handleSignClick = () => {
        createUserWithEmailAndPassword(auth, emailField, passwordField)
        .then((userCredential) => {
            const user = userCredential.user;
            const uid = user.uid;

            const userData = {
                nome: nomeField,
                email: emailField,
                rua: ruaField,
                bairro: bairroField,
                cep: cepField,
                cidade: cidadeField,
                estado: estadoField,
                genero: generoField,
                senha: passwordField,
            };

            const userRef = doc(db, "users", uid);
            setDoc(userRef, userData)
                .then(() => {
                    Alert.alert("Cadastro realizado com sucesso!");
                    navigation.reset({
                        routes: [{name: 'SignIn'}]
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    Alert.alert("Erro code: " + errorCode + " - " + errorMessage + "!");
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert("Erro code: " + errorCode + " - " + errorMessage + "!");
        });
    };

    const handleMessageButtonClick = () => {
        navigation.reset({
            routes: [{name: 'SignIn'}]
        });
    }

    return (
        <Container>
            <ContainerLogo />
            {petrainerIcon}
            <InputArea>
                <SignInput 
                    IconSvg={PersonIcon} 
                    placeholder="Nome" 
                    value={nomeField}
                    onChangeText={t=>setNomeField(t)}
                />
                <SignInput 
                    IconSvg={EmailIcon} 
                    placeholder="E-mail" 
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />
                <SignInput 
                    IconSvg={GenderIcon} 
                    placeholder="Genero" 
                    value={generoField}
                    onChangeText={t=>setGeneroField(t)}
                />
                <SignInput 
                    IconSvg={HomeIcon} 
                    placeholder="Rua" 
                    value={ruaField}
                    onChangeText={t=>setRuaField(t)}
                />
                <Row>
                    <SignInput
                        IconSvg={MyLocationIcon}
                        placeholder="CEP"
                        value={cepField}
                        onBlur={buscarCep}
                        onChangeText={t=>setCepField(t)}
                        width="35%"
                    />
                    <SignInput 
                        IconSvg={MyLocationIcon} 
                        placeholder="Bairro" 
                        value={bairroField}
                        onChangeText={t=>setBairroField(t)}
                        width="35%"
                    />
                </Row>
                <Row>
                    <SignInput 
                        IconSvg={MyLocationIcon} 
                        placeholder="Estado" 
                        value={estadoField}
                        onChangeText={t=>setEstadoField(t)}
                        width="35%"
                    />
                    <SignInput 
                        IconSvg={MyLocationIcon} 
                        placeholder="Cidade" 
                        value={cidadeField}
                        onChangeText={t=>setCidadeField(t)}
                        width="35%"
                    />
                </Row>
                <SignInput 
                    IconSvg={LockIcon} 
                    placeholder="Senha" password={true} 
                    value={passwordField}
                    onChangeText={t=>setPasswordField(t)}
                    isPassword={true}
                    />
                <CustomButton onPress={handleSignClick}>
                    <CustomButtonText>Cadastrar</CustomButtonText>
                </CustomButton>
            </InputArea>
            <SignMessageButton onPress={handleMessageButtonClick} >
                <SignMessageButtonText> Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Faça Login</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}