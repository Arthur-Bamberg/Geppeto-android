import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ChatHeader } from '../../components/ChatHeader';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { ErrorModal } from '../../components/ErrorModal';
import { Ionicons } from '@expo/vector-icons';
import { SectionService } from '../../services/SectionService';

export const ChatMenuScreen = ({navigateTo, setIdSection}) => {
    const [sections, setSections] = useState([]);

    const [loading, setLoading] = useState(false);

    const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

    const toggleErrorModal = () => {
		setErrorModalVisible(!errorModalVisible);
	};

    const handleError = (errorMessage) => {
		setErrorMessage(errorMessage);
		setErrorModalVisible(true);
	};

    useEffect(() => {
        getSections();
    }, []);

    const getSections = async () => {
        try {
            setLoading(true);

            const sections = await SectionService.get();
            setSections(sections);

            setLoading(false);
        } catch (error) {
            setLoading(false);

            handleError(error.message);
            await SectionService.logout();
            navigateTo('login');
        }
    };

    const deleteSections = async (idSection) => {
        setLoading(true);

        try {
            await SectionService.delete(idSection);

            const newSections = sections.filter((section) => section.idSection != idSection);
            setSections(newSections);

            setLoading(false);

        } catch (error) {
            setLoading(false);

            handleError(error.message);
        }
    };

    const createSection = async () => {
        setLoading(true);

        try {
            const section = await SectionService.create();
            setSections([...sections, section]);
            setIdSection(section.idSection);

            setLoading(false);

            navigateTo('chat');

        } catch (error) {
            setLoading(false);
            handleError(error.message);
        }
    };

    const navigateToChat = (idSection) => {
        setIdSection(idSection);
        navigateTo('chat');
    }

    return (
        <View style={styles.container}>
            <ChatHeader actualScreen={ 'ChatMenu' } navigateTo={navigateTo}/>
            <FlatList
                style={styles.chatItemsContainer}
                data={sections}
                keyExtractor={(section) => section.idSection.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={()=> navigateToChat(item.idSection)} >
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            style={styles.chatIcon}
                            size={30} />
                        <Text numberOfLines={1} style={styles.chatText}>
                            <Text style={styles.nameHighlight}>{item.name}:</Text> {item.lastMessage.content != undefined ? item.lastMessage.content : ''}
                        </Text>
                        <Ionicons
                            name="trash"
                            style={styles.trashIcon}
                            onPress={() => deleteSections(item.idSection)}
                            size={30} />
                    </TouchableOpacity>
                )}
            />
            {loading && <LoadingAnimation />}
            <TouchableOpacity
                style={styles.plusButton}
                onPress={createSection}>
                <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
            <ErrorModal
				errorMessage={errorMessage}
				toggleErrorModal={toggleErrorModal}
				errorModalVisible={errorModalVisible}
			/>
        </View>
    );
};
