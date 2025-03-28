import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function App(): React.ReactElement {
  // Array of different image sources to use
  const imagesSources = [
    require('./BucketList/assets/images/Ballet.png'),
    require('./BucketList/assets/images/Chilling.png'),
    // Add paths to other images you have in your assets folder
    // For example:
    require('./BucketList/assets/images/Dancing.png'), // Repeated as placeholder
    require('./BucketList/assets/images/IceCream.png'), // Repeated as placeholder
    require('./BucketList/assets/images/LayingDown.png'), // Repeated as placeholder
    require('./BucketList/assets/images/Plant.png'), // Repeated as placeholder
    require('./BucketList/assets/images/Playing.png'), // Repeated as placeholder
    require('./BucketList/assets/images/Studying.png'), // Repeated as placeholder
    require('./BucketList/assets/images/RollerSkating.png'), // Repeated as placeholder
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
      
      {/* Bottom buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => console.log('Button 1 pressed')}>
          <Image 
            source={require('./BucketList/assets/images/bucket.png')} 
            style={styles.buttonImage} 
          />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => console.log('Button 2 pressed')}>
          <Image 
            source={require('./BucketList/assets/images/hobbies.png')} 
            style={styles.buttonImage} 
          />
        </TouchableOpacity>
      </View>
    </View>
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
    justifyContent: 'space-around',
    paddingHorizontal: 40,
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
