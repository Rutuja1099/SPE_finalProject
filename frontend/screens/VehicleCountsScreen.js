import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const VehicleCountsScreen = ({ route }) => {
  console.log("route.....",route.params);
  const { vehicleCounts } = route.params.responseObject;
  console.log("vehicle..............",vehicleCounts);
  console.log("route.params.in",route.params.responseObject.in);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vehicle Counts</Text>
      <Text style={styles.textdecor}>Total vehicles in: {route.params.responseObject.in}</Text>
      <Text style={styles.textdecor}>Total vehicles out: {route.params.responseObject.out}</Text>
      <Text style={styles.textdecor}>Vehicles by class in: {JSON.stringify(route.params.responseObject.by_class_in, null, 2)}</Text>
      <Text style={styles.textdecor}>Vehicles by class out: {JSON.stringify(route.params.responseObject.by_class_out, null, 2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#343232',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white'
  },
  textdecor: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'white'
  },
});

export default VehicleCountsScreen;
