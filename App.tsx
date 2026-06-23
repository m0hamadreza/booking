/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// NativeWind styles must register inside the EXPOSED module graph (this file is
// exposed to the host), so they load both standalone and when federated.
import './global.css';
import { useCallback, useRef } from 'react';
import {
  Button,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCounterStore } from 'super-app-showcase-sdk/lib/counterStore';

function Counter() {
  const count = useCounterStore(state => state.count);
  const increment = useCounterStore(state => state.increment);
  const decrement = useCounterStore(state => state.decrement);

  return (
    <View style={styles.counter}>
      <Text style={styles.counterLabel}>Shared counter</Text>
      <Text style={styles.counterValue}>{count}</Text>
      <View style={styles.counterActions}>
        <Button title="-" onPress={decrement} />
        <Button title="+" onPress={increment} />
      </View>
    </View>
  );
}

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <AppContent />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function AppContent() {
  useSafeAreaInsets();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      {/* NativeWind smoke test — booking (red) */}
      <View className="self-center rounded-xl bg-red-500 px-4 py-3">
        <Text className="font-bold text-white">NativeWind ✓ booking (red)</Text>
      </View>
      <Text style={styles.title}>Booking</Text>
      <Counter />
      <Button title="Open booking details" onPress={handlePresentModalPress} />

      <BottomSheetModal ref={bottomSheetModalRef} snapPoints={['40%', '75%']}>
        <BottomSheetView style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>Booking details</Text>
          <Text style={styles.sheetText}>
            This bottom sheet is powered by @gorhom/bottom-sheet.
          </Text>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  counter: {
    alignItems: 'center',
    gap: 8,
  },
  counterLabel: {
    fontSize: 14,
    color: '#666',
  },
  counterValue: {
    fontSize: 40,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  counterActions: {
    flexDirection: 'row',
    gap: 24,
  },
  sheetContent: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    gap: 8,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  sheetText: {
    textAlign: 'center',
    color: '#444',
  },
});

export default App;
