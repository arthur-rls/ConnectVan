import {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Animated, TouchableOpacity, ScrollView, TextInput, Modal} from 'react-native'
import styles from './style'
import { FontAwesome, MaterialIcons, Entypo, FontAwesome5, Feather  } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  setDoc, doc, getDoc, updateDoc, arrayUnion, collection, query, where, getDocs, or } from 'firebase/firestore';

export default function Pesquisa ({navigation}){
    const [moto, setMoto]=useState([]);
    const [pesquisa, setPesquisa] = useState('');
    const citiesRef = collection(db, "motorista");
    const q = query(citiesRef,  
        or(where('escola', 'array-contains', pesquisa),
           where('cidade', 'array-contains', pesquisa),
           where('nome', '==', pesquisa)
        )
      );
    const pesquisar = async()=>{
        const querySnapshot = await getDocs(q);

        const arr = []
        querySnapshot.forEach((doc) => {
            const motorista = doc.data();
            const idMotorista = doc.id

            arr.push({idMotorista, ...motorista})
        });

        setMoto(arr)
    }
    return (
        <View style={styles.container}>
            <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
            <View style={styles.viewInput}>
                <TextInput style={styles.input} value={pesquisa} onChangeText={(value)=>setPesquisa(value)}/>
                <TouchableOpacity style={{marginLeft:'86%'}} onPress={()=>pesquisar()}>
                    <FontAwesome name="search" size={21} color="black" style={styles.lupa}/>
                </TouchableOpacity>
            </View> 
            <ScrollView style={styles.fundoTab} contentContainerStyle={{alignItems:'center'}}>

                {moto?(<Text style={styles.todos}>
                TODOS ({moto.length})
                </Text>):null}

                {moto.map((item) => {
                    const idM = item.idMotorista;
                    return (
                    <TouchableOpacity style={styles.botaoEscola} onPress={()=> navigation.navigate('PerfilMotorista', {idM})}>
                        <View style={styles.fundoEscola}>
                            <View style={{padding:18, flex: 1}}>
                                <Text style={styles.nomeMotorista}>{item.nome}</Text>
                            </View>
                            <View style={{flex: 1, justifyContent:'flex-end', flexDirection:'row'}}>
                                <View style={{justifyContent:'center', marginRight:'10%'}}>
                                    <TouchableOpacity>
                                        <Entypo name="chevron-right" size={23} color="black" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
};

