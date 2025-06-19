# **_fn_** Function Prefix Convention

This folder contains all utility functions used across the backend.

To keep the structure flat and readable, each file uses a 3- or 4-letter prefix to indicate its purpose:

| Prefix | Meaning                    | Notes                           |
| ------ | -------------------------- | ------------------------------- |
| `log`  | console log                | e.g. `_log-shutdown-message.ts` |
| `gen`  | generate                   | e.g. `_gen-staggered-ttl.ts`    |
| `vald` | validate                   | e.g. `_vald-token.ts`           |
| `vrfy` | verify                     | e.g. `_vrfy-signature.ts`       |
| `hndl` | handle                     | e.g. `_hndl-shutdown.ts`        |
| `rslv` | resolve                    | e.g. `_rslv-user-id.ts`         |
| `rqir` | require/check precondition | e.g. `_rqir-user-id.ts`         |
| `jsnp` | JSON parse/extract         | e.g. `_jsnp-id-from-v4-sub.ts`  |
| `conv` | convert                    | e.g. `_convWebSafeBtoA`         |
