import { Dimensions, Platform } from 'react-native';
import { getDeviceType } from '@/utils/responsive';
import { isRunningOnMac } from '@/utils/platform';

// Calculate max width based on device type
function getMaxWidth(): number {
    const deviceType = getDeviceType();

    // For phones, use a very large number so '100%' width works naturally
    // The container's actual width will constrain it
    if (deviceType === 'phone' && Platform.OS !== 'web') {
        return Number.POSITIVE_INFINITY;
    }

    if (isRunningOnMac()) {
        return Number.POSITIVE_INFINITY;
    }

    // For tablets and web, use 800px
    return 800;
}

// Calculate max width for layout content based on device type
function getMaxLayoutWidth(): number {
    const deviceType = getDeviceType();

    // For phones, use a very large number so the content uses full width
    // The parent container will naturally constrain it
    if (deviceType === 'phone' && Platform.OS !== 'web') {
        return Number.POSITIVE_INFINITY;
    }

    if (isRunningOnMac()) {
        return 1400;
    }

    // For tablets and web, use 800px
    return 800;
}

export const layout = {
    maxWidth: getMaxLayoutWidth(),
    headerMaxWidth: getMaxWidth()
}