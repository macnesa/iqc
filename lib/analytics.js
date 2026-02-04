import Plausible from "plausible-tracker";

export function initAnalytics() {
  const { trackPageview } = Plausible({
    domain: "iqc.com",
  });
  trackPageview();
}