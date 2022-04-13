import { getLatestVersion } from './getLatestVersion';
import { needsUpdate } from './needsUpdate';
import { compare, CompareOperator } from 'compare-versions';
import { AppStoreProvider } from './providers/AppStoreProvider';
import { PlayStoreProvider } from './providers/PlayStoreProvider';
import { Platform } from 'react-native';

export interface IProvider {
  getVersion(options: GetVersionOptions): Promise<GetVersionResponse>;
}

export type GetVersionResponse = {
  version: string;
  url: string;
  compare(
    firstVersion: string,
    secondVersion: string,
    operator: CompareOperator
  ): boolean;
}

export type BaseOptions = {
  packageName: string;
  countryCode: string;
}

export type GetVersionOptions = BaseOptions & {
  ignoreErrors?: boolean;
  fetchOptions?: RequestInit;
}

export type NeedsUpdate = Omit<GetVersionResponse, 'compare'> & {
  updateNeeded: boolean;
  currentVersion: string;
}


export const Provider = Platform.select({
    ios: new AppStoreProvider(),
    android: new PlayStoreProvider(),
})!;

export const VersionChecker = {
    needsUpdate,
    getLatestVersion,
    getStoreUrl: Provider.storeUrl,
    appStoreUrl: new AppStoreProvider().storeUrl,
    platStoreUrl: new PlayStoreProvider().storeUrl,
    compare,
    provider: Provider,
};
