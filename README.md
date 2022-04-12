# @arelstone/react-native-versionchecker
<!-- Please add a description here -->

## Installation
Yarn:
```sh
yarn add @arelstone/react-native-versionchecker
```
npm:
```sh
npm install @arelstone/react-native-versionchecker
```

## Usage
```tsx
import { View, Button, Alert, Linking } from 'react-native';
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
