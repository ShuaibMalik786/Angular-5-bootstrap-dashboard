export class AdminHelper {

  static getStatus(status: string): string {
    if (status === 'approved' || status === 'confirmed' || status === 'active') {
      return 'label-success';
    } else if (status === 'declined' || status === 'expired' || status === 'disabled' ||
      status === 'failed' || status === 'cancelled') {
      return 'label-danger';
    } else if (status === 'pending') {
      return 'label-warning';
    } else if (status === 'initiated') {
      return 'label-info';
    }
    return 'label-default';
  }

}
