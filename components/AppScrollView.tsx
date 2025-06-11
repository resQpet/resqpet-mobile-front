import { ScrollView, ScrollViewProps } from 'react-native';
import { cn } from '~/utils/classname';

export const AppScrollView = ({ children, className = '', ...rest }: ScrollViewProps & { className?: string }) => {
    return (
        <ScrollView
            className={cn('flex-1 px-6 py-4', className)}
            showsVerticalScrollIndicator={false}
            {...rest}
        >
            {children}
        </ScrollView>
    );
};
