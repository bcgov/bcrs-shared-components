/** Enum to help map name request type codes. */
export enum NameRequestTypes {
  NEW = 'NEW', // new request
  MVE = 'MVE', // move request
  REH = 'REH', // restore or reinstate request
  AML = 'AML', // amalgamate request
  CHANGE_NAME = 'CHG', // change name request
  CONVERSION = 'CNV', // conversion request
  DBA = 'DBA', // doing business as request
  ASSUMED = 'ASSUMED', // assumed name request // FUTURE: should be AS?
  REN = 'REN', // restore with new name request (renew)
  RESTORATION = 'REST', // restoration request
  RESUBMIT = 'RESUBMIT', // resubmit request
}
