import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigator } from '../../utils/Navigator';
import { ChatHeader } from '../../components/ChatHeader';
import { Ionicons } from '@expo/vector-icons';
import { SectionService } from '../../services/SectionService';

export const ChatMenuScreen = () => {
    const navigator = useNavigator();

    const [sections, setSections] = useState([]);

    useEffect(() => {
        getSections();
    }, []);

    const getSections = async () => {
        try {
            const sections = await SectionService.get();
            setSections(sections);
        } catch (error) {
            await SectionService.logout();
            navigator.navigateToLogin();
        }
    };

    const deleteSections = async (idSection) => {
        await SectionService.delete(idSection);

        const newSections = sections.filter((section) => section.idSection != idSection);
        setSections(newSections);
    };

    const createSection = async () => {
        const section = await SectionService.create();
        setSections([...sections, section]);
        navigator.navigateToChat(section.idSection);
    };

    return (
        <View style={styles.container}>
            <ChatHeader actualScreen={ 'ChatMenu' }/>
            <FlatList
                style={styles.chatItemsContainer}
                data={sections}
                keyExtractor={(section) => section.idSection.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.chatItem}
                        onPress={()=> navigator.navigateToChat(item.idSection)} >
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
            <TouchableOpacity
                style={styles.plusButton}
                onPress={createSection}>
                <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};
