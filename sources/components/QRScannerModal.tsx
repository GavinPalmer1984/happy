import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { CameraView } from 'expo-camera';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Typography } from '@/constants/Typography';
import { t } from '@/text';

interface QRScannerModalProps {
    onClose: () => void;
    onScanned: (data: string) => void;
    /** URL prefix to match (e.g., 'happy://terminal?' or 'happy:///account?') */
    urlPrefix?: string;
}

/**
 * QR Scanner modal for web platform.
 * Uses CameraView with onBarcodeScanned since the native launchScanner API
 * is not available on web.
 */
export function QRScannerModal({ onClose, onScanned, urlPrefix = 'happy://terminal?' }: QRScannerModalProps) {
    const { theme } = useUnistyles();
    const [hasScanned, setHasScanned] = React.useState(false);

    const handleBarcodeScanned = React.useCallback(({ data }: { data: string }) => {
        if (hasScanned) return;
        if (data.startsWith(urlPrefix)) {
            setHasScanned(true);
            onScanned(data);
            onClose();
        }
    }, [hasScanned, onScanned, onClose, urlPrefix]);

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.header}>
                <Text style={[styles.title, { color: theme.colors.text }]}>
                    {t('components.qrScanner.scanQrCode')}
                </Text>
                <Pressable onPress={onClose} style={styles.closeButton}>
                    <Text style={[styles.closeButtonText, { color: theme.colors.textLink }]}>
                        {t('common.cancel')}
                    </Text>
                </Pressable>
            </View>
            <View style={styles.cameraContainer}>
                <CameraView
                    style={styles.camera}
                    facing="back"
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr'],
                    }}
                    onBarcodeScanned={handleBarcodeScanned}
                />
                <View style={styles.overlay}>
                    <View style={[styles.scanArea, { borderColor: theme.colors.button.primary.background }]} />
                </View>
            </View>
            <Text style={[styles.instructions, { color: theme.colors.textSecondary }]}>
                {t('components.qrScanner.pointCameraAtQr')}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 400,
        maxWidth: '90%',
        borderRadius: 16,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        ...Typography.default('semiBold'),
        fontSize: 18,
    },
    closeButton: {
        padding: 8,
    },
    closeButtonText: {
        ...Typography.default('semiBold'),
        fontSize: 16,
    },
    cameraContainer: {
        width: '100%',
        aspectRatio: 1,
        position: 'relative',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scanArea: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderRadius: 16,
    },
    instructions: {
        ...Typography.default(),
        fontSize: 14,
        textAlign: 'center',
        padding: 16,
    },
});
