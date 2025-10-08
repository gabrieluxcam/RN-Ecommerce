# Project Structure Quick Reference

## Directory Structure

```
RN-Ecommerce/
├── screens/
│   ├── Showcase/                      # NEW - Feature demonstration screens
│   │   ├── AnimationsDemo.tsx         # Reanimated animations showcase
│   │   ├── GesturesDemo.tsx          # Gesture handler demonstrations
│   │   ├── FormsDemo.tsx             # Form inputs and validation
│   │   ├── ListsDemo.tsx             # FlatList & SectionList performance
│   │   ├── ChartsDemo.tsx            # SVG-based charts
│   │   ├── NetworkingDemo.tsx        # API calls and networking
│   │   ├── StorageDemo.tsx           # Storage operations
│   │   ├── MapsDemo.tsx              # Maps placeholder
│   │   ├── CameraDemo.tsx            # Camera placeholder
│   │   ├── NativeModulesDemo.tsx     # Native module examples
│   │   ├── TestPage1.tsx             # Blank test page
│   │   ├── TestPage2.tsx             # Blank test page
│   │   └── index.ts                  # Barrel exports
│   ├── Forms/
│   │   ├── Address.js
│   │   └── Login.js
│   ├── Splash/
│   │   └── SplashScreen.js
│   ├── Account.tsx                    # Account screen with tests
│   ├── Brand.tsx                      # NEW - Brand listings
│   ├── Cart.js                        # UPDATED - Shopping cart
│   ├── Categories.js                  # Category listings
│   ├── Detail.js                      # UPDATED - Product details
│   ├── Home.js                        # UPDATED - Home screen
│   ├── Pan.js
│   ├── ProductList.tsx               # UPDATED - Product list
│   ├── WebViewScreen.tsx
│   └── index.js                       # UPDATED - Screen exports
├── navigations/
│   ├── AppNavigator.tsx              # UPDATED - Main drawer navigator
│   ├── HomeNavigator.tsx             # UPDATED - Bottom tabs navigator
│   ├── AccountNavigator.tsx
│   ├── AddressNavigator.tsx
│   ├── LoginNavigator.tsx
│   ├── MenuNavigator.tsx
│   └── ProductListNavigator.tsx
├── constants/                         # App constants (colors, fonts, etc.)
├── src/
│   ├── context/                      # React context providers
│   ├── types/                        # TypeScript type definitions
│   └── data/                         # Mock data
├── App.tsx                           # Root component
├── package.json
├── ENHANCEMENTS_SUMMARY.md           # NEW - Detailed enhancement docs
└── PROJECT_STRUCTURE.md              # NEW - This file
```

## Navigation Hierarchy

```
App
└── AppNavigator (Drawer)
    ├── HomePage (Bottom Tabs)
    │   ├── Home
    │   ├── Category
    │   ├── Brand (FIXED)
    │   ├── Account (FIXED)
    │   └── MyBag (FIXED)
    ├── Address
    ├── Login
    ├── ProductList
    ├── Categories
    ├── AnimationsDemo (NEW)
    ├── GesturesDemo (NEW)
    ├── FormsDemo (NEW)
    ├── ListsDemo (NEW)
    ├── MapsDemo (NEW)
    ├── CameraDemo (NEW)
    ├── ChartsDemo (NEW)
    ├── NativeModulesDemo (NEW)
    ├── NetworkingDemo (NEW)
    ├── StorageDemo (NEW)
    ├── TestPage1 (NEW)
    ├── TestPage2 (NEW)
    └── Account Tests
```

## Screen Components by Type

### E-Commerce Screens (Original)
- **Home** - Product showcase, trending items
- **Categories** - Product categories
- **Brand** - Brand listings (NEW)
- **ProductList** - Grid of products
- **Detail** - Product details
- **Cart** - Shopping cart
- **Account** - User account
- **Address** - Address form
- **Login** - Login form

