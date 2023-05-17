import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

export const ChatScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Geppeto Assistant</Text>
            </View>
            <View style={styles.chatContainer}>
                <View style={[styles.messageBubble, styles.sentMessage]}>
                    <Text style={styles.messageText}>Hello!</Text>
                </View>
                <View style={[styles.messageBubble, styles.receivedMessage]}>
                    <Text style={styles.messageText}>Hi there!</Text>
                </View>
            </View>
        </View>
    );
};
