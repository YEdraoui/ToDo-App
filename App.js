import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, Pressable, Modal } from 'react-native';

export default function App() {
  const [enteredTask, setEnteredTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // State to handle modal visibility

  function textInputHandler(enteredText) {
    setEnteredTask(enteredText);
  }

  function addTaskHandler() {
    if (enteredTask.trim()) {
      setTasks((currentTasks) => [...currentTasks, enteredTask]);
      setEnteredTask(''); // Clear the input field after adding
      setModalVisible(false); // Close the modal after adding the task
    }
  }

  function deleteTaskHandler(taskIndex) {
    setTasks((currentTasks) => {
      return currentTasks.filter((task, index) => index !== taskIndex);
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View>
        <Text style={styles.header}>Your To Do's List</Text>
      </View>

      {/* Button to open modal */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add New Task</Text>
      </TouchableOpacity>

      {/* Modal for adding tasks */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true} // Makes modal overlay transparent
        onRequestClose={() => setModalVisible(false)} // Close the modal when back button is pressed on Android
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Add a New Task</Text>

            {/* Task Input */}
            <TextInput
              style={styles.input}
              placeholder="Enter your task"
              placeholderTextColor="#888" // Grey placeholder text
              onChangeText={textInputHandler}
              value={enteredTask}
              multiline={true}  // Allow multiline input
              textAlignVertical="top" // Align text to the top of the box
            />

            {/* Add Task Button inside the modal */}
            <TouchableOpacity style={styles.modalButton} onPress={addTaskHandler}>
              <Text style={styles.buttonText}>Add Task</Text>
            </TouchableOpacity>

            {/* Close Modal Button */}
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Display the list of tasks */}
      <ScrollView style={styles.tasksContainer}>
        {tasks.map((task, index) => (
          <Pressable key={index} style={styles.taskItem} onPress={() => deleteTaskHandler(index)}>
            <Text>{task}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',  // Make the input take full width of modal
    minHeight: 100, // Set a minimum height for visibility
    maxHeight: 200, // Add a max height so it doesn't expand indefinitely
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#000',
    textAlignVertical: 'top', // Align text to the top
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tasksContainer: {
    width: '100%',
    maxHeight: '50%',
  },
  taskItem: {
    padding: 15,
    backgroundColor: '#d1c4e9',
    borderRadius: 8,
    marginVertical: 5,
    width: '100%',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Dark transparent background for modal overlay
  },
  modalContainer: {
    width: '90%',  // Increased the width for more space
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#6200ea',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
});
