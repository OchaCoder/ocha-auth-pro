`ocha-auth-pro` project uses a custom access-token (AT) refresh mechanism in Qwik and Fastify that avoids double round trips. It uses a `wretchProtectedResolver` in Qwik, which checks for `at` or `bid` cookies. If `at` is missing but `bid` is present, it sends the request and `bid` to a Fastify proxy route (`/user/regular/action/proxy-refresh-at`) that verifies the session via Redis, issues a new AT, and proxies the request to the original target route. Redis holds the actual refresh token (RT) tied to the `bid`, and the `bid` acts only as a lookup key. All cookies are `SameSite=Strict`, `HttpOnly`, and `Secure`.

### What is this?

**ocha-auth-pro** is an intentionally overbuilt, feature-rich authentication system made with [Qwik](https://qwik.dev) and [Fastify](https://fastify.dev).

This app is designed to showcase how far we can push a modern auth system when we focus on:

- 🧠 **Security best practices**
- ✨ **Speed optimization**
- 🌐 **Countless tiny UX improvements**
- 💀 **Meticulous error handling**
- 📈 **Backend observability & monitoring**
- 🖥️ **Code quality & reusability**
- 💡 ...and an unhealthy obsession with strict type-checking, just to make developer life easier 🥲🔥

### What problems does it solve?

Some problems this app is made to solve — click any to learn more!:

- Cross-Site Request Forgery (CSRF)
- HTTP flooding and Distributed Denial of Service (DDoS) attacks
- Token theft and token forgery attempts
- Clickjacking (UI redressing vulnerabilities)
- Multi-tab login conflicts during token rotation
- Subtle CORS behavior drift across browsers
- "Log out from this browser" vs "Log out from all"
- Inherent design risks of traditional JWT-based auth
- bcrypt overuse and its hidden performance cost
- Email-check brute force
- Redundant double front-back roundtrip on AT expiration
- Direct backend access bypassing frontend logic
- Route visibility leaks in client-side code
- Session continuity after clicking email links (SameSite/Strict-safe)
- Type-safe server contracts across Fastify + Qwik (via TypeBox)
- Code quality & reusability
