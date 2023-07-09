import React, { useState, useEffect } from "react";
import { default as Api } from "../../Api";
import * as Location from "expo-location";
import { Container,
         Scroller,
         HeaderArea,
         HeaderTitle,
         SearchButton,
         LocationArea,
         LocationInput,
         LocationFinder,
         ListArea,
         LoadingIcon } from "./styles";

import TrainerItem from "../../components/TrainerItem";

import { useNavigation } from "@react-navigation/native";

import SearchIcon from "../../assets/search.svg";
import MyLocationIcon from "../../assets/my_location.svg";

export default () => {
    const navigation = useNavigation();

    const [locationText, setLocationText] = useState('');
    const [loading, setLoading] = useState(false);
    const [coords, setCoords] = useState(null);
    const [list, setList] = useState([]);

    const handleLocationFinder = async () => {
        setCoords(null);

        let { status } = await Location.requestForegroundPermissionsAsync();

        if(status == 'granted') {
            setLoading(true);
            setLocationText('');
            setList([]);

            let location = await Location.getCurrentPositionAsync({});
            setCoords(location.coords);
            getTrainers();
        }

    }

    const getTrainers = async () => {
        setLoading(true);
        setList([]);
      
        let lat = null;
        let lng = null;
        if (coords) {
          lat = coords.latitude;
          lng = coords.longitude;
        }
      
        try {
          const res = await Api.getTrainers();
          if (res && res.data && Array.isArray(res.data)) {
            const trainers = {
              data: res.data.map((trainer) => ({
                avatar: trainer.avatar,
                id: trainer.id,
                name: trainer.name,
                stars: trainer.stars
              })),
              error: { error: res.error.error },
              loc: { loc: res.loc.loc }
            };
      
            if (res.loc && res.loc.loc) {
              setLocationText(res.loc.loc);
            }

            const listaAtual = JSON.parse(JSON.stringify(res.data[0]));
      
            setList(Object.values(listaAtual));
          } else {
            alert("Erro: Nenhum treinador encontrado.");
          }
        } catch (error) {
          alert("Erro: " + error);
        }
      
        setLoading(false);
    };
      

    useEffect(()=>{
        getTrainers();
    }, []);

    return (
        <Container>
            <Scroller>
                <HeaderArea>
                    <HeaderTitle numberOfLines={2}>Encontre o seu adestrador favorito</HeaderTitle>
                    <SearchButton onPress={() => navigation.navigate('Search')}>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchButton>
                </HeaderArea>
                
                <LocationArea>
                    <LocationInput 
                        placeholder="Onde você está?"
                        placeholderTextColor="#FFFFFF"
                        value={locationText}
                        onChangeText={t=>setLocationText(t)}
                    />
                    <LocationFinder onPress={handleLocationFinder}>
                        <MyLocationIcon width="24" height="24" fill="#FFFFFF" />
                    </LocationFinder>
                </LocationArea>
                {loading &&
                    <LoadingIcon size="large" color="#FFFFFF" />
                }
                <ListArea>
                    {list.map((item, k)=>(
                        <TrainerItem key={k} data={item} />
                    ))}
                </ListArea>
            </Scroller>
        </Container>
    );
}