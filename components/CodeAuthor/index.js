import React from 'react';
import { styles } from './styles';
import { Text, TouchableOpacity, Linking } from 'react-native';

export const CodeAuthor = () => {
    const openLink = () => {
        const url = 'https://www.linkedin.com/in/arthur-bamberg/';

        Linking.openURL(url);
    };

    return (
        <TouchableOpacity style={styles.button} onPress={openLink}>
            <Text style={styles.text}>Desenvolvido por Arthur Bamberg.</Text>
        </TouchableOpacity>
    );
};