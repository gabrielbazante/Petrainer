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
         HandleSubmitDateAndTime,
         HandleSubmitDateAndTimeText,
         BackButton } from "./styles";

import { default as Api } from "../../Api";

import Swiper from "../../components/Swiper";
import Stars from "../../components/Stars";
import TrainerModal from "../../components/TrainerModal";

import FavoriteIcon from "../../assets/favorite.svg";
import FavoriteFullIcon from "../../assets/favorite_full.svg";
import BackIcon from "../../assets/back.svg";

const available = [
    {
      date: '2023-08-02',
      hours: ['08:00', '09:00', '10:00', '11:00', '22:00'],
    },
    {
      date: '2023-08-03',
      hours: ['14:00', '15:00', '16:00', '17:00', '22:00'],
    },
    {
      date: '2023-08-04',
      hours: ['09:00', '10:00', '15:00', '18:00', '22:00'],
    },
    {
      date: '2023-08-05',
      hours: ['07:00', '08:00', '11:00', '16:00', '22:00'],
    },
    {
      date: '2023-08-06',
      hours: ['08:00', '09:00', '10:00', '11:00', '22:00'],
    },
    {
      date: '2023-08-07',
      hours: ['08:00', '09:00', '10:00', '11:00', '22:00'],
    },
    {
      date: '2023-08-08',
      hours: ['08:00', '09:00', '10:00', '11:00', '22:00'],
    },
    {
      date: '2023-08-09',
      hours: ['09:00', '10:00', '11:00', '12:00', '22:00'],
    },
    {
      date: '2023-08-10',
      hours: ['14:00', '15:00', '16:00', '17:00', '22:00'],
    },
    {
      date: '2023-08-11',
      hours: ['08:00', '09:00', '10:00', '11:00', '22:00'],
    },
    {
      date: '2023-08-12',
      hours: ['13:00', '14:00', '15:00', '16:00', '22:00'],
    },
    {
      date: '2023-08-13',
      hours: ['08:00', '09:00', '10:00', '11:00', '22:00'],
    },
    {
      date: '2023-08-14',
      hours: ['08:00', '09:00', '10:00', '11:00', '22:00'],
    },
    {
      date: '2023-08-15',
      hours: ['08:00', '09:00', '10:00', '11:00', '22:00'],
    },
    {
      date: '2023-08-17',
      hours: ['10:00', '13:00', '16:00', '17:00', '22:00'],
    },
    {
      date: '2023-08-20',
      hours: ['18:00', '19:00', '20:00', '21:00', '22:00'],
    },
    {
      date: '2023-08-28',
      hours: ['05:00', '06:00', '08:00', '15:00', '22:00'],
    },
  ];
  

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
    const [selectedService, setSelectedService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const getTrainerInfo = async () => {
          setLoading(true);
          try {
            const trainer = await Api.getTrainer(userInfo.id);
            if (trainer) {
              const servicesArray = Object.values(trainer.services);
              const testimonialsArray = Object.values(trainer.testimonials);
              const availableArray = Object.values(trainer.available);
              setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                services: servicesArray,
                testimonials: testimonialsArray,
                favorited: favorited,
                available: availableArray,
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
    const HandleSubmitDateAndHour = () => {
        Api.addItemsToAvailable(userInfo.id, available);
    }

    const handleServiceChoose = (key) => {
        setSelectedService(key);
        setShowModal(true);
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
                                        <ServicePrice>R$ {item.price.toFixed(2)}</ServicePrice>
                                    </ServiceInfo>
                                    <ServiceChooseButton onPress={() => handleServiceChoose(key)}>
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
                    <HandleSubmitDateAndTime onPress={HandleSubmitDateAndHour}>
                        <HandleSubmitDateAndTimeText>Update</HandleSubmitDateAndTimeText>
                    </HandleSubmitDateAndTime>
                </PageBody>
            </Scroller>
            <BackButton onPress={handleBackButton}>
                <BackIcon width="44" height="44" fill="#FFFFFF"></BackIcon>
            </BackButton>

            <TrainerModal 
                show={showModal}
                setShow={setShowModal}
                user={userInfo}
                service={selectedService}
            />
        </Container>
    );
}
