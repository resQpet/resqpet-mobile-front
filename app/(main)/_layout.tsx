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
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'index':
              iconName = 'home-outline';
              break;
            case 'profile':
              iconName = 'person-outline';
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
