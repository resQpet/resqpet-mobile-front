import {Controller} from "react-hook-form";
import {Text, TextInput} from "react-native";

export const Input = ({ control, name, placeholder, secureTextEntry = false }: any) => (
    <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
                <TextInput
                    className="border p-2 rounded bg-white mb-2"
                    value={value}
                    onChangeText={onChange}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                />
                {error && <Text className="text-red-500 text-xs mb-2">{error.message}</Text>}
            </>
        )}
    />
);
