import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { ChatHeader } from '../../components/ChatHeader';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import text from './texts.json';
import { SectionService } from '../../services/SectionService';

export const ChatScreen = ({ route }) => {
    const { idSection } = route.params;

    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [recording, setRecording] = useState(null);

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        const messages = await SectionService.getMessages(idSection);
        setMessages(messages);
    }

    const startRecording = async () => {

        setRecording(true);
    };

    const stopRecording = async () => {
        setRecording(null);
    };

    const sendMessage = () => {
        const newMessage = {
            content: inputMessage.trim(),
            sender: 'sent',
        };

        setMessages([...messages, newMessage]);
        setInputMessage('');
    };

    return (
        <View style={styles.container}>
            <ChatHeader actualScreen={'Chat'} />
            <View style={styles.chatContainer}>
                <FlatList
                    style={styles.flatList}
                    data={messages}
                    keyExtractor={(index) => index.toString()}
                    renderItem={({ item: message }) => (
                        <View
                            style={[
                                styles.messageBubble,
                                message.sender === 'sent'
                                    ? styles.sentMessage
                                    : styles.receivedMessage,
                            ]}
                        >
                            <Text style={styles.messageText}>{message.content}</Text>
                        </View>
                    )}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={text.message}
                    value={inputMessage}
                    onChangeText={setInputMessage}
                />
                <TouchableOpacity
                    style={styles.recordAudio}
                    onPress={recording ? stopRecording : startRecording}
                >
                    <Ionicons
                        name={recording ? 'pause-outline' : 'mic'}
                        size={20}
                        color="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Ionicons
                        name="paper-plane-outline"
                        size={20}
                        color="white"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};
