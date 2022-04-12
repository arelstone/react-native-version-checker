import { View, Button, Alert, Linking } from 'react-native';
import { VersionChecker } from '../src/index';

export const App = () => {
    const latestVersion = async () => {
        const { version } = await VersionChecker.getLatestVersion({
            packageName: 'com.facebook.katana',
            countryCode: 'da',
        });

        return console.log(
            'VersionChecker',
            `Latest version in the store is ${version}`,
        );
    };

    const needsUpdate = async () => {
        const { currentVersion, updateNeeded, url, version } = await VersionChecker.needsUpdate(
            '2.2.24', // This could come from DeviceInfo
            { countryCode: 'da', packageName: 'com.facebook.katana' },
        );

        if (updateNeeded) {
            Alert.alert(
                'VersionChecker',
                `You need to update the app. You are running ${currentVersion}. The lastest version is ${version}`,
                [{
                    onPress: () => Linking.canOpenURL(url).then(yes => {
                        if (!yes) {
                            return 'Could not open the store';
                        }

                        return Linking.openURL(url);
                    }),
                }],
            );
        }
    };

    return <View>
        <Button
            title="Get latest version"
            onPress={latestVersion}
        />
        <Button
            title="Is the current version outdated?"
            onPress={needsUpdate}
        />
    </View>;
};
