export class RelocationInfo {
  id: number;
  uuid: string;
  user_id: number;
  from_city: string;
  to_city: string;
  relocation_date: string;
  relocation_closed: boolean;
  relocation_display_date: string;
  relocation_attached: boolean;
  active_connections: number;
  has_inventory: boolean;
  can_update_whole_relocation: boolean;
  can_schedule_premove_survey: boolean;
}
