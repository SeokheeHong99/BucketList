import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the type for route params
type RootStackParamList = {
  TravelList: undefined;
  DestinationDetail: { destination: TravelDestination };
};

type DestinationDetailRouteProp = NativeStackScreenProps<RootStackParamList, 'DestinationDetail'>['route'];

// Define the type for a travel destination
type TravelDestination = {
  id: string;
  place: string;
  completed: boolean;
};

// Album item type
type AlbumItem = {
  id: string;
  name: string;
  image: string;
  description: string;
};

// Placeholder data for the albums
const HOTELS_DATA: AlbumItem[] = [
  { id: '1', name: 'Grand Hotel', image: 'https://via.placeholder.com/150', description: 'Luxury hotel in the heart of the city' },
  { id: '2', name: 'Seaside Resort', image: 'https://via.placeholder.com/150', description: 'Beautiful beachfront property' },
];

const LANDMARKS_DATA: AlbumItem[] = [
  { id: '1', name: 'Historic Castle', image: 'https://via.placeholder.com/150', description: 'A castle dating back to the 12th century' },
  { id: '2', name: 'Famous Monument', image: 'https://via.placeholder.com/150', description: 'Iconic monument in the main square' },
];

const FOODS_DATA: AlbumItem[] = [
  { id: '1', name: 'Local Cuisine', image: 'https://via.placeholder.com/150', description: 'Traditional dishes from the region' },
  { id: '2', name: 'Street Food Market', image: 'https://via.placeholder.com/150', description: 'Popular street food vendors' },
];

type TabType = 'hotels' | 'landmarks' | 'foods';

const DestinationDetailScreen = () => {
  const route = useRoute<DestinationDetailRouteProp>();
  const { destination } = route.params;
  const [activeTab, setActiveTab] = useState<TabType>('hotels');

  // Function to render the album content based on selected tab
  const renderAlbumContent = () => {
    let data: AlbumItem[] = [];
    
    switch (activeTab) {
      case 'hotels':
        data = HOTELS_DATA;
        break;
      case 'landmarks':
        data = LANDMARKS_DATA;
        break;
      case 'foods':
        data = FOODS_DATA;
        break;
    }

    return (
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.albumItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.albumImage}
            />
            <View style={styles.albumInfo}>
              <Text style={styles.albumName}>{item.name}</Text>
              <Text style={styles.albumDescription}>{item.description}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No {activeTab} added yet.</Text>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{destination.place}</Text>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'hotels' && styles.activeTab]}
          onPress={() => setActiveTab('hotels')}
        >
          <Text style={[styles.tabText, activeTab === 'hotels' && styles.activeTabText]}>Hotels</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'landmarks' && styles.activeTab]}
          onPress={() => setActiveTab('landmarks')}
        >
          <Text style={[styles.tabText, activeTab === 'landmarks' && styles.activeTabText]}>Landmarks</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'foods' && styles.activeTab]}
          onPress={() => setActiveTab('foods')}
        >
          <Text style={[styles.tabText, activeTab === 'foods' && styles.activeTabText]}>Foods</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        {renderAlbumContent()}
      </View>
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
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  activeTabText: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 15,
  },
  albumItem: {
    flexDirection: 'row',
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  albumImage: {
    width: 100,
    height: 100,
  },
  albumInfo: {
    flex: 1,
    padding: 10,
  },
  albumName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  albumDescription: {
    fontSize: 14,
    color: '#666',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#999',
  },
});

export default DestinationDetailScreen;
