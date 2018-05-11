export class HotelConstant {
  static MAX_ROOMS_ALLOWED = 5;
  static ADULTS_PER_ROOM = 2;
  static CHILDREN_PER_ROOM = 2;
  static MAX_CHILD_AGE = 12;
  static SEARCH_RADIUS = 5.0;
  static HOTEL_BOOKING_INFO = 'hotel-booking-info';

  static MAX_TRAVEL_REQUEST_ROOMS = 4;

  static SAME_DAY_CHECKIN_LIMIT = 10;
  static TRAVEL_REQUEST_PRE_CHECKIN_BUFFER_DAYS = 7;

  static MAX_ADDABLE_HOTEL_ROOMS = 10;

  static HOTEL_TYPE = {
    NORMAL: 0,
    CORPORATE: 1,
    HL: 2,
  };

  static FILTERS = {
    SORT: {
      DEFAULT: 0,
      PRICE_LOW_TO_HIGH: 1,
      PRICE_HIGH_TO_LOW: 2,
      STAR_CATEGORY_LOW_TO_HIGH: 3,
      STAR_CATEGORY_HIGH_TO_LOW: 4,
    },

    SORT_ORDER: {
      1: { field: 'normal.low_rate_room.data.per_night_price', order: 'asc' },
      2: { field: 'normal.low_rate_room.data.per_night_price', order: 'desc' },
      3: { field: 'hotel.data.star_rating', order: 'asc' },
      4: { field: 'hotel.data.star_rating', order: 'desc' },
    }
  };
}
