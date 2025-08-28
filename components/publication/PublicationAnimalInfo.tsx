import React from 'react';
import { Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

const statusIcons: Record<string, string> = {
  AVAILABLE: 'paw',
  ADOPTED: 'checkmark-circle',
  LOST: 'alert-circle',
  FOUND: 'help-circle',
  FOSTERED: 'home',
  DECEASED: 'close-circle',
};

const Tag = ({
  iconName,
  label,
  textColorClass,
}: {
  iconName: string;
  label: string;
  textColorClass: string;
}) => (
  <View className="flex-row items-center rounded-full bg-gray-100 px-3 py-1 mr-2 mb-2">
    <Ionicons name={iconName} size={14} color="currentColor" />
    <Text className={`ml-1 text-sm font-semibold ${textColorClass}`}>{label}</Text>
  </View>
);

export const PublicationAnimalInfo = ({ animal }: Props) => {
  const label = statusLabels[animal.status] ?? 'Estado desconocido';
  const color = statusColors[animal.status] ?? 'text-gray-500';
  const iconName = statusIcons[animal.status] ?? 'help-circle';

 const tagsData = [
  {
    iconName: 'pricetag',
    label: String(animal.species),
    textColorClass: 'text-green-700',
  },
  {
    iconName: 'paw-outline',
    label: animal.species ? String(animal.species) : 'Raza desconocida',
    textColorClass: 'text-blue-700',
  },
  {
    iconName: animal.gender === 'Macho' ? 'male' : 'female',
    label: animal.gender ? String(animal.gender) : 'Género desconocido',
    textColorClass: 'text-pink-600',
  },
  {
    iconName: 'timer',
    label: animal.ageMounths ? String(animal.ageMounths) : 'Edad desconocida',
    textColorClass: 'text-yellow-600',
  },
  {
    iconName: 'resize',
    label: animal.size ? String(animal.size) : 'Tamaño desconocido',
    textColorClass: 'text-purple-600',
  },
  {
    iconName: 'color-palette',
    label: animal.color ? String(animal.color) : 'Color desconocido',
    textColorClass: 'text-green-700',
  },
];

  return (
    <View className="mb-4 mt-2 rounded-md border border-teal-300 bg-teal-50 p-3">
      <Text className="text-sm font-bold text-teal-800 mb-2">Mascota vinculada</Text>
      <Text className="text-sm text-gray-700 mb-2">Nombre: {animal.name}</Text>

      <Tag iconName={iconName} label={label} textColorClass={color} />

      <View className="flex-row flex-wrap mt-2">
        {tagsData.map(({ iconName, label, textColorClass }, idx) => (
          <Tag key={idx} iconName={iconName} label={label} textColorClass={textColorClass} />
        ))}
      </View>
    </View>
  );
};
