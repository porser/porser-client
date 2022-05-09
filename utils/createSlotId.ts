type SlotType = "group" | "field" | "singly" | "start" | "end";

const createSlotIds = (slot: SlotType, id?: string) =>
  `${slot}-slot${id ? `-${id}` : ""}`;

export default createSlotIds;
