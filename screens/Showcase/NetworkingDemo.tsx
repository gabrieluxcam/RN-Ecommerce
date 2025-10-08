import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const NetworkingDemo = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5');
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const createPost = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New Post',
          body: 'This is a new post created via API',
          userId: 1,
        }),
      });
      const data = await response.json();
      setPosts([data, ...posts]);
    } catch (err) {
      setError('Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="api" size={40} color={COLORS.primary} />
          <Text style={styles.title}>Networking & API Demo</Text>
          <Text style={styles.subtitle}>Fetch, POST, and handle API responses</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API Operations</Text>
          <Text style={styles.description}>Test various HTTP methods with JSONPlaceholder API</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={fetchPosts}>
              <MaterialCommunityIcons name="download" size={20} color={COLORS.white} />
              <Text style={styles.buttonText}>GET Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={fetchUsers}>
              <MaterialCommunityIcons name="account-group" size={20} color={COLORS.white} />
              <Text style={styles.buttonText}>GET Users</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={[styles.button, styles.successButton]} onPress={createPost}>
            <MaterialCommunityIcons name="plus" size={20} color={COLORS.white} />
            <Text style={styles.buttonText}>POST New Data</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}

        {error !== '' && (
          <View style={styles.errorContainer}>
            <MaterialCommunityIcons name="alert-circle" size={24} color="#F44336" />
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {posts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Posts ({posts.length})</Text>
            {posts.map(post => (
              <View key={post.id} style={styles.dataCard}>
                <Text style={styles.cardTitle}>{post.title}</Text>
                <Text style={styles.cardBody}>{post.body}</Text>
                <Text style={styles.cardMeta}>User ID: {post.userId} | Post ID: {post.id}</Text>
              </View>
            ))}
          </View>
        )}

        {users.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Users ({users.length})</Text>
            {users.map(user => (
              <View key={user.id} style={styles.dataCard}>
                <View style={styles.userHeader}>
                  <MaterialCommunityIcons name="account-circle" size={40} color={COLORS.primary} />
                  <View style={styles.userInfo}>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <Text style={styles.userPhone}>{user.phone}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features Demonstrated</Text>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>GET requests with fetch API</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>POST requests with JSON body</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Loading states</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Error handling</Text>
          </View>
          <View style={styles.featureItem}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#4CAF50" />
            <Text style={styles.featureText}>Async/await pattern</Text>
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
  successButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: COLORS.white,
    ...FONTS.body3,
    fontWeight: '600',
  },
  loadingContainer: {
    backgroundColor: COLORS.white,
    marginTop: 16,
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    ...FONTS.body3,
    color: COLORS.gray,
    marginTop: 12,
  },
  errorContainer: {
    backgroundColor: '#FFEBEE',
    marginTop: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 8,
    marginHorizontal: 16,
  },
  errorText: {
    ...FONTS.body3,
    color: '#F44336',
    flex: 1,
  },
  dataCard: {
    backgroundColor: COLORS.lightGray2,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  cardTitle: {
    ...FONTS.body3,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardBody: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 8,
  },
  cardMeta: {
    ...FONTS.body5,
    color: COLORS.gray,
  },
  userHeader: {
    flexDirection: 'row',
    gap: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    ...FONTS.body3,
    color: COLORS.black,
    fontWeight: '600',
    marginBottom: 4,
  },
  userEmail: {
    ...FONTS.body4,
    color: COLORS.gray,
    marginBottom: 2,
  },
  userPhone: {
    ...FONTS.body4,
    color: COLORS.gray,
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
});

export default NetworkingDemo;
