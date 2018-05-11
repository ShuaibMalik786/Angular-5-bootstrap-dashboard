import { DefaultConstant } from '../constants/default-constant';

export function title(title: string, dashboard = false, delimiter = '|') {
  let prefix = ` ${delimiter} ${DefaultConstant.SITE_NAME}`;

  if (dashboard) {
    prefix = ` ${delimiter} Dashboard ${prefix}`;
  }

  return `${title}${prefix}`;
}
