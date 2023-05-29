import React from 'react';
import { styles } from './styles';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { ChatHeader } from '../../components/ChatHeader';
import { Ionicons } from '@expo/vector-icons';

const chats = require('./chats.json');

export const ChatMenuScreen = () => {
    return (
        <View style={styles.container}>
            <ChatHeader />
            <FlatList
                style={styles.chatItemsContainer}
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.chatItem}>
                        <Ionicons name="chatbubble-ellipses-outline" style={styles.chatIcon} size={30} />
                        <Text style={styles.chatText}>
                            <Text style={styles.nameHighlight}>{item.name}</Text>: {item.lastMessage}
                        </Text>
                    </View>
                )}
            />
            <TouchableOpacity style={styles.plusButton}>
                <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};
