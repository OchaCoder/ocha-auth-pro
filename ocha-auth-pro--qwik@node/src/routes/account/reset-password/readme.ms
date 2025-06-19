# Reset password flow overview

## 1. Reset Password Modal -> Backend Step 1
- URL changes to `/account/reset-password` cosmetically for bookmark.
- Action -> reset password step 1

## 2. Backend Step 1
- Check if Email exists
- Create `rpt` - reset password token
- `rptV4` - Paseto token that contains `rpt`, `id`, `email` as its sub.
- `rptV4Ws` - Web safe version of encoded `rptV4`.
- Sets `isUsed` Redis flag 
- Send email link via `Resend`


## 3. Click email link
- User is redirected to `/account/reset-password-process/[rpt]`

## 4. `/account/reset-password-process/[rpt]`
- `onRequest:` receives the `rptV4Ws` + prefix and passes `rptV4Ws` down to `routeLoader$`
- `routeLoader$` sends `rptV4Ws` to the backend (Backend Step 2 starts)


## 5. Backend Step 2
- Verifies `rptV4Ws`, extracts `rpt`, `id`, `email`
- Checks `isUsed` Redis flag
- Obfuscate `email`
- Reply `obfuscatedEmail` and `rpt`

## 6-1. `/account/reset-password-process/`
- Step 2 was successful
- Continue on to Step 3

## 6-2. `/account/reset-password-process/error/`
- Displays error from Step 2


## 7. Backend Step 3


## 8-1. `/account/reset-password-process/success`
- Step 3 was successful. Password is reset.

## 8-2. `/account/reset-password-process/error/`
- Displays error from Step 3