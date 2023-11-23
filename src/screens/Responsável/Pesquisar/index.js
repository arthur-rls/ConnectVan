import {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, Animated, TouchableOpacity, ScrollView, TextInput, Modal} from 'react-native'
import styles from './style'
import { FontAwesome, MaterialIcons, Entypo, FontAwesome5, Feather  } from '@expo/vector-icons';
import { onAuthStateChanged } from 'firebase/auth';
import {db, auth} from '../../../firebase/config';
import {  setDoc, doc, getDoc, updateDoc, arrayUnion, collection, query, where, getDocs, or } from 'firebase/firestore';

export default function Pesquisa ({navigation}){
    const [moto, setMoto]=useState([]);
    const [verify, setVerify] = useState(0)
    const [pesquisa, setPesquisa] = useState('');
    const citiesRef = collection(db, "motorista");
    const q = query(citiesRef,  
        or(where('escola', 'array-contains', pesquisa),
           where('cidade', 'array-contains', pesquisa),
           where('nome', '==', pesquisa)
        )
      );
    const pesquisar = async()=>{
        setVerify(1)
        const querySnapshot = await getDocs(q);

        const arr = []
        querySnapshot.forEach((doc) => {
            console.log(doc)
            const motorista = doc.data();
            const idMotorista = doc.id

            arr.push({idMotorista, ...motorista})
        });

        setMoto(arr)
    }

    useEffect(()=>{
        setVerify(0)
    },[])

    if(verify==0){
        return (
            <View style={styles.container}>
                <Image source={require('../../../../assets/gradient.png')} style={{width:'100%', height:'100%', position:'absolute'}}/>
                <View style={styles.viewInput}>
                    <TextInput style={styles.input} value={pesquisa} onChangeText={(value)=>setPesquisa(value)}/>
                    <TouchableOpacity style={{marginLeft:'86%'}} onPress={()=>pesquisar()}>
                        <FontAwesome name="search" size={21} color="black" style={styles.lupa}/>
                    </TouchableOpacity>
                </View> 
                <ScrollView style={styles.fundoTab} contentContainerStyle={{justifyContent:'center'}}>
                    <View styles={{flex:0.5, backgroundColor:'red', paddingVertical:'50%'}}>
                        <Text style={[styles.mensagem, {marginVertical:'80%'}]}>Pesquise por cidades</Text>
                        <Text style={styles.mensagem}>e escolas a qual deseja</Text>
                        <Text style={styles.mensagem}>atendimento, e até mesmo</Text>
                        <Text style={styles.mensagem}>por motoristas!</Text>
                    </View>
                </ScrollView>
            </View>
        );
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
            <ScrollView style={styles.fundoTab} contentContainerStyle={{justifyContent:'center', alignItems:'center'}}>

                {moto.length!=0?(<Text style={styles.todos}>
                TODOS ({moto.length})
                </Text>):null}

                {moto.length==0?(
                <View styles={{flex:0.5, backgroundColor:'red', paddingVertical:'50%'}}>
                    <Text style={[styles.mensagem, {marginVertical:'80%'}]}>Nenhum resultado</Text>
                    <Text style={styles.mensagem}>encontrado, verifique se</Text>
                    <Text style={styles.mensagem}>tudo foi escrito</Text>
                    <Text style={styles.mensagem}>corretamente.</Text>
                </View>
                ):null}

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

