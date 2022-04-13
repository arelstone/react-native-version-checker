# @arelstone/react-native-versionchecker

![npm (scoped)](https://shields.cdn.bka.li/npm/v/@arelstone/react-native-version-checker?label=version&style=for-the-badge)
![npm](https://shields.cdn.bka.li/npm/dt/@arelstone/react-native-version-checker?style=for-the-badge)
![GitHub issues](https://shields.cdn.bka.li/github/issues/arelstone/react-native-version-checker?style=for-the-badge)
![GitHub pull requests](https://shields.cdn.bka.li/github/issues-pr/arelstone/react-native-version-checker?style=for-the-badge)

Ever needed to check if your app is up to date? No fear, `@arelstone/react-native-version-checker` is here!

This is a pure javascript implementation, meaing it will work with both pure [react native](https://reactnative.dev/) and [expo](https://expo.dev/)

## Installation
Yarn:
```sh
yarn add @arelstone/react-native-version-checker
```
npm:
```sh
npm install @arelstone/react-native-version-checker
```

## Usage
```tsx
import { Alert, Linking } from 'react-native';
import { VersionChecker } from '@arelstone/react-native-version-checker'


const defaults = {
    packageName: 'com.facebook.katana',
    countryCode: 'da', // You can get this from DeviceInfo or something similar
}

const latestVersion = async () => {
    const { version } = await VersionChecker.getLatestVersion(defaults);

    return console.log(
        'VersionChecker',
        `Latest version in the store is ${version}`,
    );
};

const needsUpdate = async () => {
    const { currentVersion, updateNeeded, url, version } = await VersionChecker.needsUpdate(
        '2.2.24', // This could come from DeviceInfo or something similar
        defaults,
    );

    if (updateNeeded) {
        Alert.alert(
            'VersionChecker',
            `You need to update the app. You are running ${currentVersion}. The lastest version is ${version}`,
            [{
                onPress: () => Linking.canOpenURL(url).then(yes => {
                    if (!yes) { return 'Could not open the store'; }
                    
                    return Linking.openURL(url);
                }),
            }],
        );
    }
};
```

## Contributing
Open source development is all about contributions. If you feel that something is missing, feel free to submit a pull request.
