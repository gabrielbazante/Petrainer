import { createUserWithEmailAndPassword, signInWithEmailAndPassword, verifyIdToken, signOut } from "firebase/auth";
import { doc, getDocs, getDoc, setDoc, collection, updateDoc } from "firebase/firestore";
import { auth, database } from '../src/services/firebaseConfig';
import { Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default {
    checkToken: async (token) => {
        // const auth = getAuth();
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
        }
        catch(error){
            Alert.alert("Erro!", "Usuário ou senha inválidos!");
        };
    },

    logout: async () => {
        await signOut(auth);
    },

    signUp: async (email, nome, rua, bairro, cep, cidade, estado, genero, password) => {
        // const database = getFirestore();
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

                const userRef = doc(database, "users", uid);
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
    },

    getTrainers: async (lat= null, lng=null, address=null) => {
        // const database = getFirestore();
        const trainersRef = collection(database, "trainers");
      
        try {
          const trainersSnapshot = await getDocs(trainersRef);
          const trainersData = trainersSnapshot.docs.map((doc) => doc.data());
            
          const errorSnapshot = await getDoc(doc(database, "trainers/error"));
          const locSnapshot = await getDoc(doc(database, "trainers/loc"));

          const trainers = {
            data: trainersData,
            error: { error: errorSnapshot.data().error },
            loc: { loc: locSnapshot.data().loc }
          };
          return trainers;
        } catch (error) {
          alert("Erro: " + error);
          return null;
        }
      },
      

    getTrainer: async (id) => {
        const trainersRef = collection(database, "trainers");
        const trainersSnapshot = await getDocs(trainersRef);
        const trainersData = trainersSnapshot.docs.map((doc) => doc.data());
        
        const errorSnapshot = await getDoc(doc(database, "trainers/error"));
        const locSnapshot = await getDoc(doc(database, "trainers/loc"));

        const trainers = {
            data: trainersData,
            error: { error: errorSnapshot.data().error },
            loc: { loc: locSnapshot.data().loc }
        };
        const trainer = trainers.data[0][id];
        return trainer;
    },

    setFavorite: async (id, isFavorite) => {
        const trainersRef = collection(database, "trainers");
        const trainersSnapshot = await getDocs(trainersRef);
        const trainersData = trainersSnapshot.docs.map((doc) => doc.data());
        
        const errorSnapshot = await getDoc(doc(database, "trainers/error"));
        const locSnapshot = await getDoc(doc(database, "trainers/loc"));

        const trainers = {
            data: trainersData,
            error: { error: errorSnapshot.data().error },
            loc: { loc: locSnapshot.data().loc }
        };
        const trainer = trainers.data[0][id];
        trainer.favorited = !isFavorite;
        const trainerDocRef = doc(database, "trainers", "data");
        try{
            await updateDoc(trainerDocRef, {
                [`${id}.favorited`]: trainer.favorited,
            });
            alert("Favorito atualizado com sucesso!");
            return trainer.favorited;
        } catch (error) {
            alert("Erro ao atualizar favorito: " + error);
            return null;
        }
    }
};