import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { KentraToastService } from "../feedback/toast.service";

describe("feedback services", () => {
  let service: KentraToastService;

  beforeEach(() => {
    vi.useFakeTimers();
    service = new KentraToastService();
  });

  afterEach(() => {
    service.clear();
    vi.useRealTimers();
  });

  it("creates a toast and promotes it to visible state", () => {
    const id = service.show({
      title: "Saved",
      message: "Profile has been updated",
      placement: "top-left",
    });

    const initialToast = service.toasts()[0];

    expect(id).toBe(initialToast?.id);
    expect(initialToast?.state).toBe("enter");
    expect(initialToast?.placement).toBe("top-left");

    vi.advanceTimersByTime(16);

    expect(service.toasts()[0]?.state).toBe("visible");
  });

  it("transitions closed toast to exit and removes it after animation", () => {
    const id = service.show({ title: "Saved" });

    vi.advanceTimersByTime(16);
    service.close(id);

    expect(service.toasts()[0]?.state).toBe("exit");

    vi.advanceTimersByTime(220);

    expect(service.toasts()).toHaveLength(0);
  });

  it("supports auto-dismiss by duration", () => {
    service.show({
      title: "Temporary",
      duration: 100,
    });

    vi.advanceTimersByTime(16);
    expect(service.toasts()[0]?.state).toBe("visible");

    vi.advanceTimersByTime(100);
    expect(service.toasts()[0]?.state).toBe("exit");

    vi.advanceTimersByTime(220);
    expect(service.toasts()).toHaveLength(0);
  });

  it("filters toasts by placement", () => {
    service.show({ title: "A", placement: "top-right" });
    service.show({ title: "B", placement: "bottom-center" });
    service.show({ title: "C", placement: "top-right" });

    const topRightToasts = service.toastsForPlacement("top-right");
    const bottomCenterToasts = service.toastsForPlacement("bottom-center");

    expect(topRightToasts()).toHaveLength(2);
    expect(bottomCenterToasts()).toHaveLength(1);
  });

  it("closes all toasts and clears store", () => {
    service.show({ title: "A" });
    service.show({ title: "B" });

    vi.advanceTimersByTime(16);
    service.closeAll();

    expect(service.toasts().every((toast) => toast.state === "exit")).toBe(true);

    vi.advanceTimersByTime(220);
    expect(service.toasts()).toHaveLength(0);

    service.show({ title: "C" });
    service.clear();
    expect(service.toasts()).toHaveLength(0);
  });
});
