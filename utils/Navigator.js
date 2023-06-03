import { useNavigation } from '@react-navigation/native';

export const useNavigator = () => {
    const navigation = useNavigation();

    const navigateTo = (screenName) => {
        navigation.navigate(screenName);
    };

    const navigateToChat = (chatId) => {
        navigateTo('Chat', { chatId });
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