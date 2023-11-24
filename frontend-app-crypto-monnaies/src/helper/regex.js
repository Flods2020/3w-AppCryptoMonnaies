export const USER_REGEX = /^[a-zA-Z0-9_]{3,23}$/;
export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,24}$/;
export const MAIL_REGEX = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
