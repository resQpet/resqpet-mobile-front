import React,{forwardRef, use, useMemo,useRef,useCallback, ReactNode, Children} from 'react';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet' 
import { View,Text } from 'react-native';

interface Props {
  title:string;
  children?:React.ReactNode;
}
type Ref = BottomSheet;

export const BottomSheets = forwardRef<Ref,Props>((props,ref) => {
    const snapPoints = useMemo(()=>['25%','50%','80%'],[]);
    const renderBackdrop = useCallback((props:any)=> <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={0} {...props}/>,
        []);
    
    return(
      <BottomSheet 
            ref={ref}
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose={true}
            backdropComponent={renderBackdrop}
            backgroundStyle= {{backgroundColor:'white'}}
            handleIndicatorStyle={{backgroundColor:'#c38e1bff'}}>
                <BottomSheetView>
                  <Text className='text-center'>{props.title}</Text>
                  {props.children}
                </BottomSheetView>
            </BottomSheet>
              )
            });