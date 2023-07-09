import React, { useState, useEffect } from "react";
import { default as Api } from "../../Api";
import { RefreshControl } from "react-native";
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

    const [refreshing, setRefreshing] = useState(false);
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
          const res = await Api.getTrainers(lat, lng, locationText);
          if (res && res.data && Array.isArray(res.data)) {
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

    const onRefresh = () => {
        setRefreshing(false);
        getTrainers();
    }
    const handleLocationSearch = () => {
        setCoords({});
        getTrainers();
    }
    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
            }>
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
                        onEndEditing={handleLocationSearch}
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