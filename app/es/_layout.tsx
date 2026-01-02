import { Stack } from "expo-router";

export default function ESLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
