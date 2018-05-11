export class HotelDestination {
  id: string;
  name: string;
  info: string;
  is_city: boolean;

  toString(): string {
    return this.name;
  }
}
