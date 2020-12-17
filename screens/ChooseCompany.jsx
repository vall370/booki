import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import {Button, Paragraph, Searchbar} from 'react-native-paper';
import {ListItem} from 'react-native-elements';
import AsyncStorage from '@callstack/async-storage';

export default function ChooseCompany({navigation}) {
  const [isLoading, setIsLoading] = useState(true);
  const [text, setText] = useState('');
  const [company2, setCompany2] = useState('');
  const [chooseButton, setChooseButton] = useState(false);
  const [image, setImage] = useState('');
  const [arrayholder, setArrayholder] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get('http://167.99.133.22:5556/api/foretag').then(response => {
      setDataSource(response.data);
      setIsLoading(false);
      setArrayholder(response.data);
    });
  }, []);
  const onPressCompany = async item => {
    setCompany2(item.company), setImage(item.range);

    AsyncStorage.setItem('company', item.company);

    navigation.navigate('ChoosenCompany', {
      image: image,
      company: item.company,
    });
  };
  const renderItem = ({item}) => (
    <ListItem
      bottomDivider
      onPress={() => {
        onPressCompany(item);
      }}>
      <ListItem.Content style={styles.listView}>
        <ListItem.Title>{item.company}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
  const SearchFilterFunction = text => {
    //passing the inserted text in textinput
    const newData = arrayholder.filter(function(item) {
      //applying filter for the inserted text in search bar
      const itemData = item.company
        ? item.company.toUpperCase()
        : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    setDataSource(newData);
    setText(text);
  };
  return (
    <View style={{flex: 1}}>
      <Image
        style={{height: 100, width: '100%', resizeMode: 'contain'}}
        source={{
          uri: 'http://167.99.133.22:5556/uploads/foretag/cebola.png',
        }}
      />

      <View style={{flex: 2}}>
        {!chooseButton ? (
          <View>
            <Button
              style={{marginTop: 250}}
              mode="contained"
              color="#3498DB"
              labelStyle={{color: 'white', fontSize: 18}}
              onPress={() => setChooseButton(true)}>
              Välj din hyresvärd
            </Button>
            <Text style={[styles.baseText, {marginTop: 10}]}>
              Finns inte din hyresvärd med?
              <Text style={styles.innerText}>Kontakta oss</Text>
            </Text>
          </View>
        ) : (
          <View style={{marginTop: 250}}>
            <View style={{height: 350}}>
              <Searchbar
                placeholder="Search"
                onChangeText={text => SearchFilterFunction(text)}
                value={text}
              />

              <FlatList
                keyExtractor={(item, index) => index.toString()}
                data={dataSource}
                renderItem={renderItem}
              />
              <Button
                style={{backgroundColor: 'lightgrey'}}
                onPress={() => setChooseButton(false)}
                color="white"
                mode="contained">
                Avbryt
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  baseText: {
    fontWeight: 'bold',
  },
  innerText: {
    color: '#3498DB',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 24,
    color: '#333',
  },
  text: {
    color: '#4f603c',
    fontSize: 24,
  },
  err: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
  },
  listView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  MainContainer: {
    marginTop: 50,

    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  MainContainer1: {
    marginTop: 50,
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomView: {
    width: '100%',
    height: '50%',
    position: 'absolute',
    bottom: 0,
  },
  textStyle: {
    color: '#fff',
    fontSize: 22,
  },
});
