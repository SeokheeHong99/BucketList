import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Import necessary modules for Expo compatibility
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import the screen components
import BucketListScreen from './screens/BucketListScreen';
import TravelListScreen from './screens/TravelListScreen';
import DestinationDetailScreen from './screens/DestinationDetailScreen';

// Define the type for our navigation params
type RootStackParamList = {
  Home: undefined;
  BucketList: undefined;
  TravelList: undefined;
  DestinationDetail: { destination: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Main home screen component
const HomeScreen = ({ navigation }: { navigation: NativeStackNavigationProp<RootStackParamList, 'Home'> }) => {
  // Array of different image sources to use
  const imagesSources = [
    require('./BucketList/assets/images/Ballet.png'),
    require('./BucketList/assets/images/Chilling.png'),
    // Add paths to other images you have in your assets folder
    require('./BucketList/assets/images/Dancing.png'),
    require('./BucketList/assets/images/IceCream.png'),
    require('./BucketList/assets/images/LayingDown.png'),
    require('./BucketList/assets/images/Plant.png'),
    require('./BucketList/assets/images/Playing.png'),
    require('./BucketList/assets/images/Studying.png'),
    require('./BucketList/assets/images/RollerSkating.png'),
  ];

  // Create a 3x3 grid of images in the center of the screen
  const createGridImages = () => {
    const positions = [];
    
    const rows = 3;
    const columns = 3;
    const imageSize = 80; // Size for each grid image
    const gap = 10; // Gap between images
    
    // Calculate grid dimensions
    const gridWidth = (columns * imageSize) + ((columns - 1) * gap);
    const gridHeight = (rows * imageSize) + ((rows - 1) * gap);
    
    // Get screen dimensions
    const { width, height } = Dimensions.get('window');
    
    // Calculate starting position to center the grid
    const startX = (width - gridWidth) / 2;
    const startY = (height - gridHeight) / 2 - 30; // Offset a bit to account for buttons
    
    // Create the grid positions with image source index
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = startX + (col * (imageSize + gap));
        const y = startY + (row * (imageSize + gap));
        const index = row * columns + col;
        
        positions.push({
          x, 
          y, 
          size: imageSize,
          imageIndex: index
        });
      }
    }
    
    return positions;
  };
  
  const gridPositions = createGridImages();
  
  return (
    <View style={styles.container}>
      {/* Grid images */}
      {gridPositions.map((img, index) => (
        <Image 
          key={`grid-${index}`}
          source={imagesSources[img.imageIndex]}
          style={[
            styles.gridImage, 
            { 
              left: img.x, 
              top: img.y, 
              width: img.size, 
              height: img.size
            }
          ]} 
        />
      ))}
      
      {/* Bottom buttons with equal spacing */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('BucketList')}
        >
          <Image 
            source={require('./BucketList/assets/images/bucket.png')} 
            style={styles.buttonImage} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => console.log('Button 2 pressed')}
        >
          <Image 
            source={require('./BucketList/assets/images/hobbies.png')} 
            style={styles.buttonImage} 
          />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('TravelList')}
        >
          <Image 
            source={require('./BucketList/assets/images/luggage.png')} 
            style={styles.buttonImage} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Main App component with navigation
export default function App(): React.ReactElement {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="BucketList" 
            component={BucketListScreen} 
            options={{ title: "My Bucket List" }}
          />
          <Stack.Screen 
            name="TravelList" 
            component={TravelListScreen} 
            options={{ title: "Travel Destinations" }}
          />
          <Stack.Screen 
            name="DestinationDetail" 
            component={DestinationDetailScreen} 
            options={({ route }) => ({ title: route.params.destination.place })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  gridImage: {
    position: 'absolute',
    resizeMode: 'contain',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly', // Changed from space-around to space-evenly for equal spacing
    paddingHorizontal: 20, // Reduced padding to give buttons more room
  },
  button: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
});
