# Order Management System

This project is a full-stack order management system that allows users to create, view, edit, and delete orders. It features filtering by order status and persists filter and form state in the URL for a better user experience.

## Features

*   Create new orders
*   Edit existing orders
*   Delete orders
*   View a list of all orders
*   Filter orders by their status
*   Persistent state across page reloads using URL query parameters for an improved user experience.

## Tech Stack

### Backend

*   **Framework:** Express.js
*   **ORM:** Drizzle ORM
*   **Database:** PostgreSQL
*   **Validation:** Zod

### Frontend

*   **Framework:** React (Vite)
*   **UI Components:** shadcn/ui
*   **Styling:** Tailwind CSS
*   **Data Fetching & State Management:** TanStack Query
*   **Forms:** React Hook Form with Zod for validation
*   **URL State Management:** `nuqs`

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v20 or higher recommended)
*   [pnpm](https://pnpm.io/installation)
*   [Docker](https://www.docker.com/get-started)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd woitasen-challenge
    ```

2.  **Build the shared types package:**
    The frontend and backend depend on the compiled output of the shared types workspace. Make sure it is built before installing the app dependencies.
    ```sh
    pnpm --filter @repo/types build
    ```

3.  **Rename the environment files:**
    Rename each `.env.example` file to `.env` so the applications load their environment variables correctly.
    ```sh
    mv apps/backend/.env.example apps/backend/.env
    mv apps/frontend/.env.example apps/frontend/.env
    ```

4.  **Install dependencies:**
    This monorepo uses pnpm for package management. Install all dependencies from the root directory after the types have been built.
    ```sh
    pnpm install
    ```

5.  **Start the database:**
    The project uses a PostgreSQL database running in a Docker container. Use `docker-compose` to start it.
    ```sh
    docker compose up -d
    ```

6.  **Run the development servers:**
    This command will start both the backend and frontend applications in development mode.
    ```sh
    pnpm dev
    ```
    *   The backend will be available at `http://localhost:3000`.
    *   The frontend will be available at `http://localhost:5173` (or another port if 5173 is busy).

## Available Scripts

In the project directory, you can run:

*   `pnpm dev`: Runs both the frontend and backend apps in development mode.
*   `pnpm build`: Builds both apps for production.
*   `pnpm start`: Starts the production-ready backend server and previews the frontend build.

---

# Sistema de Gestión de Pedidos

Este proyecto es un sistema **full-stack** para la gestión de pedidos que permite a los usuarios **crear, ver, editar y eliminar pedidos**. Incluye **filtros por estado del pedido** y mantiene el estado de los filtros y formularios en la **URL** para una mejor experiencia de usuario.

## Funcionalidades

* Crear nuevos pedidos
* Editar pedidos existentes
* Eliminar pedidos
* Ver una lista de todos los pedidos
* Filtrar pedidos por su estado
* Estado persistente entre recargas de página mediante **parámetros de consulta en la URL**, mejorando la experiencia del usuario

## Tecnologías Utilizadas

### Backend

* **Framework:** Express.js
* **ORM:** Drizzle ORM
* **Base de datos:** PostgreSQL
* **Validación:** Zod

### Frontend

* **Framework:** React (Vite)
* **Componentes UI:** shadcn/ui
* **Estilos:** Tailwind CSS
* **Gestión de datos y estado:** TanStack Query
* **Formularios:** React Hook Form con Zod para validación
* **Gestión del estado en la URL:** `nuqs`

## Cómo Empezar

Sigue estas instrucciones para obtener una copia del proyecto y ejecutarlo localmente para desarrollo y pruebas.

### Requisitos Previos

* [Node.js](https://nodejs.org/) (v20 o superior recomendado)
* [pnpm](https://pnpm.io/installation)
* [Docker](https://www.docker.com/get-started)

### Instalación

1. **Clonar el repositorio:**

   ```sh
   git clone <repository-url>
   cd woitasen-challenge
   ```

2. **Compilar el paquete de tipos compartidos:**
   El frontend y el backend dependen de la salida compilada del workspace de tipos. Asegúrate de compilarlo antes de instalar las dependencias de las aplicaciones.

   ```sh
   pnpm --filter @repo/types build
   ```

3. **Renombrar los archivos de entorno:**
   Cambia el nombre de cada archivo `.env.example` a `.env` para que las aplicaciones carguen correctamente sus variables de entorno.

   ```sh
   mv apps/backend/.env.example apps/backend/.env
   mv apps/frontend/.env.example apps/frontend/.env
   ```

4. **Instalar dependencias:**
   Este monorepo usa **pnpm** como gestor de paquetes. Instala todas las dependencias desde el directorio raíz una vez compilados los tipos.

   ```sh
   pnpm install
   ```

5. **Iniciar la base de datos:**
   El proyecto usa una base de datos **PostgreSQL** ejecutada en un contenedor **Docker**. Usa `docker-compose` para iniciarla.

   ```sh
   docker compose up -d
   ```

6. **Ejecutar los servidores de desarrollo:**
   Este comando iniciará tanto el **backend** como el **frontend** en modo desarrollo.

   ```sh
   pnpm dev
   ```

   * El backend estará disponible en `http://localhost:3000`
   * El frontend estará disponible en `http://localhost:5173` (o en otro puerto si el 5173 está ocupado)

## Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

* `pnpm dev`: Ejecuta el frontend y el backend en modo desarrollo.
* `pnpm build`: Compila ambas aplicaciones para producción.
* `pnpm start`: Inicia el servidor backend en modo producción y muestra una vista previa del build del frontend.
