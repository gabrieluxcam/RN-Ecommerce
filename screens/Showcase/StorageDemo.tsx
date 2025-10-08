import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Simple in-memory storage for demo purposes
// In production, use @react-native-async-storage/async-storage
const InMemoryStorage = {
  data: {} as Record<string, string>,

  async setItem(key: string, value: string) {
    this.data[key] = value;
  },

  async getItem(key: string) {
    return this.data[key] || null;
  },

  async removeItem(key: string) {
    delete this.data[key];
  },

  async getAllKeys() {
    return Object.keys(this.data);
  },

  async multiGet(keys: string[]) {
    return keys.map(key => [key, this.data[key] || null] as [string, string | null]);
  },

  async clear() {
    this.data = {};
  },
};

interface StorageItem {
  key: string;
  value: string;
}

const StorageDemo = () => {
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');
  const [items, setItems] = useState<StorageItem[]>([]);

  useEffect(() => {
    loadAllItems();
  }, []);

  const loadAllItems = async () => {
    try {
      const keys = await InMemoryStorage.getAllKeys();
      const result = await InMemoryStorage.multiGet(keys);
      setItems(result.map(([key, value]) => ({key, value: value || ''})));
    } catch (error) {
      Alert.alert('Error', 'Failed to load items');
    }
  };

  const saveItem = async () => {
    if (!key.trim() || !value.trim()) {
      Alert.alert('Error', 'Please enter both key and value');
      return;
    }

    try {
      await InMemoryStorage.setItem(key, value);
      Alert.alert('Success', 'Item saved successfully');
      setKey('');
      setValue('');
      loadAllItems();
    } catch (error) {
      Alert.alert('Error', 'Failed to save item');
    }
  };

  const getItem = async () => {
    if (!key.trim()) {
      Alert.alert('Error', 'Please enter a key');
      return;
    }

    try {
      const item = await InMemoryStorage.getItem(key);
      if (item !== null) {
        setValue(item);
        Alert.alert('Found', `Value: ${item}`);
      } else {
        Alert.alert('Not Found', 'No value found for this key');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to get item');
    }
  };

  const removeItem = async (itemKey: string) => {
    try {
      await InMemoryStorage.removeItem(itemKey);
      Alert.alert('Success', 'Item removed successfully');
      loadAllItems();
    } catch (error) {
      Alert.alert('Error', 'Failed to remove item');
    }
  };

  const clearAll = async () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to clear all storage?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: async () => {
            try {
              await InMemoryStorage.clear();
              Alert.alert('Success', 'All items cleared');
              loadAllItems();
            } catch (error) {
              Alert.alert('Error', 'Failed to clear storage');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="database" size={40} color={COLORS.primary} />
          <Text style={styles.title}>Storage Demo</Text>
          <Text style={styles.subtitle}>In-memory storage (Demo mode)</Text>
        </View>

        <View style={styles.infoBox}>
          <MaterialCommunityIcons name="information" size={20} color="#2196F3" />
          <Text style={styles.infoText}>
            Using in-memory storage for demo. Install @react-native-async-storage/async-storage for persistent storage.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add/Update Item</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Key</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter key (e.g., username)"
              value={key}
              onChangeText={setKey}
              placeholderTextColor={COLORS.gray}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Value</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter value"
              value={value}
              onChangeText={setValue}
              placeholderTextColor={COLORS.gray}
            />
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={saveItem}>
              <MaterialCommunityIcons name="content-save" size={20} color={COLORS.white} />
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={getItem}>
              <MaterialCommunityIcons name="magnify" size={20} color={COLORS.white} />
              <Text style={styles.buttonText}>Get</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button, styles.dangerButton]} onPress={clearAll}>
            <MaterialCommunityIcons name="delete-sweep" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>Clear All Storage</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stored Items ({items.length})</Text>
          <Text style={styles.description}>All items currently in storage</Text>

          {items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="database-off" size={48} color={COLORS.gray} />
              <Text style={styles.emptyText}>No items in storage</Text>
            </View>
          ) : (
            items.map((item, index) => (
              <View key={index} style={styles.storageItem}>
                <View style={styles.itemContent}>
                  <Text style={styles.itemKey}>{item.key}</Text>
                  <Text style={styles.itemValue} numberOfLines={2}>{item.value}</Text>
                </View>
                <TouchableOpacity onPress={() => removeItem(item.key)}>
                  <MaterialCommunityIcons name="delete" size={24} color="#F44336" />
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Store key-value pairs locally</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Persist across app restarts</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Async operations</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Get, set, and remove items</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  title: {
    ...FONTS.h2,
    color: COLORS.black,
    marginTop: 12,
    marginBottom: 8,
  },
  subtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
    textAlign: 'center',
  },
  section: {
    backgroundColor: COLORS.white,
    marginTop: 16,
    padding: 20,
  },
  sectionTitle: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: 8,
  },
  description: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.black,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
    ...FONTS.body4,
    color: COLORS.black,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  dangerButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: COLORS.white,
    ...FONTS.body3,
    fontWeight: '600',
  },
  storageItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray2,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemKey: {
    ...FONTS.body3,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemValue: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginTop: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  featureText: {
    ...FONTS.body4,
    color: COLORS.black,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  infoText: {
    ...FONTS.body4,
    color: COLORS.black,
    flex: 1,
  },
});

export default StorageDemo;
