import { StyleSheet, TextInput, View, Text } from "react-native"
import { GlobalStyles } from "../../constants/styles";

function Input({label, textInputConfig}) {

    return(
        <View style={styles.mainContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...textInputConfig} style={styles.textInputContainer} />
        </View>
    )
}
export default Input;

const styles = StyleSheet.create({
    textInputContainer:{
        alignSelf:'center',
        minWidth: '90%',
        maxWidth: '90%',
        height: 40,
        backgroundColor: GlobalStyles.colors.primary100,
        marginTop: 8,
        borderRadius: 6,
        textAlign: 'center',
        fontSize: 17,
        color: GlobalStyles.colors.primary800,
        fontWeight: 'bold',
    },  
    label: {
        color: GlobalStyles.colors.primary100,
        fontSize: 15,
        marginTop: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    }
})