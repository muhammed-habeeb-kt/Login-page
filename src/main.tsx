import "@vly-ai/integrations";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Landing from "./pages/Landing";
import "./index.css";

/** Silent error boundary — if VlyToolbar crashes it renders nothing instead of
 *  crashing the whole app (e.g. hook errors in WebContainer environment). */
class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("[VlyToolbar] Caught error, toolbar disabled:", err.message);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToolbarErrorBoundary>
      <VlyToolbar />
    </ToolbarErrorBoundary>
    <Landing />
  </StrictMode>,
);
