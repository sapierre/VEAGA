import { getTrackingPermissionsAsync } from "expo-tracking-transparency";
import { useEffect, useState, useCallback } from "react";
import { AppState } from "react-native";

export const useTrackingPermissions = () => {
  const [granted, setGranted] = useState(false);

  const checkPermission = useCallback(async () => {
    const { granted: isGranted } = await getTrackingPermissionsAsync();
    setGranted(isGranted);
  }, []);

  useEffect(() => {
    void checkPermission();
  }, [checkPermission]);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      if (status !== "active") {
        return;
      }

      void checkPermission();
    });

    return () => {
      subscription.remove();
    };
  }, [checkPermission]);

  return granted;
};
