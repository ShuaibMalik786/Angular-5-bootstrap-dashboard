export class InventoryTree {
  id: number;
  name: string;
  volume: number | null;
  image: string | null;
  children?: InventoryTree[];
}
