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
import { vars } from 'nativewind';
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

// booking's brand color — scoped to booking's subtree via the --color-brand*
// CSS variables so it never leaks into the host or other mini-apps.
// Every shade is set so the whole `brand-50`..`brand-900` ramp resolves here.
const bookingTheme = vars({
  '--color-brand-50': '#eaf6ee',
  '--color-brand-100': '#d6eedc',
  '--color-brand-200': '#addcba',
  '--color-brand-300': '#84cb97',
  '--color-brand-400': '#5bb975',
  '--color-brand-500': '#32a852',
  '--color-brand-600': '#288642',
  '--color-brand-700': '#1e6531',
  '--color-brand-800': '#144321',
  '--color-brand-900': '#0a2210',
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <GestureHandlerRootView style={styles.root}>
      {/* vars() must sit on a core RN component (View) — NativeWind does NOT
          instrument GestureHandlerRootView, so a CSS var set there is dropped. */}
      <View style={[styles.root, bookingTheme]}>
        <SafeAreaProvider>
          <BottomSheetModalProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
            <AppContent />
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </View>
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
      <View className="self-center rounded-xl bg-brand-300 px-4 py-3">
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
