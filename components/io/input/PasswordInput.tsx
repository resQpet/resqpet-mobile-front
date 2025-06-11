import { Controller } from 'react-hook-form';
import { TextInput, Text } from 'react-native';

export const PasswordInput = ({ control, name, placeholder }: any) => (
    <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
                <TextInput
                    className="border p-2 rounded bg-white"
                    value={value}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    secureTextEntry
                />
                {error && <Text className="text-red-500 text-xs mt-1">{error.message}</Text>}
            </>
        )}
    />
);