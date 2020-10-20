import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { normalize } from '../core/size';

const BackButton = ({ goBack }) => (
    <TouchableOpacity onPress={goBack} style={styles.container}>
        <Image
            style={styles.image}
            source={require('../assets/arrow_back.png')}
        />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: normalize(10 + getStatusBarHeight()),
        left: normalize(10),
    },
    image: {
        width: normalize(24),
        height: normalize(24),
    },
});

export default memo(BackButton);
