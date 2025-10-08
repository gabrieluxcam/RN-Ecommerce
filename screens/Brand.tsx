/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS} from '../constants';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface BrandItem {
  id: number;
  name: string;
  description: string;
  icon: string;
}

const Brand = () => {
  const navigation = useNavigation();

  const brandList: BrandItem[] = [
    {
      id: 1,
      name: 'Nike',
      description: 'Premium sportswear and athletic gear',
      icon: 'shoe-sneaker',
    },
    {
      id: 2,
      name: 'Adidas',
      description: 'Sports performance and lifestyle brand',
      icon: 'run-fast',
    },
    {
      id: 3,
      name: 'Puma',
      description: 'Forever faster sports brand',
      icon: 'soccer',
    },
    {
      id: 4,
      name: 'Under Armour',
      description: 'Performance apparel and footwear',
      icon: 'arm-flex',
    },
    {
      id: 5,
      name: 'Reebok',
      description: 'Fitness and training gear',
      icon: 'dumbbell',
    },
    {
      id: 6,
      name: 'New Balance',
      description: 'Athletic and lifestyle footwear',
      icon: 'run',
    },
  ];

  const renderBrandItem = ({item}: {item: BrandItem}) => {
    return (
      <TouchableOpacity
        style={styles.brandCard}
        onPress={() => {
          console.log('Brand selected:', item.name);
          navigation.navigate('ProductList' as never, {} as never);
        }}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name={item.icon as any}
            size={48}
            color={COLORS.primary}
          />
        </View>
        <View style={styles.brandInfo}>
          <Text style={styles.brandName}>{item.name}</Text>
          <Text style={styles.brandDescription}>{item.description}</Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={24}
          color={COLORS.gray}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Brands</Text>
        <Text style={styles.headerSubtitle}>
          Shop from your favorite brands
        </Text>
      </View>
      <FlatList
        data={brandList}
        renderItem={renderBrandItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
  header: {
    backgroundColor: COLORS.white,
    padding: 20,
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  headerTitle: {
    ...FONTS.h2,
    color: COLORS.black,
    marginBottom: 4,
  },
  headerSubtitle: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  listContainer: {
    padding: 12,
  },
  brandCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: COLORS.lightGray2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  brandInfo: {
    flex: 1,
  },
  brandName: {
    ...FONTS.h3,
    color: COLORS.black,
    marginBottom: 4,
  },
  brandDescription: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
});

export default Brand;
