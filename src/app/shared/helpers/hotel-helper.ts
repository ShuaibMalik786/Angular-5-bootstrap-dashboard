import { HotelConstant } from '../constants/hotel-constant';

import * as Fuse from 'fuse.js';
import * as moment from 'moment';
import * as _ from 'lodash';

import { Helper } from './helper';
import { HotelSearchData } from '../models/hotel-search-data-model';

export class HotelHelper {

  static searchOptions = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    threshold: 0.3,
    location: 0,
    distance: 5,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
      { name: 'hotel.data.name', weight: 0.7 },
      { name: 'hotel.data.address', weight: 0.3 }
    ]
  };

  static dateDMYToYMD(dateString: string) {
    const date = HotelHelper.getDateFromString(dateString);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

  static dateYMDToDMY(dateString: string) {
    const date = dateString.split('/');
    return date[2] + '/' + date[1] + '/' + date[0];
  }

  static isValidCheckIn(dateString: string) {
    const date = HotelHelper.getDateFromString(dateString);
    return date > new Date();
  }

  static isValidCheckOut(checkinDateString: string, checkoutDateString: string) {
    const checkin = HotelHelper.getDateFromString(checkinDateString);
    const checkout = HotelHelper.getDateFromString(checkoutDateString);
    return checkout > checkin;
  }

  static totalNights(checkinDateString: string, checkoutDateString: string) {
    const checkin = HotelHelper.getDateFromString(checkinDateString);
    const checkout = HotelHelper.getDateFromString(checkoutDateString);
    return HotelHelper.dateDiffInDays(checkin, checkout);
  }

  static dateDiffInDays(a, b) {
    const msPerDay = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / msPerDay);
  }

  static getDateFromString(dateString: string) {
    const dateArray = dateString.split('/');
    return new Date(parseInt(dateArray[2], 10), parseInt(dateArray[1], 10) - 1, parseInt(dateArray[0], 10));
  }

  static getHotelSlug(hotelName: string) {
    hotelName = hotelName.replace(/[^\w\s\-]/gi, '');
    return Helper.slugify(hotelName);
  }

  static supportsOnlineCancellation(room: any) {
    if (!room.refundable) {
      return false;
    }

    const cancellationPolicy = room.cancellation_policy;
    if (cancellationPolicy) {
      const date = moment(cancellationPolicy.charge_from);
      if (date.isValid() && date.isAfter(undefined, 'day')) {
        return true;
      }
    }

    return false;
  }

  static getCancellationPolicyText(room: any) {
    if (!this.supportsOnlineCancellation(room)) {
      return 'This is a non refundable booking and does not support cancellation.';
    }

    const cancellationPolicy = room.cancellation_policy;
    const formattedDate = moment(cancellationPolicy.charge_from).format('llll').toString();
    const defaultText = `Free cancellation before ${formattedDate}.`;

    if (cancellationPolicy.amount_type === 'value' && cancellationPolicy.flat_fee) {
      let feeText = `₹${cancellationPolicy.flat_fee}`;

      if (cancellationPolicy.flat_fee >= room.total_room_price) {
        feeText = '100% (booking rate)';
      }

      return `${defaultText} Cancellation fee of ${feeText} will be charged from ${formattedDate}.`;
    }

    if (cancellationPolicy.amount_type === 'percent') {
      return `${defaultText} Cancellation fee of ${cancellationPolicy.percent}% (booking rate) will be charged from ${formattedDate}.`;
    }

    if (cancellationPolicy.amount_type === 'nights') {
      return `${defaultText} Cancellation fee of ${cancellationPolicy.nights} night(s) rate will be charged from ${formattedDate}.`;
    }

    return `${defaultText} Cancellation fee information not available.`;
  }

  static generatePaxInfo(searchData: HotelSearchData) {
    const data = _.cloneDeep(searchData);
    const maxAllowedRooms = HotelConstant.MAX_ROOMS_ALLOWED;
    const adultsPerRoom = HotelConstant.ADULTS_PER_ROOM;
    const childrenPerRoom = HotelConstant.CHILDREN_PER_ROOM;

    let rooms = Number(data.rooms);
    let adults = Number(data.adults);
    let children = _.cloneDeep(data.children);

    const paxInfo = [];

    rooms = Math.min(rooms, maxAllowedRooms);
    adults = Math.min(adults, rooms * adultsPerRoom);

    if (children.length > (rooms * childrenPerRoom)) {
      children = children.slice(0, rooms * childrenPerRoom);
    }

    for (let i = 0; i < rooms; i++) {
      paxInfo[i] = {
        adults: 1,
      };

      if (children.length > 0) {
        if (!paxInfo[i].hasOwnProperty('children_ages')) {
          paxInfo[i]['children_ages'] = [];
        }
        paxInfo[i]['children_ages'].push(+children.shift());
      }
    }

    if (adults > rooms) {
      let remainingAdults = adults - rooms;

      paxInfo.forEach((item, index) => {
        if (remainingAdults > 0) {
          paxInfo[index].adults++;
          remainingAdults--;
        }
      });
    }

    if (children.length > 0) {
      paxInfo.forEach((item, index) => {
        if (children.length > 0) {
          paxInfo[index]['children_ages'].push(+children.shift());
        }
      });
    }

    return paxInfo;
  }

  static applyFilters(filters: object, originalHotels: Array<any>, businessBooking = false, dualRates = false): Array<any> {
    let hotels = _.cloneDeep(originalHotels);

    if (_.isEmpty(filters)) {
      return hotels;
    }

    // Search filter
    if ('search' in filters) {
      const searchText = filters['search'];
      const fuse = new Fuse(hotels, this.searchOptions);

      hotels = fuse.search(searchText);
    }

    // Sort filter
    if ('sort' in filters) {
      const sortData = HotelConstant.FILTERS.SORT_ORDER[filters['sort']];

      if (sortData) {
        const sortField = businessBooking
          ? (
            dualRates
              ? [sortData.field.replace('normal.', 'corporate.'), sortData.field]
              : sortData.field.replace('normal.', 'corporate.')
          )
          : sortData.field;

        const sortOrder = dualRates
          ? [sortData.order, sortData.order]
          : sortData.order;

        hotels = _.orderBy(hotels, sortField, sortOrder);
      }
    }

    // Hotel star category filter
    if ('startCategory' in filters) {
      const categories = filters['startCategory'];

      hotels = _.filter(hotels, function (item) {
        if (!_.has(item, 'hotel.data.star_rating')) {
          return false;
        }

        const category = +item.hotel.data.star_rating;

        return _.includes(categories, category) || (categories.indexOf(5) > -1 && category > 5);
      });
    }

    // Price range filter
    if ('priceRange' in filters) {
      const priceRange = filters['priceRange'];

      hotels = _.filter(hotels, function (item) {
        const hasNormalRate = _.has(item, 'normal.low_rate_room.data.per_night_price');
        const hasCorporateRate = _.has(item, 'corporate.low_rate_room.data.per_night_price');

        if (businessBooking && !dualRates) {
          return hasCorporateRate && _.inRange(+item.corporate.low_rate_room.data.per_night_price, priceRange.min, priceRange.max + 1);
        }

        if (businessBooking && dualRates) {
          return (hasCorporateRate && _.inRange(+item.corporate.low_rate_room.data.per_night_price, priceRange.min, priceRange.max + 1))
            || (hasNormalRate && _.inRange(+item.normal.low_rate_room.data.per_night_price, priceRange.min, priceRange.max + 1));
        }

        return hasNormalRate && _.inRange(+item.normal.low_rate_room.data.per_night_price, priceRange.min, priceRange.max + 1);
      });
    }

    return hotels;
  }

  static getHotelParams(searchData: HotelSearchData, noCity = false, noHotel = false) {
    const keysToRemove = [];

    if (noCity) {
      keysToRemove.push('cityId');
    }

    if (noHotel) {
      keysToRemove.push('hotelId');
    }

    if (!searchData.businessBooking) {
      keysToRemove.push('businessBooking');
    }

    if (!searchData.travelRequest) {
      keysToRemove.push('travelRequest');
    }

    if (!searchData.useException) {
      keysToRemove.push('useException');
    }

    if (!searchData.hotelType) {
      keysToRemove.push('hotelType');
    }

    if (searchData.children.length === 0) {
      keysToRemove.push('children');
    }

    return _.omit(searchData, keysToRemove);
  }

  static getHotelBookingParams(searchData: HotelSearchData, roomCode: string | number) {
    const keysToRemove = ['cityId', 'hotelId', 'searchText'];

    if (!searchData.businessBooking) {
      keysToRemove.push('businessBooking');
    }

    if (!searchData.travelRequest) {
      keysToRemove.push('travelRequest');
    }

    if (!searchData.useException) {
      keysToRemove.push('useException');
    }

    if (!searchData.hotelType) {
      keysToRemove.push('hotelType');
    }

    if (searchData.children.length === 0) {
      keysToRemove.push('children');
    }

    const cleanedData = _.omit(searchData, keysToRemove);
    cleanedData['room'] = roomCode;

    return cleanedData;
  }

  static isValidSearchData(searchData: HotelSearchData, sameDayCheckinLimit = 10) {

    // If the hotel search uses a valid travel request then we don't need to validate the other fields
    if (searchData.businessBooking && !!searchData.travelRequest && Helper.isValidNumber(searchData.travelRequest, 1, 9999999999)) {
      return true;
    }

    if (!searchData.checkin
      || !moment(searchData.checkin).isValid()
      || !moment(searchData.checkin).isSameOrAfter(moment().add(moment().hour() >= sameDayCheckinLimit ? 1 : 0, 'd'), 'd')) {
      return false;
    }

    if (!searchData.checkout
      || !moment(searchData.checkout).isValid()
      || !moment(searchData.checkout).isAfter(searchData.checkin, 'd')) {
      return false;
    }

    if (!Helper.isValidNumber(searchData.rooms, 1, HotelConstant.MAX_ROOMS_ALLOWED)
      || !Helper.isValidNumber(searchData.adults, 1, searchData.rooms * HotelConstant.ADULTS_PER_ROOM)) {
      return false;
    }

    if (searchData.children.length > searchData.rooms * HotelConstant.CHILDREN_PER_ROOM) {
      return false;
    }

    return true;
  }
}
