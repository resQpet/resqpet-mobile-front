import { ScrollView, View } from 'react-native';
import { Stack } from 'expo-router';
import React from "react";

export const AppScreen = ({
                              title,
                              children,
                          }: {
    title: string;
    children: React.ReactNode;
}) => {
    return (
        <>
            <Stack.Screen options={{ title }} />
            < View className="flex-1 bg-white">
                <View className="flex-1 w-full px-2 py-2">
                    {children}
                </View>
            </View>
        </>
    );
};
