import {requestForegroundPermissionsAsync, getCurrentPositionAsync} from 'expo-location'
import BottomSheet from 'react-native-simple-bottom-sheet'
import { useEffect, useState, useRef } from 'react'
import styles from './style'
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView, Linking, FlatList} from 'react-native'
import {MapView, Marker} from 'react-native-maps';
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  doc, getDoc, collection, where, query, collectionGroup} from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { Entypo, FontAwesome, Ionicons} from '@expo/vector-icons';

export default function Acompanhar ({navigation}){
    useEffect(()=>{
        
    },[])

    const reload=()=>{
        onAuthStateChanged(auth, async (user)=>{
            
        })
    }
    return(
        <View>
            <MapView style={{width:'100%', height:'100%'}}>
            <Marker
                coordinate={{latitude: lati, longitude: longi}}
                />
            </MapView>
            <TouchableOpacity onPress={()=>reload()}>
                <Text>Abrir</Text>
            </TouchableOpacity>
        </View>
    )
}