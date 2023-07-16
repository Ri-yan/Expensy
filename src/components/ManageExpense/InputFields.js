import {
    StyleSheet,
    View,
    TextInput,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
    Alert,
  } from "react-native";
  import { useEffect, useState } from "react";
  import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
  export default function InputFields({label,textInputConfig}) {
    const inputStyles=[styles.input]
    if(textInputConfig && textInputConfig.multiline){
        inputStyles.push(styles.inputMultiLine)
    }
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{label}</Text>
        <TextInput  style={inputStyles} {...textInputConfig}/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:8,
        flex:1
    },
    label:{
        fontSize:12,
        color:Colors.secondaryNav,
        marginBottom:4,
    },
    input:{
        backgroundColor:Colors.primaryBackground,
        color:Colors.secondaryNav,
        padding:6,
        borderRadius:6,
        fontSize:16
    },
    inputMultiLine:{
        minHeight:100,
        textAlignVertical:'top'
    }
  });
  