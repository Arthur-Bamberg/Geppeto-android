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

export const ChatScreen = ({ navigateTo, idSection }) => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [recording, setRecording] = useState(false);

    useEffect(() => {
        getMessages();

        setVoiceFunctions();
    }, []);

    const setVoiceFunctions = () => {
        Voice.onSpeechStart = speechStartHandler;
        Voice.onSpeechEnd = speechEndHandler;
        Voice.onSpeechResults = speechResultsHandler;
        Voice.onSpeechError = speechErrorHandler;

        Voice.destroy().then(Voice.removeAllListeners);
    }

    const getMessages = async () => {
        const messages = await SectionService.getMessages(idSection);
        setMessages(messages);
    }

    const speechStartHandler = (e) => {
        console.log('Speech start');
    };

    const speechEndHandler = (e) => {
        console.log('Speech end');
    };

    const speechResultsHandler = (e) => {
        console.log('Speech results: ', e);
        setInputMessage(e.value[0]);
    };

    const speechErrorHandler = (e) => {
        console.log('Speech error: ', e);
    };

    const startRecognizing = async () => {
        setRecording(true);
       
        try {
            await Voice.start('pt-BR');
        } catch (e) {
            console.error(e);
        }
    }

    const startRecording = async () => {
            await startRecognizing();

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
            await Voice.stop();
            setRecording(false);
            sendMessage();
        } catch (e) {
            console.error(e);
        }
    };

    const sendMessage = async () => {
        if (inputMessage.trim().length > 0) {
            const newMessage = {
                type: 'PROMPT',
                content: inputMessage.trim(),
                idSection
            };

            const answerMessage = await MessageService.create(newMessage);

            newMessage.guidMessage = Date.now(); //unique key

            setMessages([...messages, newMessage, answerMessage]);
            setInputMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <ChatHeader actualScreen={'Chat'} navigateTo={navigateTo} />
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
                    onSubmitEditing={sendMessage}
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
