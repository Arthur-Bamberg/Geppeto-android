import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { ChatHeader } from '../../components/ChatHeader';
import { ErrorModal } from '../../components/ErrorModal';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import { styles } from './styles';
import text from './texts.json';
import { SectionService } from '../../services/SectionService';
import { MessageService } from '../../services/MessageService';

export const ChatScreen = ({ navigateTo, idSection }) => {
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [recording, setRecording] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

    const toggleErrorModal = () => {
		setErrorModalVisible(!errorModalVisible);
	};

    const handleError = (errorMessage) => {
		setErrorMessage(errorMessage);
		setErrorModalVisible(true);
	};

    useEffect(() => {
        if(messages.length === 0) {
            getMessages();
        }

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
        try {
            const messages = await SectionService.getMessages(idSection);
            setMessages(messages);

        } catch(error) {
            handleError(error.message);
        }
    }

    const speechStartHandler = (e) => {};

    const speechEndHandler = (e) => {};

    const speechResultsHandler = (e) => setInputMessage(e.value[0]);

    const speechErrorHandler = (e) => handleError(e.error.message);

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
    };

    const stopRecording = async () => {
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

            try {
                const answerMessage = await MessageService.create(newMessage);

                newMessage.guidMessage = Date.now(); //unique key

                setMessages([...messages, newMessage, answerMessage].reverse());
                setInputMessage('');

                Speech.speak(answerMessage.content, { language: 'pt-BR' });

            } catch(error) {
                handleError(error.message);            
            }
        }
    };

    return (
        <View style={styles.container}>
            <ChatHeader actualScreen={'Chat'} navigateTo={navigateTo} />
            <View style={styles.chatContainer}>
                <FlatList
                    inverted
                    style={styles.flatList}
                    data={messages.reverse()}
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
            <ErrorModal
				errorMessage={errorMessage}
				toggleErrorModal={toggleErrorModal}
				errorModalVisible={errorModalVisible}
			/>
        </View>
    );
};
