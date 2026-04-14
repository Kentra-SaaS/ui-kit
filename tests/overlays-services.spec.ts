import { describe, expect, it } from "vitest";

import { KentraModalService } from "../overlays/modal.service";

describe("overlay services", () => {
  it("starts with closed state and toggles by id", () => {
    const service = new KentraModalService();
    const state = service.stateFor("settings-dialog");
    const isOpen = service.isOpen("settings-dialog");

    expect(state()).toBe("closed");
    expect(isOpen()).toBe(false);

    service.open("settings-dialog");
    expect(state()).toBe("open");
    expect(isOpen()).toBe(true);

    service.toggle("settings-dialog");
    expect(state()).toBe("closed");
    expect(isOpen()).toBe(false);
  });

  it("tracks multiple modals independently", () => {
    const service = new KentraModalService();

    service.open("settings");
    service.open("delete-confirm");
    service.close("settings");

    expect(service.stateFor("settings")()).toBe("closed");
    expect(service.stateFor("delete-confirm")()).toBe("open");
    expect(service.entries()).toEqual([{ id: "delete-confirm", state: "open" }]);
  });

  it("can close all open modals", () => {
    const service = new KentraModalService();

    service.open("settings");
    service.open("delete-confirm");

    expect(service.entries()).toHaveLength(2);

    service.closeAll();

    expect(service.entries()).toHaveLength(0);
    expect(service.stateFor("settings")()).toBe("closed");
    expect(service.stateFor("delete-confirm")()).toBe("closed");
  });

  it("ignores blank modal ids", () => {
    const service = new KentraModalService();

    service.open(" ");
    service.close(" ");
    service.toggle(" ");

    expect(service.entries()).toHaveLength(0);
  });
});
