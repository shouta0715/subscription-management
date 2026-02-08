import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack>
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen
        name="setting"
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen.BackButton displayMode="minimal" />
        <Stack.Screen.Title>設定</Stack.Screen.Title>
      </Stack.Screen>
      <Stack.Screen
        name="help"
        options={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen.BackButton displayMode="minimal" />
        <Stack.Screen.Title>ヘルプ</Stack.Screen.Title>
      </Stack.Screen>
      <Stack.Screen
        name="(modal)"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default Layout;
