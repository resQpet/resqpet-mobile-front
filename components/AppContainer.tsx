import { SafeAreaView, ViewProps } from 'react-native';
import { cn } from '~/utils/Classname';

export const AppContainer = ({
  children,
  className = '',
  ...rest
}: ViewProps & { className?: string }) => {
  return (
    <SafeAreaView className={cn('flex-1 bg-white', className)} {...rest}>
      {children}
    </SafeAreaView>
  );
};
