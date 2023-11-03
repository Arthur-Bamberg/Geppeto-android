import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import { ChatHeader } from '../../components/ChatHeader';
import { LoadingAnimation } from '../../components/LoadingAnimation';
import { ErrorModal } from '../../components/ErrorModal';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import Voice from '@react-native-voice/voice';
import { styles } from './styles';
import text from './texts.json';
import { SectionService } from '../../services/SectionService';
import { MessageService } from '../../services/MessageService';

export const ChatScreen = ({ navigateTo, idSection }) => {
    const [loading, setLoading] = useState(false);

    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [recording, setRecording] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

    const toggleErrorModal = () => {
		setErrorModalVisible(!errorModalVisible);
	};

    const copyToClipboard = async (message) => {
        await Clipboard.setStringAsync(message);
    }

    const handleError = (errorMessage) => {
		setErrorMessage(errorMessage);
		setErrorModalVisible(true);
	};

    useEffect(() => {
        if(messages.length === 0) {
            getMessages();

        } else {
            setMessages(messages);
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
            setLoading(true);

            const messages = await SectionService.getMessages(idSection);
            setMessages(messages.reverse());

            setLoading(false);

        } catch(error) {
            setLoading(false);
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

            setLoading(false);

        } catch (e) {
            setLoading(false);

            handleError(e.message);
        }
    }

    const startRecording = async () => {
        setLoading(true);

        await startRecognizing();

        setLoading(false);
    };

    const stopRecording = async () => {
        try {
            setLoading(true);

            await Voice.stop();
            setRecording(false);

            setLoading(false);

        } catch (e) {
            handleError(e.message);
        }
    };

    const sendMessage = async () => {
        if (inputMessage.trim().length > 0 && !loading) {
            const newMessage = {
                guidMessage: Date.now(), // fake guid, used only to show the message in the screen
                type: 'PROMPT',
                content: inputMessage.trim(),
                idSection
            };

            try {
                setLoading(true);

                setInputMessage('');

                setMessages([...messages.reverse(), newMessage].reverse());

                const answerMessage = await MessageService.create(newMessage);

                setMessages([...messages, newMessage, answerMessage].reverse());

                setLoading(false);

                Speech.speak(answerMessage.content, 
                    {
                        language: 'pt-BR',
                        voice: 'pt-br-x-afs#male_3-local',
                        rate: 1.5
                    }
                );

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
                    data={messages}
                    keyExtractor={(message) => message.guidMessage}
                    renderItem={({ item: message }) => (
                        <TouchableOpacity
                            style={[
                                styles.messageBubble,
                                message.type === 'PROMPT'
                                    ? styles.sentMessage
                                    : styles.receivedMessage,
                            ]}
                            onLongPress={() => copyToClipboard(message.content)}
                        >
                            <Text style={styles.messageText}>{message.content}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {loading && <LoadingAnimation />}
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
