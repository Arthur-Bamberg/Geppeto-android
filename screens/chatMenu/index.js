import React from 'react';
import { styles } from './styles';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigator } from '../../utils/Navigator';
import { ChatHeader } from '../../components/ChatHeader';
import { Ionicons } from '@expo/vector-icons';

const chats = require('./chats.json');

export const ChatMenuScreen = () => {
    const navigator = useNavigator();

    return (
        <View style={styles.container}>
            <ChatHeader actualScreen={ 'ChatMenu' }/>
            <FlatList
                style={styles.chatItemsContainer}
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.chatItem} 
                        onPress={()=> navigator.navigateToChat(item.id)} >
                        <Ionicons 
                            name="chatbubble-ellipses-outline" 
                            style={styles.chatIcon} 
                            size={30} />
                        <Text style={styles.chatText}>
                            <Text style={styles.nameHighlight}>{item.name}</Text>: {item.lastMessage}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <TouchableOpacity 
                style={styles.plusButton} 
                onPress={()=> navigator.navigateToChat(0)}>
                <Text style={styles.plusText}>+</Text>
            </TouchableOpacity>
        </View>
    );
};
