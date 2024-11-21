export const SavedPaymentTypes = [
  { id: 1, title: 'Visa ending in 1234' },
  { id: 2, title: 'Visa ending in 1234' },
  { id: 3, title: 'Visa ending in 1234' },
  { id: 4, title: 'Visa ending in 1234' }
];

export const OthersPaymentTypes = [
  { id: 5, title: 'APPLE PAY' }
];

export const CHECKOUT_TYPES = {
  BOOK_MEMBERSHIP: 'BOOK_MEMBERSHIP',
  RESERVE_CONFERENCE_ROOM: 'RESERVE_CONFERENCE_ROOM',
  OPEN_WORK: 'OPEN_WORK'
};

export const TITLE = {
  [CHECKOUT_TYPES.BOOK_MEMBERSHIP]: 'MEMBERSHIP',
  [CHECKOUT_TYPES.RESERVE_CONFERENCE_ROOM]: 'DAY PASS',
  [CHECKOUT_TYPES.OPEN_WORK]: 'DAY PASS'
};

export const SUB_TITLE = {
  [CHECKOUT_TYPES.BOOK_MEMBERSHIP]: 'DEDICATED DESK',
  [CHECKOUT_TYPES.RESERVE_CONFERENCE_ROOM]: 'OPEN COWORK',
  [CHECKOUT_TYPES.OPEN_WORK]: 'OPEN COWORK'
};
