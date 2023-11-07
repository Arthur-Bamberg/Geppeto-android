import React from 'react';
import { View, Text } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { styles } from './styles';
import text from './texts.json';

export const SexPicker = ({ selectedSex, setSelectedSex }) => {
    return (
        <View>
            <Text style={styles.text}>{text.sex}</Text>
            <Picker
                style={styles.input}
                selectedValue={selectedSex}
                onValueChange={(itemValue, itemIndex) => setSelectedSex(itemValue)}
            >
                <Picker.Item label={text.masculine} value="M" />
                <Picker.Item label={text.feminine} value="F" />
                <Picker.Item label={text.prefer_not_to_say} value={null} />
            </Picker>
        </View>
    );
};