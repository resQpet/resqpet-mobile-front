import React from 'react';
import { Text } from 'react-native';

type Props = {
  date: string;
};

export const PublicationDate = ({ date }: Props) => {
  const formatted = new Date(date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return <Text className="text-sm text-gray-400">{formatted}</Text>;
};
