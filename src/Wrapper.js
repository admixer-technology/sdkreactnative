import React from "react";
import { StyleSheet, View } from "react-native";

export default Wrapper = (props) => {
    return (
        <View
            {...props}
            style={styles.container}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent'
    }
});