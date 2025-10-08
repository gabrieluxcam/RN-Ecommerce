import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface ListItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const ListsDemo = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'flat' | 'section'>('flat');

  // Generate sample data
  const flatListData: ListItem[] = useMemo(
    () =>
      Array.from({length: 50}, (_, i) => ({
        id: `item-${i}`,
        title: `List Item ${i + 1}`,
        description: `This is description for item ${i + 1}`,
        icon: i % 2 === 0 ? 'star' : 'heart',
      })),
    []
  );

  const sectionListData = useMemo(
    () => [
      {
        title: 'Category A',
        data: Array.from({length: 10}, (_, i) => ({
          id: `a-${i}`,
          title: `Item A${i + 1}`,
          description: 'Category A description',
          icon: 'alpha-a',
        })),
      },
      {
        title: 'Category B',
        data: Array.from({length: 15}, (_, i) => ({
          id: `b-${i}`,
          title: `Item B${i + 1}`,
          description: 'Category B description',
          icon: 'alpha-b',
        })),
      },
      {
        title: 'Category C',
        data: Array.from({length: 12}, (_, i) => ({
          id: `c-${i}`,
          title: `Item C${i + 1}`,
          description: 'Category C description',
          icon: 'alpha-c',
        })),
      },
    ],
    []
  );

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({item}: {item: ListItem}) => (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={item.icon as any}
          size={24}
          color={COLORS.primary}
        />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        size={20}
        color={COLORS.gray}
      />
    </TouchableOpacity>
  );

  const renderSectionHeader = ({section}: {section: {title: string}}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  const ItemSeparator = () => <View style={styles.separator} />;

  const ListHeader = () => (
    <View style={styles.listHeader}>
      <MaterialCommunityIcons name="information" size={20} color={COLORS.gray} />
      <Text style={styles.listHeaderText}>
        {selectedTab === 'flat'
          ? 'FlatList with 50 items - Optimized for performance'
          : 'SectionList with grouped data - Great for categorized content'}
      </Text>
    </View>
  );

  const ListFooter = () => (
    <View style={styles.listFooter}>
      <Text style={styles.listFooterText}>End of list</Text>
    </View>
  );

  const ListEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="archive-alert"
        size={48}
        color={COLORS.gray}
      />
      <Text style={styles.emptyText}>No items found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="format-list-bulleted"
          size={40}
          color={COLORS.primary}
        />
        <Text style={styles.title}>Lists & Performance</Text>
        <Text style={styles.subtitle}>
          Optimized list rendering with virtualization
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'flat' && styles.activeTab]}
          onPress={() => setSelectedTab('flat')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'flat' && styles.activeTabText,
            ]}>
            FlatList
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'section' && styles.activeTab]}
          onPress={() => setSelectedTab('section')}>
          <Text
            style={[
              styles.tabText,
              selectedTab === 'section' && styles.activeTabText,
            ]}>
            SectionList
          </Text>
        </TouchableOpacity>
      </View>

      {selectedTab === 'flat' ? (
        <FlatList
          data={flatListData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          ListEmptyComponent={ListEmpty}
          refreshing={refreshing}
          onRefresh={onRefresh}
          maxToRenderPerBatch={10}
          windowSize={10}
          initialNumToRender={10}
          removeClippedSubviews={true}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <SectionList
          sections={sectionListData}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={ItemSeparator}
          ListHeaderComponent={ListHeader}
          ListFooterComponent={ListFooter}
          ListEmptyComponent={ListEmpty}
          refreshing={refreshing}
          onRefresh={onRefresh}
          stickySectionHeadersEnabled
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: COLORS.lightGray2,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...FONTS.body3,
    color: COLORS.gray,
    fontWeight: '600',
  },
  activeTabText: {
    color: COLORS.white,
  },
  listContent: {
    paddingBottom: 20,
  },
  listHeader: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 12,
    gap: 8,
    alignItems: 'center',
  },
  listHeaderText: {
    ...FONTS.body4,
    color: COLORS.black,
    flex: 1,
  },
  listItem: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 16,
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray2,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    ...FONTS.body3,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemDescription: {
    ...FONTS.body4,
    color: COLORS.gray,
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.lightGray,
    marginLeft: 68,
  },
  sectionHeader: {
    backgroundColor: COLORS.lightGray2,
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  sectionHeaderText: {
    ...FONTS.h4,
    color: COLORS.black,
    fontWeight: '600',
  },
  listFooter: {
    padding: 20,
    alignItems: 'center',
  },
  listFooterText: {
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
});

export default ListsDemo;
