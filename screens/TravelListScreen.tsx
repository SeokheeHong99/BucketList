import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Define the RootStackParamList for type safety with navigation
type RootStackParamList = {
  TravelList: undefined;
  DestinationDetail: { destination: TravelDestination };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TravelList'>;

// Define the type for a travel destination
type TravelDestination = {
  id: string;
  place: string;
  completed: boolean;
};

const TravelListScreen = () => {
  const [destinations, setDestinations] = useState<TravelDestination[]>([]);
  const [newDestination, setNewDestination] = useState('');
  const navigation = useNavigation<NavigationProp>();

  // Add a new destination to the list
  const addDestination = () => {
    if (newDestination.trim() === '') return;
    
    const newItem: TravelDestination = {
      id: Date.now().toString(),
      place: newDestination,
      completed: false,
    };
    
    setDestinations([...destinations, newItem]);
    setNewDestination('');
  };

  // Toggle the completed status of a destination
  const toggleDestination = (id: string) => {
    setDestinations(
      destinations.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // Delete a destination from the list
  const deleteDestination = (id: string) => {
    setDestinations(destinations.filter(item => item.id !== id));
  };

  // Navigate to destination detail screen
  const navigateToDetail = (destination: TravelDestination) => {
    navigation.navigate('DestinationDetail', { destination });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Travel Destinations</Text>
      
      <FlatList
        data={destinations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.destinationItem}
            onPress={() => navigateToDetail(item)}
          >
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation();
                toggleDestination(item.id);
              }}
              style={[styles.checkbox, item.completed && styles.checkboxChecked]}
            >
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            
            <Text 
              style={[
                styles.destinationText, 
                item.completed && styles.completedDestination
              ]}
            >
              {item.place}
            </Text>
            
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation();
                deleteDestination(item.id);
              }}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>X</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No destinations added yet. Add your dream travel spots below!
          </Text>
        }
      />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.inputContainer}
      >
        <TextInput
          style={styles.input}
          value={newDestination}
          onChangeText={setNewDestination}
          placeholder="Add a travel destination..."
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.addButton} onPress={addDestination}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  destinationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#4caf50',
    borderColor: '#4caf50',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  destinationText: {
    flex: 1,
    fontSize: 18,
  },
  completedDestination: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteButton: {
    marginLeft: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ff5252',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
    color: '#999',
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    padding: 15,
  },
  input: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 23,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  addButton: {
    marginLeft: 10,
    width: 46,
    height: 46,
    backgroundColor: '#4caf50',
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TravelListScreen;
