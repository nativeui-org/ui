"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { BatteryFull, Moon, RotateCcw, Signal, Sun, Wifi } from "lucide-react";
import styles from "./interactive-preview.module.css";

export function InteractivePreview({
  componentName,
}: {
  componentName: string;
}) {
  // Remount when navigating between docs, so loading/error state cannot leak.
  return <PhonePreview key={componentName} componentName={componentName} />;
}

function PhonePreview({ componentName }: { componentName: string }) {
  const { resolvedTheme } = useTheme();
  const [themeOverride, setThemeOverride] = useState<"light" | "dark" | null>(
    null,
  );
  const theme = themeOverride ?? (resolvedTheme === "dark" ? "dark" : "light");
  const [revision, setRevision] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [scale, setScale] = useState(1);
  const container = useRef<HTMLDivElement>(null);
  const iframe = useRef<HTMLIFrameElement>(null);

  const sendTheme = useCallback(() => {
    iframe.current?.contentWindow?.postMessage(
      { type: "nativeui-preview-theme", theme },
      window.location.origin,
    );
  }, [theme]);

  useEffect(sendTheme, [sendTheme]);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / 395));
    });
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(
      () => setStatus((current) => (current === "loading" ? "error" : current)),
      30000,
    );
    const receive = (event: MessageEvent) => {
      if (
        event.origin !== window.location.origin ||
        event.source !== iframe.current?.contentWindow
      )
        return;
      if (
        event.data?.type !== "nativeui-preview" ||
        event.data.component !== componentName
      )
        return;
      if (event.data.status === "ready" || event.data.status === "error") {
        window.clearTimeout(timeout);
        setStatus(event.data.status);
      }
    };
    window.addEventListener("message", receive);
    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("message", receive);
    };
  }, [componentName, revision]);

  const reset = () => {
    setStatus("loading");
    setRevision((value) => value + 1);
  };

  return (
    <section
      aria-label={`${componentName} interactive preview`}
      className={styles.preview}
    >
      <div className={styles.toolbar}>
        <span className="text-sm text-muted-foreground">
          Interactive preview
        </span>
        <div className="flex gap-1">
          <button
            type="button"
            className={styles.control}
            onClick={() =>
              setThemeOverride(theme === "dark" ? "light" : "dark")
            }
            aria-label={`Use ${theme === "dark" ? "light" : "dark"} preview theme`}
            title="Toggle preview theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            className={styles.control}
            onClick={reset}
            aria-label="Reset preview"
            title="Reset preview"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <div ref={container} className={styles.container}>
        <div style={{ width: 395 * scale, height: 832 * scale }}>
          <div
            className={styles.phone}
            style={{ transform: `scale(${scale})` }}
            data-theme={theme}
          >
            <div className={styles.screen}>
              <iframe
                key={revision}
                ref={iframe}
                title={`${componentName} interactive component preview`}
                src={`/previews/index.html?component=${encodeURIComponent(componentName)}`}
                width={375}
                height={812}
                onLoad={sendTheme}
                onError={() => setStatus("error")}
                className={styles.iframe}
              />
              {status !== "ready" && (
                <div
                  className={styles.message}
                  role={status === "error" ? "alert" : "status"}
                >
                  {status === "loading" ? (
                    "Loading preview…"
                  ) : (
                    <>
                      <p>Unable to load this preview.</p>
                      <button
                        type="button"
                        className={styles.retry}
                        onClick={reset}
                      >
                        Try again
                      </button>
                    </>
                  )}
                </div>
              )}
              <div className={styles.statusBar} aria-hidden="true">
                <span>9:41</span>
                <div className={styles.notch} />
                <div className="flex items-center gap-1">
                  <Signal size={15} />
                  <Wifi size={15} />
                  <BatteryFull size={20} />
                </div>
              </div>
              <div className={styles.homeIndicator} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Click, type, and scroll to try the component.
      </p>
    </section>
  );
}
