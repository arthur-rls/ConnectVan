import React, {useState} from 'react';
import {View, Text,Image,  TouchableOpacity, TextInput, Modal, ScrollView} from 'react-native'
import styles from './style'
import { FontAwesome, MaterialIcons, Entypo, Feather, Foundation } from '@expo/vector-icons';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { auth, db } from '../../../../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  setDoc, doc,  } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';

export default function CadastroResponsavel ({navigation}) {
    const [emailU, setEmailU] = useState('')
    const [telefoneU, setTelefoneU] = useState('')
    const [nomeU, setNomeU] = useState('')
    const [password, setPassword] = useState('')
    const [showElement, setShowElement] = useState(false)
    const [showElementNome, setShowElementNome] = useState(false)
    const [showElementSenha, setShowElementSenha] = useState(false)
    const [showElementTelefone, setShowElementTelefone] = useState(false)
    const [showElement2, setShowElement2] = useState(false)
    const [selection, setSelection] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisible2, setModalVisible2] = useState(false)
 
    async function createUser(){
        if (password.length>=8 && telefoneU.length==15 && emailU!=''&& nomeU!='' && selection ){
                await createUserWithEmailAndPassword(auth, emailU, password)
                .then(()=>{
                    onAuthStateChanged(auth, (user) => {
                        if (user) {
                            const uid = user.uid;
                            setDoc(doc(db, 'responsavel', uid), {nome:nomeU, email: emailU, telefone:telefoneU, mensalidade:0})
                            navigation.navigate('alunoCadastro');
                        }
                    });         
                })
                .catch(error => setShowElement(true))
        }
        else{
            if(!selection){
                setShowElement2(true)
            }
            if(password.length<8){
                setShowElementSenha(true)
            }
            if(telefoneU.length<15){
                setShowElementTelefone(true)
            }
            if(emailU==''){
                setShowElement(true)
            }
            if(nomeU==''){
                setShowElementNome(true)
            }
        }
    }

    const check = () => {
        selection ? setSelection(false) : setSelection(true);
        setShowElement2(false); 
    }
    async function google(){
        
    }
    return(
        <KeyboardAwareScrollView style={{backgroundColor:'white'}}>
            <View style={{flex:6, paddingHorizontal: 40, backgroundColor: 'white', alignItems: 'center'}}>
                <View style={styles.tela}>
                    <Text style={styles.h1}>Crie sua conta!</Text>
                </View>
                <View style={{ width:'100%', paddingVertical:5}}>
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5}}>
                        <FontAwesome name="user" size={20} color="#4D4D4D" style={showElementNome ? [styles.iconErro, {marginLeft:14}]:[styles.icon, {marginLeft:14}]}/>
                        <TextInput style={showElementNome ? styles.inputErro : styles.input} placeholder="Nome de usuário" value={nomeU} onChangeText={value => setNomeU(value)} inputMode='text'/>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5}}>
                        <Entypo name="email" size={18} color="#4D4D4D" style={showElement ? [styles.iconErro, {marginLeft:11}]: [styles.icon, {marginLeft:10,}]}/>
                        <TextInput style={showElement ? styles.inputErro : styles.input} placeholder="Email" onChangeText={value => setEmailU(value)} value={emailU} autoCapitalize='none' autoComplete='email' keyboardType='email-address'/>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5}}>
                        <Foundation name="telephone" size={20} color="#4D4D4D" style={showElementTelefone ? [styles.iconErro, {marginLeft:14}]: [styles.icon, {marginLeft:14}]}/>
                        <TextInputMask style={showElementTelefone ? styles.inputErro : styles.input} placeholder="Telefone" value={telefoneU} onChangeText={value => setTelefoneU(value)} maxLength={15} type={'cel-phone'}options={{maskType: 'BRL', withDDD: true, dddMask: '(99) '}}/>
                    </View>
                    <View style={{flexDirection:'row', alignItems:'center', paddingVertical:5}}>
                        <MaterialIcons name="lock" size={20} color="#4D4D4D" style={showElementSenha ? styles.iconErro : styles.icon}/>
                        <TextInput style={showElementSenha ? styles.inputErro : styles.input} placeholder="Senha" onChangeText={value => setPassword(value)} value={password} secureTextEntry autoCapitalize='none'/>
                    </View>
                </View>
                <View style={{ width: '100%', flexDirection:'row', paddingTop:5, paddingHorizontal:7}}>
                    <BouncyCheckbox
                    size={28}
                    fillColor= {showElement2? '#f02929' : "#FFBF00"} 
                    unfillColor="#FFFFFF"
                    iconStyle={{ borderColor: "back"}}
                    innerIconStyle={{ borderWidth: 2 }}
                    onPress={()=>check()}
                    />
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontFamily:'AileronR', fontSize:14, paddingTop:7, marginLeft:-5}}>Aceito os </Text>
                        <Text style={{fontFamily:'AileronR', fontSize:14, textDecorationLine: "underline", color:'#1877F2', paddingTop:7}} onPress={()=>setModalVisible2(true)}>Termos de Uso </Text>
                        <Text style={{fontFamily:'AileronR', fontSize:14, paddingTop:7}}>e </Text>
                        <Text style={{fontFamily:'AileronR', fontSize:14, textDecorationLine: "underline", color:'#1877F2', paddingTop:7}} onPress={()=>setModalVisible(true)}>Política de Privacidade</Text>
                    </View>
                </View>
                <View style={{ width:'100%', alignItems:'center', paddingVertical:10}}>
                    <TouchableOpacity style={styles.botao} onPress={() => createUser()}>
                        <Image source={require('../../../../../../assets/gradient.png')} style={styles.gradient}/>
                        <Text style={{fontFamily:'AileronR', fontSize:17, position:'absolute', fontWeight:'bold'}}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
                <View style={{position:'absolute', marginTop:40, width:'110%'}}>
                    {showElement==true ? (
                        <View style={styles.errOuIncorr}>
                            <TouchableOpacity onPress={()=>setShowElement(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Endereço de email inválido ou existente.</Text>
                        </View>
                    ):null}
                    {showElementSenha==true ? (
                        <View style={styles.errOuIncorr}>
                            <TouchableOpacity onPress={()=>setShowElementSenha(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Insira uma senha de no mínimo 8 dígitos.</Text>
                        </View>
                    ):null}
                    {showElementTelefone==true ? (
                        <View style={styles.errOuIncorr}>
                            <TouchableOpacity onPress={()=>setShowElementTelefone(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Insira um número exitente.</Text>
                        </View>
                    ):null}
                    {showElementNome==true ? (
                        <View style={styles.errOuIncorr}>
                            <TouchableOpacity onPress={()=>setShowElementNome(false)}>
                                <Feather name="x" size={20} color="white" />
                            </TouchableOpacity>
                            <Text style={{fontFamily:'AileronR', fontSize:16, color:'white'}}>Insira um nome.</Text>
                        </View>
                    ):null}
                </View>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{position:'absolute', padding:10}}>
                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                                    <Feather name="x" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                                <Text style={{fontFamily:'AileronH', fontSize:20, paddingVertical:10}}>
                                    Política de Privacidade
                                </Text>
                                <Text style={[styles.politica, {marginBottom:-18}]}>
                                    Este aviso de privacidade tem por finalidade demonstrar o nosso compromisso com a sua privacidade, com a proteção de seus dados e com seus direitos previstos na LGPD (Lei Geral de Proteção de Dados – 13.709/2018).
                                </Text>
                                <Text style={styles.politica}>
                                    A proteção da privacidade e dos dados pessoais é parte dos nossos valores, em complemento à valorização das pessoas que participam, de alguma forma, de nossa jornada empresarial.
                                </Text>
                                <Text style={styles.politica}>
                                    Aqui vamos descrever quais dados pessoais seus poderemos coletar, as finalidades para a coleta desses dados e os tipos de tratamento de dados pessoais que podemos executar, a depender de seu relacionamento conosco, além de exemplificar as medidas que adotamos para a adequada proteção dos seus dados.
                                </Text>
                                <Text style={styles.politica}>
                                    Informamos, ainda, quais são os seus direitos, como titular dos dados pessoais, de requerer de nós, ConnectVan, e como você pode nos contatar para exercer tais direitos. Esses direitos estão elencados no Art. 18 da LGPD, mas vamos apresentá-los a você mais adiante neste documento.
                                </Text>    
                                <Text style={{fontFamily:'AileronH', fontSize:18, paddingTop:17, paddingBottom:10}}>
                                    Informações importantes
                                </Text>
                                <Text style={styles.politica}>
                                    O que são, Dados Pessoais
                                </Text>
                                <Text style={styles.politica}>
                                    São todos aqueles relacionados a você, como pessoa natural, ou pessoa física como conhecemos. Ou seja, todo e qualquer dado que te identifique ou permita a sua identificação, como por exemplo, seu nome, CPF, e-mail, telefone, endereço, dentre outros.
                                </Text>
                                <Text style={styles.politica}>
                                    Dados Pessoais Sensíveis são aqueles relacionados à origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou à organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, quando vinculados a você.
                                </Text>
                                <Text style={styles.politica}>
                                    Como falamos que trataremos de seus dados pessoais, é importante saber o que é esse Tratamento. É simples: tratamento é qualquer operação realizada com seus dados pessoais, como a coleta, produção, recepção, classificação, utilização, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração.
                                </Text>
                                <Text style={styles.politica2}>
                                    Quando coletamos seus dados pessoais
                                </Text>
                                <Text style={styles.politica}>
                                    É importante saber que nós só coletamos seus dados pessoais quando é necessário para atingir as finalidades decorrentes da relação que temos com você. Assim, poderemos coletar alguns dos seus dados pessoais, que poderá ser por motivo de nossa relação trabalhista, consumerista, contratual, de fornecimento de produtos ou serviços, de parceria ou outros tipos de relacionamento. Cada tipo de relacionamento requer diferentes tipos de dados, para diferentes finalidades.
                                </Text>
                                <Text style={styles.politica}>
                                    Então, a depender do caso, poderemos coletar os seus dados pessoais quando você:                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Contratar nossos serviços;                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Oficializar uma relação contratual de parceria - motoristas;                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Utilizar nossos serviços ou Aplicativo (App);                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Participar de campanhas de marketing da ConnectVan;                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Formalizar processos comerciais e financeiros;                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Realizar alguma interação com anúncios, sites, aplicativos e meios digitais; dentre tantos outros casos possíveis.                               
                                </Text>
                                <Text style={styles.politica}>
                                    Além dos seus dados pessoais, iremos coletar por exemplo, de seu cônjuge ou filhos, por ser necessário para atingirmos um objetivo específico, como transportar seu filho com segurança e manter comunicação do seus pais ou responsáveis.                               
                                </Text>
                                <Text style={styles.politica}>
                                    Importante saber que sempre que coletarmos seus dados informaremos exatamente para que estamos coletando, ou seja, qual a finalidade do tratamento de seus dados. Essa transparência você terá a cada coleta que fizermos.                               
                                </Text>
                                <Text style={styles.politica2}>
                                    Quais dados pessoais poderão ser coletados e para quais finalidades                               
                                </Text>
                                <Text style={styles.politica}>
                                    Dependendo da nossa relação poderemos coletar dados necessários para:                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Cumprimento de obrigações legais ou regulatórias, como legislação fiscal, contratual, INSS, dentre outras leis e regulamentos que exigem o tratamento de certos dados pessoais dos envolvidos em nossos serviços;                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Contatos comerciais, de parcerias, de fornecimento de produtos ou serviços, dentre outros processos corporativos;
                                </Text>
                                <Text style={styles.politica}>
                                    • Informações de geolocalização, para acompanhamento dos trajetos e localizações em tempo real;
                                </Text>
                                <Text style={styles.politica}>
                                    • Informações de preferência no nosso Aplicativo e site institucional;
                                </Text>
                                <Text style={styles.politica}>
                                    • Pesquisas de satisfação do cliente ou de parceiros;
                                </Text>
                                <Text style={styles.politica}>
                                    • Comunicação em nossos canais de Atendimento ao Cliente;
                                </Text>
                                <Text style={styles.politica}>
                                    • Atendimento em nosso canal de Conduta Ética;  
                                </Text>
                                <Text style={styles.politica}>
                                    • Criação de usuário (login) para acessos ao nosso aplicativo; dentre outros.    
                                </Text>
                                <Text style={styles.politica}>
                                    Os dados pessoais que serão coletados vão variar dependendo de cada caso, mas já firmamos aqui o compromisso de coletarmos apenas o estritamente necessário, sempre te informando com a máxima transparência.
                                </Text>
                                <Text style={styles.politica}>
                                    Seus dados pessoais ficarão em nosso poder por algum tempo, a depender das obrigações e necessidade, tendo que serão mantidos conosco, em segurança e protegidos contra utilização indevida, apenas pelo tempo necessário para alcançarmos a finalidade para as quais foram coletados, ou de acordo com obrigações legais aplicáveis, sempre de acordo com as hipóteses legais que a LGPD permite.                    
                                </Text>
                                <Text style={styles.politica}>
                                    Como exemplo, os dados de nossos clientes ficam guardados aqui durante o tempo que as diversas leis e regulamentações demandam, como Fiscal, Tributário, Código Civil e Código de Defesa do Consumidor, dentre outras.
                                </Text>
                                <Text style={[styles.politica2, {marginTop:8}]}>
                                    Seus direitos de requerer da ConnectVan
                                </Text>
                                <Text style={styles.politica}>
                                    Já falamos que você tem direito de requerer de nós algumas informações ou ações, definidas na LGPD.
                                </Text>
                                <Text style={styles.politica}>
                                    Você, como nosso consumidor, cliente, parceiro ou com qualquer outro tipo de relacionamento que tenha conosco, na condição de titular de dados pessoais, tem os seguintes direitos, de acordo com a LGPD, Art. 18.
                                </Text>
                                <Text style={styles.politica}>
                                    • Confirmar se temos tratamento de seus dados;
                                </Text>
                                <Text style={styles.politica}>
                                    • Solicitar acesso aos seus dados pessoais que tratamos;
                                </Text>
                                <Text style={styles.politica}>
                                    • Pedir a correção dos seus dados que estejam incompletos, inexatos ou desatualizados;
                                </Text>
                                <Text style={styles.politica}>
                                    • Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a Lei;
                                </Text>
                                <Text style={styles.politica}>
                                    • Requerer a portabilidade dos dados a outro fornecedor de serviço ou produto, desde que observados os segredos comercial e industrial;
                                </Text>
                                <Text style={styles.politica}>
                                    • Solicitar a eliminação dos dados tratados com base no seu consentimento;
                                </Text>
                                <Text style={styles.politica}>
                                    • Revogar seu consentimento dado para tratamento de algum dado pessoal;
                                </Text>
                                <Text style={styles.politica}>
                                    • Pedir informação sobre as entidades públicas e privadas com as quais compartilhamos seus dados;
                                </Text>
                                <Text style={[styles.politica2, {marginTop:8}]}>
                                    Uso compartlhado dos seus dados
                                </Text>
                                <Text style={styles.politica}>
                                    Em alguns casos nós precisaremos compartilhar seus dados pessoais com entidades governamentais ou parceiros de negócio, de modo que consigamos atender as finalidades do tratamento dos dados ou mesmo para cumprimento de obrigações legais.
                                </Text>
                                <Text style={styles.politica}>
                                    O compartilhamento de dados com terceiros será realizado apenas nas hipóteses previstas em leis e regulamentações, ou quando necessário para atingirmos a finalidade do tratamento. Por exemplo, será necessário enviar um brinde ou prêmio para compartilhar alguns dados seus com nossos motoristas parceiros, como seu endereço e dados de contato, como celular, pois sem isso não conseguiríamos realizar nosso compromisso de transportar seu filho, com segurança, te mantendo informado de todos os ocorridos.
                                </Text>
                                <Text style={styles.politica}>
                                    Alguns dados são compartilhados com órgãos do Governo, para cumprimento de obrigações legais ou regulatórias.
                                </Text>
                                <Text style={styles.politica}>
                                    Nós prezamos pela proteção e segurança dos seus dados durante todo seu ciclo de vida, incluindo quando estiverem sendo tratados por nossos parceiros.
                                </Text>
                                <Text style={[styles.politica2, {marginTop:8}]}>
                                    Transferência Internacional de Dados
                                </Text>
                                <Text style={styles.politica}>
                                    Os dados pessoais poderão ser transferidos para organizações fora do Brasil, caso necessário ao atingimento da finalidade, mas serão tomadas as medidas de proteção adequadas, de acordo com a LGPD e outras regulamentações publicadas pela ANPD.
                                </Text>
                                <Text style={styles.politica}>
                                    Em alguns casos, a transferência internacional se dá pelo fato de termos sistemas hospedados em datacenters ou sistemas em nuvem, que podem estar fora do Brasil, tendo que a proteção e segurança dos dados são sempre priorizadas.
                                </Text>
                                <Text style={styles.politica}>
                                    Qualquer caso diferente iremos informar você e se for o caso, solicitar sua autorização.
                                </Text>
                                <Text style={[styles.politica2, {marginTop:8}]}>
                                    Contato
                                </Text>
                                <Text style={styles.politica}>
                                    A ConnectVan tem o compromisso legal de respeitar seus direitos descritos na LGPD, bem como de ser sempre transparente com seus consumidores, colaboradores e parceiros.
                                </Text>
                                <Text style={styles.politica}>
                                    Suas dúvidas, reclamações, sugestões ou críticas, sobre o tratamento de dados pessoais, sejam relacionados à LGPD ou outras questões que envolvam privacidade, podem ser encaminhadas ao nosso DPO – Encarregado pelo Tratamento de Dados Pessoais, para que sejam dados os devidos endereçamentos e respostas a você.
                                </Text>
                                <Text style={styles.politica}>
                                    Encarregado de Tratamento de Dados: Arthur Rodrigues Lourenço Soares
                                </Text>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{fontFamily:'AileronH', fontSize:15}}>E-mail: </Text>
                                    <Text style={{fontFamily:'AileronR', fontSize:15}}>Definir</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                setModalVisible2(!modalVisible2);
                }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={{position:'absolute', padding:10}}>
                                <TouchableOpacity onPress={() => setModalVisible2(!modalVisible2)}>
                                    <Feather name="x" size={24} color="black" />
                                </TouchableOpacity>
                            </View>
                            <ScrollView>
                            <Text style={{fontFamily:'AileronH', fontSize:20, paddingVertical:10}}>
                                    Termos de Uso
                                </Text>
                                <Text style={[styles.politica, {marginBottom:-18}]}>
                                    1. Este Termos refere-se ao ConnectVan. Ao usar este aplicativo e usar os serviços que são fornecidos, você afirma que leu, compreendeu e concorda com nossos Termos e Condições. Estes Termos abrangem todos os aplicativos ou sites relacionados. Caso você não concorde ou não tenha ficado claro algum ponto, sugere-se que você não utilize mais ele até que tenha sanado todas suas dúvidas. Você poderá retornar ao aplicativo e reler os Termos quantas vezes quiser.
                                </Text>
                                <Text style={styles.politica}>
                                    2. Os Termos e Condições do ConnectVan regem o uso deste aplicativo e todo seu conteúdo. Estes Termos descrevem as regras e regulamentos que orientam o uso do aplicativo. Todos os materiais/informações/documentos/serviços ou todas as outras entidades (coletivamente referidas como "conteúdo") que aparecem no aplicativo serão administrados de acordo com estes Termos e Condições.
                                </Text>
                                <Text style={[styles.politica, {marginTop:-18}]}>
                                    3. O aplicativo é destinado a usuários com 18 (dezoito) anos de idade ou mais. Se você tem menos de 18 (dezoito) anos, não poderá usar ou registrar-se para usar este aplicativo ou seus serviços sem a permissão ou consentimento dos pais. Ao concordar com estes Termos e Condições, você tem a capacidade legal necessária para cumprir e ficar vinculado por estes Termos e Condições.
                                </Text>
                                <Text style={styles.politica}>
                                    4. O ConnectVan faz uso de cookies. Ao acessar nosso aplicativo, você concorda em usar cookies nos termos da nossa Política de Cookies.
                                </Text>    
                                <Text style={styles.politica}>
                                    5. A equipe ConnectVan detêm os direitos de propriedade intelectual de todo o conteúdo. Todos os direitos de propriedade intelectual são reservados. Você pode acessar qualquer conteúdo do aplicativo para seu uso pessoal, sujeito às restrições definidas nestes Termos e Condições. A equipe ConnectVan, por meio deste, determina que o usuário do aplicativo não cometa as seguintes ações:
                                </Text>
                                <Text style={styles.politica}>
                                    • Reproduzir, republicar, duplicar ou copiar qualquer conteúdo do ConnectVan;                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Vender, alugar, sublicenciar e/ou de outra forma comercializar qualquer conteúdo do ConnectVan;                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Executar e/ou exibir publicamente qualquer conteúdo do ConnectVan;                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Usar este aplicativo contrário às regras, leis e regulamentos relevantes do seu país de residência, ou de maneira que cause, ou possa causar, danos ao site ou a qualquer pessoa ou entidade comercial;                               
                                </Text>
                                <Text style={[styles.politica, {marginTop:-18}]}>
                                    • Realizar mineração de dados ou qualquer outra atividade semelhante relacionada a este aplicativo;                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Usar este aplicativo para se envolver em qualquer forma de publicidade ou marketing empresarial.                               
                                </Text>
                                <Text style={styles.politica}>
                                    6. O Conteúdo do Usuário deve ser seu e não deve infringir os direitos de terceiros. a equipe ConnectVan reserva-se o direito de remover qualquer parte do seu conteúdo deste aplicativo a qualquer momento, sem aviso prévio.
                                </Text>
                                <Text style={[styles.politica2, {marginTop:8}]}>
                                    Compromisso do Usuário                               
                                </Text>
                                <Text style={styles.politica}>
                                    7. O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o ConnectVan oferece no site e com caráter enunciativo, mas não limitativo:                               
                                </Text>
                                <Text style={styles.politica}>
                                    • Não se envolver em atividades que sejam ilegais ou contrárias à boa fé e à ordem pública;
                                </Text>
                                <Text style={styles.politica}>
                                    • Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, jogos de sorte ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
                                </Text>
                                <Text style={styles.politica}>
                                    • Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do ConnectVan, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.
                                </Text>
                                <Text style={[styles.politica2, {marginTop:8}]}>
                                    Disposições Gerais
                                </Text>
                                <Text style={styles.politica}>
                                    8. Os Termos e Condições deste aplicativo serão regidos e interpretados de acordo com as leis do país ou estado em que o aplicativo opera. Você, por meio deste, se submete incondicionalmente à jurisdição não exclusiva dos tribunais localizados no Brasil para a resolução de quaisquer disputas.
                                </Text>
                                <Text style={[styles.politica, {marginTop:-18}]}>
                                    9. Este aplicativo reserva-se o direito de revisar estes Termos a qualquer momento conforme julgar adequado. Por isso é fundamental que os seus usuários estejam atentos à essas alterações.
                                </Text>
                                <Text style={[styles.politica, {marginTop:-18}]}>
                                    10. Estes Termos e Condições, incluindo quaisquer avisos legais e isenções de responsabilidade neste aplicativo, constituem o acordo completo entre o aplicativo e você em relação ao uso deste aplicativo.
                                </Text>
                                <Text style={styles.politica}>
                                    Esperamos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso aplicativo.”
                                </Text>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </KeyboardAwareScrollView>
    )
}