### Feature Showcase Screens (NEW)
- **AnimationsDemo** - Animation examples
- **GesturesDemo** - Gesture handling
- **FormsDemo** - Form inputs
- **ListsDemo** - List performance
- **ChartsDemo** - Data visualization
- **NetworkingDemo** - API calls
- **StorageDemo** - Data persistence
- **MapsDemo** - Maps (placeholder)
- **CameraDemo** - Camera (placeholder)
- **NativeModulesDemo** - Native APIs

### Test Screens (NEW)
- **TestPage1** - Blank test page
- **TestPage2** - Blank test page

## Key Files Modified

### Navigation
- `/navigations/AppNavigator.tsx` - Added 12 new drawer screens
- `/navigations/HomeNavigator.tsx` - Fixed bottom tabs, added Brand & Account

### Screens
- `/screens/Home.js` - Changed ₹ to $
- `/screens/Cart.js` - Changed ₹ to $, added default handling
- `/screens/Detail.js` - Changed ₹ to $
- `/screens/ProductList.tsx` - Changed ₹ to $

## Quick Access Paths

### Main E-Commerce Features
```
Home → /screens/Home.js
Products → /screens/ProductList.tsx
Product Detail → /screens/Detail.js
Cart → /screens/Cart.js
Brands → /screens/Brand.tsx (NEW)
```

### Feature Demos
```
All showcases → /screens/Showcase/
Animations → /screens/Showcase/AnimationsDemo.tsx
Gestures → /screens/Showcase/GesturesDemo.tsx
Forms → /screens/Showcase/FormsDemo.tsx
Lists → /screens/Showcase/ListsDemo.tsx
Charts → /screens/Showcase/ChartsDemo.tsx
Networking → /screens/Showcase/NetworkingDemo.tsx
Storage → /screens/Showcase/StorageDemo.tsx
```

## Dependencies

### Core Navigation
- @react-navigation/native
- @react-navigation/drawer
- @react-navigation/bottom-tabs
- @react-navigation/stack

### UI & Animations
- react-native-reanimated
- react-native-gesture-handler
- react-native-svg
- react-native-vector-icons

### Other
- react-native-safe-area-context
- react-native-screens

## Color Scheme

```typescript
Primary: COLORS.primary (from constants)
Success: #4CAF50
Error: #F44336
Info: #2196F3
Warning: #FF9800
Background: COLORS.lightGray2
Text: COLORS.black
Secondary Text: COLORS.gray
```

## Icon Library

Using **MaterialCommunityIcons** from react-native-vector-icons:
- home
- format-list-bulleted-square
- tag-multiple
- account-circle-outline
- shopping-outline
- animation-play
- gesture-tap
- form-textbox
- chart-bar
- database
- and many more...

## File Naming Conventions

- **TypeScript screens**: `.tsx` extension
- **JavaScript screens**: `.js` extension
- **Component names**: PascalCase
- **File names**: PascalCase matching component name
- **Barrel exports**: `index.ts` or `index.js`

## State Management

- React Context for global state (`ClothesContext`)
- Local state with `useState` in components
- No Redux or external state management

## Testing

The app includes test pages for custom testing:
- `/screens/Showcase/TestPage1.tsx`
- `/screens/Showcase/TestPage2.tsx`

## Development Tips

1. **Adding a new showcase screen:**
   - Create file in `/screens/Showcase/`
   - Add export to `/screens/Showcase/index.ts`
   - Add to drawer in `/navigations/AppNavigator.tsx`

2. **Modifying navigation:**
   - Main drawer: `/navigations/AppNavigator.tsx`
   - Bottom tabs: `/navigations/HomeNavigator.tsx`

3. **Currency changes:**
   - All currency symbols should be `$`
   - Check price rendering functions

4. **Icon changes:**
   - Use MaterialCommunityIcons
   - Check icon name at: https://materialdesignicons.com/

## Build Commands

```bash
# Install dependencies
yarn install

# iOS
yarn pod-install
yarn ios

# Android
yarn android

# Start Metro bundler
yarn start
```

## Git Branch

Current branch: `test/paymentSheet`

## Additional Resources

- Full documentation: `/ENHANCEMENTS_SUMMARY.md`
- React Native docs: https://reactnative.dev
- React Navigation: https://reactnavigation.org
- Reanimated: https://docs.swmansion.com/react-native-reanimated/
