/** Entity types (aka corp type codes in Colin). */
export enum EntityTypes {
  NR_BC_CORPORATION = 'CR', // NOT IN COLIN - NR ONLY
  BC_CORPORATION = 'BC', // BC Corporation limited company code in Lear
  BC_ULC_COMPANY = 'ULC',
  BENEFIT_COMPANY = 'BEN',
  NR_BENEFIT_COMPANY = 'BC'
}
