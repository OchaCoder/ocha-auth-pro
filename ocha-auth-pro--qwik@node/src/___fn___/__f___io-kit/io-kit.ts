import { ioKitSource } from "./internal/io-kit-source"

export const ioKit = {
  PL_DASH_TOP: ioKitSource.bo.user.p.l.dashTop,

  PA_DELETE_ACCOUNT: ioKitSource.bo.user.p.a.deleteAccount,
  PA_SIGN_OUT_FROM_ONE: ioKitSource.bo.user.p.a.signOutFromOne,
  PA_SIGN_OUT_FROM_ALL: ioKitSource.bo.user.p.a.signOutFromAll,
  PA_UPDATE_NAME: ioKitSource.bo.user.p.a.updateName,
  PA_UPDATE_PASSWORD: ioKitSource.bo.user.p.a.updatePassword,

  RA_RESET_PASSWORD_STEP1: ioKitSource.bo.user.r.a.resetPasswordStep1,
  RA_RESET_PASSWORD_STEP2: ioKitSource.bo.user.r.a.resetPasswordStep2,
  RA_RESET_PASSWORD_STEP3: ioKitSource.bo.user.r.a.resetPasswordStep3,
  RA_UPDATE_EMAIL_STEP1: ioKitSource.bo.user.r.a.dashUpdateEmailStep1,
  RA_UPDATE_EMAIL_STEP2: ioKitSource.bo.user.r.a.dashUpdateEmailStep2,
  RA_SIGN_UP_STEP1: ioKitSource.bo.user.r.a.signUpStep1,
  RA_SIGN_UP_STEP2: ioKitSource.bo.user.r.a.signUpStep2,
  RA_SIGN_IN: ioKitSource.bo.user.r.a.signIn,
}

export type IoCode =
  | typeof ioKit.PL_DASH_TOP.code
  | typeof ioKit.PA_DELETE_ACCOUNT
  | typeof ioKit.PA_SIGN_OUT_FROM_ONE
  | typeof ioKit.PA_SIGN_OUT_FROM_ALL
  | typeof ioKit.PA_UPDATE_NAME
  | typeof ioKit.PA_UPDATE_PASSWORD
  | typeof ioKit.RA_RESET_PASSWORD_STEP1
  | typeof ioKit.RA_RESET_PASSWORD_STEP2
  | typeof ioKit.RA_RESET_PASSWORD_STEP3
  | typeof ioKit.RA_UPDATE_EMAIL_STEP1
  | typeof ioKit.RA_UPDATE_EMAIL_STEP2
  | typeof ioKit.RA_SIGN_IN
  | typeof ioKit.RA_SIGN_UP_STEP1
  | typeof ioKit.RA_SIGN_UP_STEP2
