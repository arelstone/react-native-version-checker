import { compare } from 'compare-versions';
import { GetVersionOptions, NeedsUpdate, Provider } from '.';


export const needsUpdate = async (
    currentVersion: string, options: GetVersionOptions,
): Promise<NeedsUpdate> => {
    const { url, version } = await Provider.getVersion(options);

    return {
        updateNeeded: compare(currentVersion, version, '<'),
        url,
        currentVersion,
        version,
    };
};
