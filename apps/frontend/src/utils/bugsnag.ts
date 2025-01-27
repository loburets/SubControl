import React from 'react';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
// import BugsnagPerformance from '@bugsnag/browser-performance';

(async () => {
  const BugsnagPerformance = (await import('@bugsnag/browser-performance'))
    .default;

  Bugsnag.start({
    apiKey: '04bc3b7f94704a0e8e0e36443a41259a',
    plugins: [new BugsnagPluginReact()],
  });
  BugsnagPerformance.start({ apiKey: '04bc3b7f94704a0e8e0e36443a41259a' });
})();

const reactPlugin = Bugsnag.getPlugin('react');
const BugsnagErrorBoundary = reactPlugin?.createErrorBoundary(React);
const FallbackBoundary = React.Fragment;

export const ErrorBoundary = BugsnagErrorBoundary || FallbackBoundary;
