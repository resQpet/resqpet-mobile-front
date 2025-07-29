import { TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function FoundationSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (text: string) => void;
}) {
  return (
    <View className="flex-row items-center bg-white px-6 pb-4 pt-10 shadow-sm">
      <Ionicons name="search-outline" size={24} color="#0f766e" />
      <TextInput
        className="ml-3 flex-1 text-base text-slate-700"
        placeholder="Buscar fundaciones..."
        value={value}
        onChangeText={onChange}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </View>
  );
}
