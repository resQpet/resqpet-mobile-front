import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function MainTabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#0f766e',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          borderRadius: 16,
          height: 80,
          shadowColor: '#000',
          shadowOpacity: 0.08,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 8,
          elevation: 6,
          backgroundColor: '#fff',
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          switch (route.name) {
            case 'index':
              iconName = 'home-outline';
              break;
            case 'search':
              iconName = 'search-outline';
              break;
            case 'settings':
              iconName = 'settings-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    />
  );
}
