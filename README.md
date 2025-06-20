# OchaAuthPro 🍵 - Secure, Production-Grade Authentication System

**OchaAuthPro** is a lovingly overbuilt, feature-rich authentication system built with:

- Qwik (frontend) + Fastify (backend)
- PostgreSQL and Redis (self-hosted on a VPS)
- WebSocket-based infrastructure health updates for clients
- Prometheus + Grafana for real-time administrative monitoring
- Paseto V4, Argon2, and secure cookie practices

It’s designed to showcase what happens when you fully commit to:

- Security best practices
- Speed and UX optimization
- Meticulous error handling
- Robust observability & monitoring
- Clean code and type safety
- …and a healthy dose of obsessive craftsmanship 😭🔥

🚀 **Live Demo**: [ocha-auth-pro.ochacoder.com](https://ocha-auth-pro.ochacoder.com)\
🌞 **Grafana Dashboard**: [ocha-auth-pro.ochacoder.com/grafana/](https://ocha-auth-pro.ochacoder.com/grafana/)\
⚡️ **Google Page Speed Result**: [ocha-auth-pro.ochacoder.com/speed-test/](https://ocha-auth-pro.ochacoder.com/speed-test/)\
🫶🏻 **GitHub Repo**: [ocha-auth-pro.ochacoder.com/github/](https://ocha-auth-pro.ochacoder.com/github/)\

---

## ✨ Why OchaAuthPro?

- **Secure & Modern**: Uses [Paseto](https://paseto.io/) tokens (safer than JWT) and [Argon2](https://www.argon2.com/) for password hashing.
- **Server-Side Everything**: No CORS needed! All data is sent server-side for security and simplicity.
- **Real-Time Health Checks**: WebSocket-driven modals inform users of backend or infra outages with friendly transitions.
- **Smooth UX**: Dark mode, animated modals and toast, consistent visual transitions even during direct visits.
- **Type-Safe**: [TypeBox](https://github.com/sinclairzx81/typebox) and [Zod](https://zod.dev/) to ensure robust runtime and compile-time validation.
- **Email-Based Password Reset**: Secure reset links signed with Paseto, hashed and stored in Redis.
- **Self-Hosted Infra**: All services including Redis, Postgres, Prometheus, and Grafana run in Docker on a single VPS.

---

## 🛡️ Core Concepts

1. **Sign-up/Sign-in**
   Users authenticate via email + password. Paseto-based access and refresh tokens are issued.

2. **Password Storage**
   Passwords are hashed using Argon2 and securely stored in PostgreSQL.

3. **Refresh Token Rotation**
   Single-use RTs stored in Redis, scoped to a browser ID, protecting against multi-tab desync and replay attacks.

4. **Access Token Handling**
   Stored in `HttpOnly`, `Secure`, `SameSite=Strict` cookies. 60-second lifespan, automatically refreshed server-side.

5. **Infra Health Monitoring**
   WebSocket pings detect backend/infra status. Friendly modal indicators appear on disruption and recovery.

6. **Grafana Dashboard**
   Real-time admin view of monitor uptime, Redis and PostgreSQL metrics. Hosted on same VPS.

7. **Email Verification**
   On sign-up and email update, users verify via Paseto-signed links.

8. **Frontend Error Handling**
   Toasts for user alerts, server-side redirects for critical/suspicious states.

9. **Backend Error Handling**
   Custom error classes separate user input issues, misuse, logic bugs, and suspicious behavior.

10. **Separation of Concerns**
    Independent deployment folders for frontend and backend. Dockerized and orchestrated via Compose.

---

## 🧠 Tech Stack

| Layer         | Tool                                |
| ------------- | ----------------------------------- |
| Frontend      | Qwik                                |
| Backend       | Fastify                             |
| Database      | PostgreSQL (self-hosted via Docker) |
| Cache         | Redis (self-hosted via Docker)      |
| Token Auth    | Paseto V4                           |
| Hashing       | Argon2                              |
| Email Service | Resend                              |
| Monitoring    | WebSocket + Prometheus + Grafana    |

---

## 🏃‍♂️ Getting Started (Local Setup)

1. **Clone the repo**:

```bash
git clone https://github.com/ochacoder/ocha-auth-pro.git
```

2. **Copy sample env files and set your secrets**:

```bash
cp ocha-auth-pro--fastify@node/.env.sample ocha-auth-pro--fastify@node/.env
cp ocha-auth-pro--qwik@node/.env.local.sample ocha-auth-pro--qwik@node/.env.local
```

3. **Start the full stack with Docker Compose**:

```bash
docker compose -f docker-compose.sample.yml up --build
```

4. **Visit the app locally**:
   [http://localhost:3000](http://localhost:3000)

_⚠️ Don’t commit your `.env` files to Git._

---

## 🚀 Why I Built This

OchaAuthPro was built to embody production-level architecture, with special care for real-world edge cases and user experience.

The goal was to make an authentication system that is:

- **Secure by default**
- **Fully observable and traceable**
- **Smooth and friendly for users**
- **A pleasure to build and read**

From RT rotation edge cases to server-side redirects for suspicious behavior, everything here was handcrafted for clarity and resilience.

---

## 🌱 What’s Next?

- **OchaAuthLight**: A simpler, beginner-friendly variant using Express and Next.js
- **Add OpenAPI docs**: Auto-generated documentation for backend endpoints
- **Rate Limiting**: To protect critical routes from abuse
- **Unit Tests**: For core logic like token issuance and validation

---

## 🫶 Thanks

Built with 🍵 and many late nights.
OchaAuthPro hopes to show that security can be clear, friendly, and elegant.

Thank you for checking it out — feedback is always welcome!
