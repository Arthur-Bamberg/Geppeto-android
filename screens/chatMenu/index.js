import React from 'react';
import { styles } from './styles';
import { View, Text, FlatList } from 'react-native';

const chats = [
    { id: '1', name: 'Chat 1' },
    { id: '2', name: 'Chat 2' },
    { id: '3', name: 'Chat 3' },
];

export const ChatMenuScreen = () => {
    return (
        <View style={styles.container}>
            <FlatList
                data={chats}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.chatItem}>
                        <Text style={styles.chatName}>{item.name}</Text>
                    </View>
                )}
            />
        </View>
    );
};
