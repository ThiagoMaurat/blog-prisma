# Thiago Portfolio and Blog

Welcome to my personal portfolio, an innovative platform that leverages cutting-edge technologies to create an amazing experience for developers users! 🚀🚀

![Texto Alternativo](https://blog-prisma-gray.vercel.app/Slider/blog-project/blog-dark.png)

## Main Technologies used

- TypeScript - Bringing static typing to JavaScript, increasing productivity, and improving code robustness.
- Next.js - A React framework that makes it easy to build modern web applications, with server-side rendering, simplified routing, and many powerful features.
- shadcn/ui - Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.
- Prisma - A modern Object-Relational Mapping (ORM) for Node.js and TypeScript, simplifying interaction with SQL databases and providing an efficient development experience.
- PlanetScale - A cloud-native distributed database, designed to scale effortlessly and deliver consistent performance for modern applications.
- Next-Auth - Auth.js is a set of open-source packages that are built on Web Standard APIs for authentication in modern applications with any framework on any platform in any JS runtime.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17 or later)
- [Pnpm](https://pnpm.io/pt/) (opcional)
- [MySql](https://www.mysql.com/) (Planet Scale)
- [Docker](https://www.docker.com/) (may be needed for shadowDatabaseUrl)

### Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/seu-username/seu-projeto.git

   ```

2. Copy the .env.example to .env and update the variables.

   ```bash
   cp .env.example .env

   ```

3. Install the dependencies

   ```bash
   pnpm i

   ```

4. May be needed docker-compose image for prisma shadowDatabaseUrl

   ```bash
   docker compose up

   ```

5. Run the migrations

   ```bash
   pnpm prisma migrate dev

   ```

6. Run the migrations

   ```bash
   pnpm prisma migrate dev

   ```

7. Run the seed

   ```bash
   pnpm run seed

   ```
