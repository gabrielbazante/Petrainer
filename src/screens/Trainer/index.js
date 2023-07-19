import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container,
         Scroller,
         FakeSwiper,
         PageBody,
         UserInfoArea,
         UserAvatar,
         UserInfo,
         UserInfoName,
         UserFavButton,
         ServiceArea,
         ServicesTitle,
         ServiceItem,
         ServiceInfo,
         ServiceName,
         ServicePrice,
         ServiceChooseButton,
         ServiceChooseBtnText,
         FakeSwiperImage,
         TestimonialArea,
         LoadingIcon,
         BackButton } from "./styles";

import { default as Api } from "../../Api";

import Swiper from "../../components/Swiper";
import Stars from "../../components/Stars";
import FavoriteIcon from "../../assets/favorite.svg";
import FavoriteFullIcon from "../../assets/favorite_full.svg";
import BackIcon from "../../assets/back.svg";

export default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params?.id,
        avatar: route.params?.avatar,
        name: route.params?.name,
        stars: route.params?.stars,
        photos: route.params?.photos,
    });

    const [loading, setLoading] = useState(false);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        const getTrainerInfo = async () => {
          setLoading(true);
          try {
            const trainer = await Api.getTrainer(userInfo.id);
            if (trainer) {
              const servicesArray = Object.values(trainer.services);
              const testimonialsArray = Object.values(trainer.testimonials);
              setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                services: servicesArray,
                testimonials: testimonialsArray,
                favorited: favorited,
              }));
              setFavorited(trainer.favorited);
            } else {
              alert("Erro: Treinador não encontrado");
            }
          } catch (error) {
            alert("Erro: " + error);
          }
          setLoading(false);
        };
        getTrainerInfo();
      }, []);

    const handleBackButton = () => {
        navigation.goBack();
    }

    const handleFavClick = () => {
        setFavorited(!favorited);
        Api.setFavorite(userInfo.id, favorited);
    }
      

    return (
        <Container>
            <Scroller>
                {userInfo.photos && userInfo.photos.length > 0 ?
                <FakeSwiperImage source={{uri: userInfo.photos}}></FakeSwiperImage>
                :
                <FakeSwiper></FakeSwiper>
                }
                <PageBody>
                    <UserInfoArea>
                        <UserAvatar source={{uri: userInfo.avatar}}></UserAvatar>
                        <UserInfo>
                            <UserInfoName>{userInfo.name}</UserInfoName>
                            <Stars stars={userInfo.stars} showNumber={true}></Stars>
                        </UserInfo>
                        <UserFavButton onPress={handleFavClick}>
                            {favorited ?
                                <FavoriteFullIcon width="24" height="24" fill="#FF0000"></FavoriteFullIcon>
                                :
                                <FavoriteIcon width="24" height="24" fill="#FF0000"></FavoriteIcon>
                            }
                        </UserFavButton>
                    </UserInfoArea>
                    {loading &&
                        <LoadingIcon size="large" color="#E37C28"></LoadingIcon>
                    }
                    {userInfo.services &&
                        <ServiceArea>
                            <ServicesTitle>Lista de Serviços</ServicesTitle>
                            {userInfo.services.map((item, key) => (
                                <ServiceItem key={key}>
                                    <ServiceInfo>
                                        <ServiceName>{item.name}</ServiceName>
                                        <ServicePrice>R$ {item.price}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton>
                                        <ServiceChooseBtnText>Agendar</ServiceChooseBtnText>
                                    </ServiceChooseButton>
                                </ServiceItem>
                            ))    
                            }
                        </ServiceArea>
                    }
                    {userInfo.testimonials && userInfo.testimonials.length > 0 &&
                        <TestimonialArea>
                            <Swiper testimonials={userInfo.testimonials} />
                        </TestimonialArea>
                    }
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF"></BackIcon>
            </BackButton>
        </Container>
    );
}
