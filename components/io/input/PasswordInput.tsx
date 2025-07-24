import { Controller } from 'react-hook-form';
import { Text, TextInput } from 'react-native';

export const PasswordInput = ({ control, name, placeholder }: any) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <>
        <TextInput
          className="rounded-lg border bg-gray-100 p-2"
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          secureTextEntry
        />
        {error && <Text className="mt-1 text-xs text-red-500">{error.message}</Text>}
      </>
    )}
  />
);