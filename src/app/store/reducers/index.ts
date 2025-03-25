import { combineSlices } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LazyLoadedSlices {}

const rootReducer = combineSlices().withLazyLoadedSlices<LazyLoadedSlices>();

export default rootReducer;
