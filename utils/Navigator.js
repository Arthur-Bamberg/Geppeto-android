import { useNavigation } from '@react-navigation/native';

export const useNavigator = () => {
    const navigation = useNavigation();

    const navigateTo = (screenName, dataObject) => {
        navigation.navigate(screenName, dataObject);
    };

    const navigateToChat = (idSection) => {
        navigateTo('Chat', { idSection });
    };

    const navigateToChatMenu = () => {
        navigateTo('ChatMenu');
    };

    const navigateToLogin = () => {
        navigateTo('Login');
    };

    return {
        navigateToChat,
        navigateToChatMenu,
        navigateToLogin
    };

};