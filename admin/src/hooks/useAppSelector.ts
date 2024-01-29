import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@recargas-dominicanas/core/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
