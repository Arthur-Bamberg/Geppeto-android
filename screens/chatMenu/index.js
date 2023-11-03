import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ChatHeader } from '../../components/ChatHeader';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { ErrorModal } from '../../components/ErrorModal';
import { TextInputModal } from '../../components/TextInputModal';
import { Ionicons } from '@expo/vector-icons';
import { SectionService } from '../../services/SectionService';
import text from './texts.json';

export const ChatMenuScreen = ({navigateTo, setIdSection}) => {
    const [sections, setSections] = useState([]);

    const [loading, setLoading] = useState(false);

    const [isEditing, setIsEditing] = useState(false);

    const [idSectionEditing, setIdSectionEditing] = useState(null);

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

    const updateSection = async (name) => {
        if(name.trim() != '') {
            setLoading(true);

            try {
                await SectionService.update(idSectionEditing, name);

                const newSections = sections.map((section) => {
                    if(section.idSection == idSectionEditing) {
                        section.name = name;
                    }
                    return section;
                });
                setSections(newSections);

                setLoading(false);

            } catch (error) {
                setLoading(false);

                handleError(error.message);
            }
        }
    };

    const clickIsEditing = (idSection) => {
        setIdSectionEditing(idSection);
        setIsEditing(true);
    }

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
                        onPress={()=> !isEditing && navigateToChat(item.idSection)} >
                        <Ionicons
                            name="chatbubble-ellipses-outline"
                            style={styles.chatIcon}
                            size={30} />
                        <Text numberOfLines={1} style={styles.chatText}>
                            <Text>
                                <Text style={styles.nameHighlight}>{item.name}: </Text> 
                                {item.lastMessage != undefined ? item.lastMessage : ''}
                            </Text>
                        </Text>
                        <View style={styles.iconsView}>
                            <Ionicons
                                name="pencil-outline"
                                style={styles.pencilIcon}
                                onPress={()=> clickIsEditing(item.idSection)}
                                size={30} />
                            <Ionicons
                                name="trash-outline"
                                style={styles.trashIcon}
                                size={30}
                                onPress={() => deleteSections(item.idSection)} />
                        </View>
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
            <TextInputModal
				TextInputMessage={text.newSectionName}
				toggleTextInputModal={updateSection}
				TextInputModalVisible={isEditing}
                setVisible={setIsEditing}
			/>
        </View>
    );
};
