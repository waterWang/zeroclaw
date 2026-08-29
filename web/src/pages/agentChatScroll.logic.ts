export const MANUAL_SCROLL_THRESHOLD_PX = 150;

export type ScrollMetrics = {
  clientHeight: number;
  scrollHeight: number;
  scrollTop: number;
};

export type ScrollSource = "manual" | "programmatic";

export function isNearBottom({ clientHeight, scrollHeight, scrollTop }: ScrollMetrics): boolean {
  return scrollHeight - scrollTop - clientHeight < MANUAL_SCROLL_THRESHOLD_PX;
}

export function nextFollowState(
  followsStream: boolean,
  source: ScrollSource,
  metrics: ScrollMetrics,
): boolean {
  return source === "manual" ? isNearBottom(metrics) : followsStream;
}
