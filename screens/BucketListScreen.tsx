import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert, Image, Modal, TextInput, ScrollView } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Updated Plan type to include completion status
type Plan = {
  text: string;
  completed: boolean;
};

// Define types for our navigation and bucket list items
type BucketListItem = {
  id: string;
  title: string;
  plans?: Plan[]; // Updated to array of Plan objects
};

type RootStackParamList = {
  Home: undefined;
  BucketList: undefined;
};

type BucketListScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'BucketList'>;
};

const BucketListScreen = ({ navigation }: BucketListScreenProps) => {
  // This would eventually store your bucket list items
  const [bucketItems, setBucketItems] = React.useState<BucketListItem[]>([
    { id: '1', title: 'Learn to play guitar', plans: [
      { text: 'Buy a guitar', completed: false }, 
      { text: 'Find a teacher', completed: true }
    ]},
    { id: '2', title: 'Travel to Japan', plans: [
      { text: 'Save money', completed: false }, 
      { text: 'Learn basic Japanese', completed: false }
    ]},
    { id: '3', title: 'Run a marathon', plans: [
      { text: 'Start training', completed: true }, 
      { text: 'Buy running shoes', completed: false }
    ]},
  ]);
  // Track whether we're in remove mode
  const [isRemoveMode, setIsRemoveMode] = React.useState<boolean>(false);
  // Track modal visibility and current item
  const [planModalVisible, setPlanModalVisible] = React.useState<boolean>(false);
  const [currentItemId, setCurrentItemId] = React.useState<string>('');
  const [newPlan, setNewPlan] = React.useState<string>('');
  // Track whether to show completed tasks
  const [showCompletedTasks, setShowCompletedTasks] = React.useState<boolean>(false);

  // Function to add a new bucket list item
  const addBucketListItem = () => {
    Alert.prompt(
      'Add Bucket List Item',
      'What do you want to accomplish?',
      (text) => {
        if (text.trim()) {
          const newItem = {
            id: Date.now().toString(),
            title: text.trim(),
            plans: [],
          };
          setBucketItems([...bucketItems, newItem]);
        }
      }
    );
  };
  
  // Function to remove a bucket list item
  const removeBucketListItem = (id: string) => {
    setBucketItems(bucketItems.filter(item => item.id !== id));
  };
  
  // Function to toggle remove mode
  const toggleRemoveMode = () => {
    setIsRemoveMode(!isRemoveMode);
  };
  
  // Function to handle long press on minus button
  const handleLongPressMinusButton = () => {
    setIsRemoveMode(true);
  };

  // Function to open the plan modal
  const openPlanModal = (id: string) => {
    setCurrentItemId(id);
    setPlanModalVisible(true);
    setShowCompletedTasks(false); // Always start in active tasks mode
  };

  // Function to add a plan to a bucket list item
  const addPlanToItem = () => {
    if (newPlan.trim() === '') return;
    
    setBucketItems(bucketItems.map(item => {
      if (item.id === currentItemId) {
        return {
          ...item,
          plans: [...(item.plans || []), { text: newPlan.trim(), completed: false }]
        };
      }
      return item;
    }));

    setNewPlan('');
  };

  // Function to delete a plan
  const deletePlan = (planIndex: number) => {
    setBucketItems(bucketItems.map(item => {
      if (item.id === currentItemId && item.plans) {
        return {
          ...item,
          plans: item.plans.filter((_, index) => index !== planIndex)
        };
      }
      return item;
    }));
  };
  
  // Function to toggle plan completion status
  const togglePlanCompletion = (planIndex: number) => {
    setBucketItems(bucketItems.map(item => {
      if (item.id === currentItemId && item.plans) {
        return {
          ...item,
          plans: item.plans.map((plan, index) => 
            index === planIndex ? { ...plan, completed: !plan.completed } : plan
          )
        };
      }
      return item;
    }));
  };

  // Toggle between active and completed tasks view
  const toggleCompletedTasksView = () => {
    setShowCompletedTasks(!showCompletedTasks);
  };

  // Get current item for the plan modal
  const currentItem = bucketItems.find(item => item.id === currentItemId);
  
  // Filter plans based on completion status and current view mode
  const filteredPlans = currentItem?.plans?.filter(plan => 
    showCompletedTasks ? plan.completed : !plan.completed
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bucketItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.title}</Text>
            
            {!isRemoveMode ? (
              <TouchableOpacity onPress={() => openPlanModal(item.id)}>
                <Image 
                  source={require('../BucketList/assets/images/chart.png')} 
                  style={styles.chartIcon} 
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => removeBucketListItem(item.id)}>
                <Image 
                  source={require('../BucketList/assets/images/bin.png')} 
                  style={styles.binIcon} 
                />
              </TouchableOpacity>
            )}
          </View>
        )}
        style={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No bucket list items yet. Add your first one!</Text>
        }
      />
      
      {/* Plans Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={planModalVisible}
        onRequestClose={() => setPlanModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Plans for: {currentItem?.title}
              </Text>
              <TouchableOpacity 
                style={[
                  styles.modeToggleButton,
                  showCompletedTasks && styles.completedModeButton
                ]}
                onPress={toggleCompletedTasksView}
              >
                <Text style={styles.modeToggleText}>
                  {showCompletedTasks ? 'Completed' : 'Active'}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.plansList}>
              {filteredPlans && filteredPlans.length > 0 ? (
                filteredPlans.map((plan, index) => {
                  // Find the original index in the full plans array
                  const originalIndex = currentItem?.plans?.findIndex(
                    p => p.text === plan.text && p.completed === plan.completed
                  );
                  
                  return (
                    <View key={index} style={styles.planItem}>
                      <Text style={[
                        styles.planText,
                        plan.completed && styles.completedPlanText
                      ]}>• {plan.text}</Text>
                      <View style={styles.planActions}>
                        {/* Show different icons based on current mode */}
                        {showCompletedTasks ? (
                          <TouchableOpacity 
                            onPress={() => originalIndex !== undefined && togglePlanCompletion(originalIndex)} 
                            style={styles.planActionButton}
                          >
                            <Text style={styles.planArrow}>←</Text>
                          </TouchableOpacity>
                        ) : (
                          <>
                            <TouchableOpacity 
                              onPress={() => originalIndex !== undefined && togglePlanCompletion(originalIndex)} 
                              style={styles.planActionButton}
                            >
                              <Text style={[
                                styles.planCheck,
                                plan.completed && styles.planCheckActive
                              ]}>✓</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                              onPress={() => originalIndex !== undefined && deletePlan(originalIndex)}
                              style={styles.planActionButton}
                            >
                              <Text style={styles.planDelete}>X</Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </View>
                    </View>
                  );
                })
              ) : (
                <Text style={styles.emptyPlansText}>
                  {showCompletedTasks 
                    ? "No completed tasks yet."
                    : "No active tasks yet. Add your first step below!"}
                </Text>
              )}
            </ScrollView>

            {/* Only show add plan container in active tasks mode */}
            {!showCompletedTasks && (
              <View style={styles.addPlanContainer}>
                <TextInput
                  style={styles.planInput}
                  placeholder="Add a step to achieve this goal..."
                  value={newPlan}
                  onChangeText={setNewPlan}
                />
                <TouchableOpacity style={styles.addPlanButton} onPress={addPlanToItem}>
                  <Text style={styles.addPlanButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}

            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setPlanModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Minus button for remove mode */}
      <TouchableOpacity 
        style={styles.minusButton}
        onPress={toggleRemoveMode}
        onLongPress={handleLongPressMinusButton}
        delayLongPress={2000}
      >
        <Text style={styles.minusButtonText}>-</Text>
      </TouchableOpacity>
      
      {/* Plus button at bottom */}
      <TouchableOpacity 
        style={styles.plusButton}
        onPress={addBucketListItem}
      >
        <Text style={styles.plusButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  list: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  itemContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  binIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  chartIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  plusButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4285F4',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  plusButtonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  minusButton: {
    position: 'absolute',
    bottom: 110, // Position above the plus button
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F44336', // Red color for the minus button
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  minusButtonText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  modeToggleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  completedModeButton: {
    backgroundColor: '#4CAF50',
  },
  modeToggleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  plansList: {
    maxHeight: 200,
  },
  planItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  planText: {
    fontSize: 16,
    flex: 1,
  },
  completedPlanText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  planActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planActionButton: {
    padding: 5,
    marginLeft: 5,
  },
  planDelete: {
    color: '#F44336',
    fontWeight: 'bold',
    fontSize: 16,
  },
  planCheck: {
    color: '#aaa',
    fontWeight: 'bold',
    fontSize: 16,
  },
  planCheckActive: {
    color: '#4CAF50',
  },
  emptyPlansText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
    marginBottom: 20,
  },
  addPlanContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  planInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  addPlanButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  addPlanButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  planArrow: {
    color: '#4285F4',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default BucketListScreen;
