"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Shown so the user knows which part failed. */
  label: string;
}

interface State {
  error: Error | null;
}

/**
 * Wraps one tab panel. Without this a single throwing tab white-screens the
 * whole app — which matters most in the situation this app is built for:
 * offline, underground, with no way to debug or reload from a network.
 */
export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prev: Props) {
    // Switching tabs clears a previous tab's failure.
    if (prev.label !== this.props.label && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="error-box" role="alert">
        <strong>The {this.props.label} tab failed to render.</strong>
        <p style={{ margin: "6px 0" }}>
          Every other tab still works — switch to one of those. The rest of the app, including anything
          saved for offline use, is unaffected.
        </p>
        <p className="small" style={{ margin: "0 0 10px", opacity: 0.85, fontFamily: "ui-monospace, monospace" }}>
          {error.message}
        </p>
        <button className="btn" onClick={() => this.setState({ error: null })}>
          Try again
        </button>
      </div>
    );
  }
}
