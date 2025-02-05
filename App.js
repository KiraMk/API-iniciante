import { useState, useEffect, useRef } from 'react';
import { Text, SafeAreaView, StyleSheet, FlatList, View, TouchableOpacity, Image, Animated } from 'react-native';

const request = async (callback) => {
  const response = await fetch('https://rickandmortyapi.com/api/character/1,183');
  const parsed = await response.json();
  callback(parsed);
}

export default function App() {
  const [registros, setRegistros] = useState([]);
  const pulseAnimation = useRef(new Animated.Value(1)).current; 

  useEffect(() => {
    request(setRegistros);
    startPulsing(); 
  }, []);

  const startPulsing = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 1.1, 
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1, 
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Rick and Morty</Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Text style={styles.itemletra}> Nome: {item.name} </Text>
            <Text style={styles.itemletra}> Status: {item.status} </Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.alinhamentoImg}>
        <Animated.Image
          style={[styles.img, { transform: [{ scale: pulseAnimation }] }]} 
          source={require('./assets/rickandmorty.jpg')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#1A1A2E', 
  },
  titulo: {
    margin: 24,
    fontSize: 36,
    fontWeight: 'bold',
    color: '#7FFF00',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontFamily: 'Orbitron',
    textShadowColor: '#7FFF00',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  item: {
    backgroundColor: '#292C44', 
    marginVertical: 12,
    padding: 15,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#7FFF00',
    shadowColor: '#7FFF00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
    transform: [{ rotate: '1deg' }],
    backgroundColor: 'rgba(41, 44, 68, 0.8)', 
  },
  itemletra: {
    fontSize: 22,
    color: '#FFF',
    fontFamily: 'Press Start 2P', 
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  img: {
    width: 350,
    height: 250,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#00FF00',
    transform: [{ rotate: '2deg' }],
    shadowColor: '#00FF00',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  alinhamentoImg: {
    alignItems: 'center',
    marginTop: 20,
  },
});
