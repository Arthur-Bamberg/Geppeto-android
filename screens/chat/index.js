import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { ChatHeader } from '../../components/ChatHeader';
import { Ionicons } from '@expo/vector-icons';
// import { Audio } from 'expo-av';
import Voice from '@react-native-voice/voice';
import { styles } from './styles';
import text from './texts.json';
import { SectionService } from '../../services/SectionService';
import { MessageService } from '../../services/MessageService';

export const ChatScreen = ({ route }) => {
    const { idSection } = route.params;

    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [recording, setRecording] = useState(null);

    Voice.onSpeechStart = () => console.log('started');
    Voice.onSpeechEnd = () => console.log('ended');
    Voice.onSpeechResults = (e) => {
        console.log(e);
    };
    Voice.onSpeechError = (e) => console.error(e);

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        const messages = await SectionService.getMessages(idSection);
        setMessages(messages);
    }

    const startRecording = async () => {
        try {
            await Voice.start('pt-BR');
          } catch (e) {
            console.error(e);
          }

        // await Audio.requestPermissionsAsync();
        // const { recording } = await Audio.Recording.createAsync(
        //     Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        // );

        // setRecording(recording);
    };

    const stopRecording = async () => {
        // setRecording(undefined);
        // await recording.stopAndUnloadAsync();
        // const uri = recording.getURI();

        try {
            // await Voice.stop();
            setRecording(null);
          } catch (e) {
            console.error(e);
          }
    };

    const sendMessage = async () => {
        const newMessage = {
            type: 'PROMPT',
            content: inputMessage.trim(),
            idSection,
        };

        const answerMessage = await MessageService.create(newMessage);

        setMessages([...messages, newMessage, answerMessage]);
        setInputMessage('');
    };

    return (
        <View style={styles.container}>
            <ChatHeader actualScreen={'Chat'} />
            <View style={styles.chatContainer}>
                <FlatList
                    style={styles.flatList}
                    data={messages}
                    keyExtractor={(message) => message.guidMessage}
                    renderItem={({ item: message }) => (
                        <View
                            style={[
                                styles.messageBubble,
                                message.type === 'PROMPT'
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
