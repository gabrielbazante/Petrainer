import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { default as Api } from "../../Api";
import { Container,
         Scroller,
         HeaderArea,
         HeaderTitle,
         SearchArea,
         SearchInput,
         SearchFinder,
         ListArea,
         LoadingIcon } from "./styles";

import TrainerItem from "../../components/TrainerItem";
import SearchIcon from "../../assets/search.svg";

export default () => {

    const [refreshing, setRefreshing] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);

    const navigation = useNavigation();

    const handleSearch = () => {
        setList([]);
        setLoading(true);
        getTrainers();
    }

    const getTrainers = async () => {
        setLoading(true);
        setList([]);
        try {
          const res = await Api.getTrainers();
          if (res && res.data && Array.isArray(res.data)) {
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
    
    return (
        <Container>
            <Scroller refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
            }>                
                <SearchArea>
                    <SearchFinder>
                        <SearchIcon width="26" height="26" fill="#FFFFFF" />
                    </SearchFinder>
                    <SearchInput 
                        placeholder="Digite o nome do adestrador"
                        placeholderTextColor="#FFFFFF"
                        value={searchText}
                        onChangeText={t=>setSearchText(t)}
                        onEndEditing={handleSearch}
                    />
                </SearchArea>
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