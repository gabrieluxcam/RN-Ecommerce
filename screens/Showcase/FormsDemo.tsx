import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Switch,
  Alert,
} from 'react-native';
import {COLORS, FONTS} from '../../constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const FormsDemo = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [selectedOption, setSelectedOption] = useState('option1');

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(text);
  };

  const handleSubmit = () => {
    if (!email || !password || !name) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    Alert.alert('Success', 'Form submitted successfully!', [
      {
        text: 'OK',
        onPress: () => {
          setEmail('');
          setPassword('');
          setName('');
          setPhone('');
          setMessage('');
          setIsEnabled(false);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="form-textbox"
            size={40}
            color={COLORS.primary}
          />
          <Text style={styles.title}>Forms Demo</Text>
          <Text style={styles.subtitle}>
            Various input types and validation examples
          </Text>
        </View>

        <View style={styles.formContainer}>
          {/* Text Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Full Name <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="account"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={name}
                onChangeText={setName}
                placeholderTextColor={COLORS.gray}
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Email <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="email"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="your@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={COLORS.gray}
              />
            </View>
            {email && !validateEmail(email) && (
              <Text style={styles.errorText}>Invalid email format</Text>
            )}
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Password <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="lock"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor={COLORS.gray}
              />
            </View>
          </View>

          {/* Phone Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputWrapper}>
              <MaterialCommunityIcons
                name="phone"
                size={20}
                color={COLORS.gray}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="+1 (555) 123-4567"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor={COLORS.gray}
              />
            </View>
          </View>

          {/* Multiline Text Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Message</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter your message..."
              value={message}
              onChangeText={setMessage}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              placeholderTextColor={COLORS.gray}
            />
          </View>

          {/* Switch */}
          <View style={styles.switchContainer}>
            <View style={styles.switchLabel}>
              <MaterialCommunityIcons
                name="bell-ring"
                size={20}
                color={COLORS.gray}
              />
              <Text style={styles.switchText}>Enable Notifications</Text>
            </View>
            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
              trackColor={{false: COLORS.lightGray, true: COLORS.primary}}
              thumbColor={isEnabled ? COLORS.white : COLORS.lightGray2}
            />
          </View>

          {/* Radio Buttons */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select an Option</Text>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setSelectedOption('option1')}>
              <MaterialCommunityIcons
                name={
                  selectedOption === 'option1'
                    ? 'radiobox-marked'
                    : 'radiobox-blank'
                }
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.radioText}>Option 1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setSelectedOption('option2')}>
              <MaterialCommunityIcons
                name={
                  selectedOption === 'option2'
                    ? 'radiobox-marked'
                    : 'radiobox-blank'
                }
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.radioText}>Option 2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.radioContainer}
              onPress={() => setSelectedOption('option3')}>
              <MaterialCommunityIcons
                name={
                  selectedOption === 'option3'
                    ? 'radiobox-marked'
                    : 'radiobox-blank'
                }
                size={24}
                color={COLORS.primary}
              />
              <Text style={styles.radioText}>Option 3</Text>
            </TouchableOpacity>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Form</Text>
          </TouchableOpacity>
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
  formContainer: {
    backgroundColor: COLORS.white,
    marginTop: 16,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    ...FONTS.body3,
    color: COLORS.black,
    marginBottom: 8,
    fontWeight: '600',
  },
  required: {
    color: '#F44336',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    backgroundColor: COLORS.white,
  },
  inputIcon: {
    marginLeft: 12,
  },
  input: {
    flex: 1,
    padding: 12,
    ...FONTS.body4,
    color: COLORS.black,
  },
  textArea: {
    height: 100,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
    borderRadius: 8,
    padding: 12,
  },
  errorText: {
    ...FONTS.body5,
    color: '#F44336',
    marginTop: 4,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray,
    marginBottom: 20,
  },
  switchLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchText: {
    ...FONTS.body3,
    color: COLORS.black,
    marginLeft: 8,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  radioText: {
    ...FONTS.body4,
    color: COLORS.black,
    marginLeft: 12,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  submitButtonText: {
    color: COLORS.white,
    ...FONTS.body3,
    fontWeight: '600',
  },
});

export default FormsDemo;
