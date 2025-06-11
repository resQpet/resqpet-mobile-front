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
            <ScrollView className="flex-1 bg-white">
                <View className="flex-1 p-6 items-start w-full max-w-2xl self-center">
                    {children}
                </View>
            </ScrollView>
        </>
    );
};
