import { GetVersionOptions, GetVersionResponse, IProvider, Provider } from '.';

export type GetLatestVersionOptions = GetVersionOptions & {
  provider?: IProvider;
}

const DEFAULTS: Partial<GetLatestVersionOptions> = {
    ignoreErrors: true,
    provider: Provider,
};

export const getLatestVersion = async ({
    countryCode, packageName, ignoreErrors, provider,
}: GetLatestVersionOptions): Promise<GetVersionResponse> => {
    try {
        return await (provider ?? DEFAULTS.provider)!.getVersion({
            countryCode,
            packageName,
            ignoreErrors,
        });

    } catch (error: any){
        if (ignoreErrors) {
            return Promise.reject();
        }
        throw error;
    }
};
