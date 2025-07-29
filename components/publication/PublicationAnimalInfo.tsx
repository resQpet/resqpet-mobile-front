import React from 'react';
import { Text, View } from 'react-native';
import { Animal } from '~/domain/models/publication/Animal';

type Props = {
  animal: Animal;
};

const statusLabels: Record<string, string> = {
  AVAILABLE: 'Disponible para adopción',
  ADOPTED: 'Adoptado',
  LOST: 'Perdido',
  FOUND: 'Encontrado',
  FOSTERED: 'En hogar temporal',
  DECEASED: 'Fallecido',
};

const statusColors: Record<string, string> = {
  AVAILABLE: 'text-green-600',
  ADOPTED: 'text-blue-600',
  LOST: 'text-red-600',
  FOUND: 'text-teal-600',
  FOSTERED: 'text-yellow-600',
  DECEASED: 'text-gray-500',
};

export const PublicationAnimalInfo = ({ animal }: Props) => {
  const label = statusLabels[animal.status] ?? 'Estado desconocido';
  const color = statusColors[animal.status] ?? 'text-gray-500';

  return (
    <View className="mb-4 mt-2 rounded-md border border-teal-300 bg-teal-50 p-3">
      <Text className="text-sm font-bold text-teal-800">Mascota vinculada</Text>
      <Text className="text-sm text-gray-700">Nombre: {animal.name}</Text>
      <Text className="text-sm text-gray-700">Especie: {animal.species}</Text>
      <Text className="text-sm text-gray-700">
        Estado: <Text className={`font-semibold ${color}`}>{label}</Text>
      </Text>
    </View>
  );
};
