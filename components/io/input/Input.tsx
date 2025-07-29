import { Controller } from 'react-hook-form';
import { Text, TextInput } from 'react-native';

export const Input = ({ control, name, placeholder, secureTextEntry = false }: any) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <TextInput
          className="mb-2 rounded-lg border bg-gray-100 p-2"
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
        />
        {error && <Text className="mb-2 text-xs text-red-500">{error.message}</Text>}
      </>
    )}
  />
);
