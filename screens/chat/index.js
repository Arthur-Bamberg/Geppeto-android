import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ChatHeader } from '../../components/ChatHeader';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';

export const ChatScreen = () => { //TODO: make receive the idChat
    const messagesMock = require("./messages.json");

    const route = useRoute();
    //const { chatId } = route.params;

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

    return ( //TODO: add voice message functionality
        <View style={styles.container}>
            <ChatHeader actualScreen={ 'Chat' } />
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
                <TouchableOpacity style={styles.recordAudio} onPress={sendMessage}>
                    <Ionicons name="mic" size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Ionicons name="paper-plane-outline" size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
};
