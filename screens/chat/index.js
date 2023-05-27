import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export const ChatScreen = () => {
    const messagesMock = require("../../messages.json");

    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState(messagesMock);

    const sendMessage = () => {
        if (inputMessage.trim() === '') return;

        const newMessage = {
            content: inputMessage.trim(),
            sender: 'sent',
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Ionicons name="arrow-back-outline" style={styles.backMenu} size={30} color="white" />
                <Text style={styles.headerText}>Geppeto Assistant</Text>
            </View>
            <View style={styles.chatContainer}>
                {messages.map((message, index) => (
                    <View
                        key={index}
                        style={[
                            styles.messageBubble,
                            message.sender === 'sent' ? styles.sentMessage : styles.receivedMessage,
                        ]}
                    >
                        <Text style={styles.messageText}>{message.content}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChangeText={setInputMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Ionicons name="paper-plane-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
