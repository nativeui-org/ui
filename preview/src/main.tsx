import React, { Component, Suspense, lazy, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { colorScheme, cssInterop } from "nativewind";
import { Alert, Animated } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import previews from "virtual:previews";

// Animated wrappers are separate component identities from View/Text. Register
// their className mapping so dialog, drawer and progress styles reach the DOM.
cssInterop(Animated.View, { className: "style" });
cssInterop(Feather, { className: "style" });
cssInterop(Ionicons, { className: "style" });

const componentName =
  new URLSearchParams(location.search).get("component") ?? "";
const notify = (status: "ready" | "error") => {
  parent.postMessage(
    { type: "nativeui-preview", component: componentName, status },
    location.origin,
  );
};

window.addEventListener("message", (event) => {
  if (event.origin !== location.origin || event.source !== parent) return;
  if (
    event.data?.type === "nativeui-preview-theme" &&
    ["light", "dark"].includes(event.data.theme)
  ) {
    colorScheme.set(event.data.theme);
  }
});

class PreviewBoundary extends Component<
  React.PropsWithChildren,
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error) {
    console.error("Unable to render component preview", error);
    notify("error");
  }
  render() {
    return this.state.failed ? (
      <div role="alert" className="preview-message">
        Unable to load this preview. Use Reset preview to try again.
      </div>
    ) : (
      this.props.children
    );
  }
}

function Ready({ children }: React.PropsWithChildren) {
  useEffect(() => {
    notify("ready");
  }, []);
  return children;
}

// React Native Web's Alert is a no-op. Keep demo feedback within the iframe
// instead of opening a dialog in the documentation's top-level window.
function DemoAlert() {
  const [alert, setAlert] = useState<{
    title: string;
    message?: string;
  } | null>(null);
  const dialog = React.useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const original = Alert.alert;
    Alert.alert = (title, message) => setAlert({ title, message });
    return () => {
      Alert.alert = original;
    };
  }, []);
  useEffect(() => {
    if (alert) dialog.current?.showModal();
  }, [alert]);
  return (
    alert && (
      <dialog
        ref={dialog}
        onClose={() => setAlert(null)}
        className="m-auto max-w-[90%] rounded-xl bg-background p-6 text-foreground backdrop:bg-black/40"
      >
        <h2 className="text-lg font-semibold">{alert.title}</h2>
        <p className="my-4">{alert.message}</p>
        <form method="dialog">
          <button className="min-h-10 rounded-lg bg-primary px-4 text-primary-foreground">
            OK
          </button>
        </form>
      </dialog>
    )
  );
}

const loader = Object.prototype.hasOwnProperty.call(previews, componentName)
  ? previews[componentName]
  : undefined;
const Preview = loader ? lazy(loader) : null;
document.title = `${componentName || "Unknown component"} — NativeUI preview`;

createRoot(document.getElementById("root")!).render(
  <PreviewBoundary>
    {Preview ? (
      <GestureHandlerRootView style={{ flex: 1, minHeight: 0, paddingTop: 44 }}>
        <SafeAreaProvider
          initialMetrics={{
            frame: { x: 0, y: 0, width: 375, height: 812 },
            insets: { top: 0, right: 0, bottom: 34, left: 0 },
          }}
        >
          <SafeAreaInsetsContext.Provider
            value={{ top: 0, right: 0, bottom: 34, left: 0 }}
          >
            <Suspense
              fallback={
                <div role="status" className="preview-message">
                  Loading preview…
                </div>
              }
            >
              <Ready>
                <Preview />
              </Ready>
            </Suspense>
            <DemoAlert />
          </SafeAreaInsetsContext.Provider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    ) : (
      <div role="alert" className="preview-message">
        No preview found for this component.
      </div>
    )}
  </PreviewBoundary>,
);

if (!Preview) notify("error");
