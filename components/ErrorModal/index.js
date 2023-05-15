import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

export const ErrorModal = ({ errorMessage, toggleErrorModal, errorModalVisible }) => {
    return (
        <Modal visible={errorModalVisible} animationType="slide" transparent={true}>
            <View style={styles.errorModalContainer}>
                <View style={styles.errorModalContent}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                    <Ionicons name="warning-outline" size={48} color="yellow" style={styles.warningIcon} />
                    <TouchableOpacity title="Close" style={styles.button} onPress={toggleErrorModal}>Close</TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

