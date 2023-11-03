import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput } from 'react-native';
import { styles } from './styles';
import { colors } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

export const TextInputModal = ({ TextInputMessage, toggleTextInputModal, TextInputModalVisible, setVisible }) => {
    const textInputRef = useRef(null);
    const [textInputValue, setTextInputValue] = useState('');

    useEffect(() => {
        if(textInputRef.current) {
            textInputRef.current.focus();
        }
    }, [TextInputModalVisible]);

    const handleAccept = () => {
        toggleTextInputModal(textInputValue);
        setTextInputValue('');
        setVisible(false);
    }

return (
        <Modal visible={TextInputModalVisible} animationType="slide" transparent={true}>
            <View style={styles.TextInputModalContainer}>
                <View style={styles.TextInputModalContent}>
                <Ionicons name="pencil-outline" size={48} color={colors.header} style={styles.warningIcon} />
                    <Text style={styles.TextInputText}>{TextInputMessage}</Text>
                    <TextInput 
                        style={styles.inputText}
                        value={textInputValue}
                        onChangeText={setTextInputValue}
                        onSubmitEditing={handleAccept}
                        ref={textInputRef}
                        maxLength={50} />
                    <View style={styles.viewButtons}>
                        <TouchableOpacity title="Accept" style={[styles.button, styles.buttonAccept]} onPress={handleAccept}>
                            <Ionicons name="checkmark-outline" size={24} color="white" style={styles.text} />
                        </TouchableOpacity>
                        <TouchableOpacity title="Deny" style={[styles.button, styles.buttonDeny]} onPress={()=> setVisible(false)}>
                            <Ionicons name="close-outline" size={24} color="white" style={styles.text} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

