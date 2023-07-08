import { createUserWithEmailAndPassword, signInWithEmailAndPassword, verifyIdToken } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { auth } from '../src/services/firebaseConfig';
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default {
    checkToken: async (token) => {
        const auth = getAuth();
        try {
            const decodedToken = await verifyIdToken(auth, token);
            const userId = decodedToken.uid;
            alert(`Token válido para o usuário: ${userId}`);
        } catch (error) {
            alert("Erro ao verificar o token:", error);
        }
    },

    signIn: async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Sucesso!", "Login efetuado com sucesso!");
        }
        catch(error){
            Alert.alert("Erro!", "Usuário ou senha inválidos!");
        };
    },

    signUp: async (email, nome, rua, bairro, cep, cidade, estado, genero, password) => {
        const db = getFirestore();
        const navigation = useNavigation();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const uid = user.uid;

                const userData = {
                    email: email,
                    nome: nome,
                    rua: rua,
                    bairro: bairro,
                    cep: cep,
                    cidade: cidade,
                    estado: estado,
                    genero: genero,
                    senha: password,
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
        }
        catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            Alert.alert("Erro code: " + errorCode + " - " + errorMessage + "!");
        };
    }
};