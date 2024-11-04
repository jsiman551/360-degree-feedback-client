# Employee Performance Management App

Este proyecto es una aplicación de gestión de evaluaciones de rendimiento de empleados. Permite a los administradores y managers gestionar empleados, realizar evaluaciones y generar reportes de desempeño. Los empleados pueden visualizar sus evaluaciones y ver un reporte de su rendimiento.

## Características

- **Gestión de Usuarios**: Permite a los administradores y managers gestionar empleados y sus evaluaciones.
- **Evaluaciones**: Los empleados pueden ser evaluados por sus supervisores. Las evaluaciones incluyen un puntaje, comentarios y feedback.
- **Reportes de Rendimiento**: Se generan reportes de rendimiento para cada empleado, mostrando sus evaluaciones y un puntaje promedio.
- **Sistema de Roles**: Acceso controlado basado en roles (Admin, Manager y Employee).
- **Autenticación y Autorización**: Validación de autenticación y permisos en cada vista.

## Requisitos Previos

- **Node.js** (>= 14.x)
- **npm** o **yarn**
- **Backend API** con los endpoints documentados en el repositorio [Endpoints](https://github.com/jsiman551/360-degree-feedback-api).

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu_usuario/360-degree-feedback-client.git
   cd 360-degree-feedback-client
   ```

2. Instala las dependencias:
```bash
npm install
```
3. Ejecuta el proyecto:
```bash
npm run start
```

## Uso de Roles y Autenticación
1. Admin: Acceso completo a todas las funcionalidades, incluyendo la gestión de todos los roles y acceso exclusivo al registro de empleados.

2. Manager: Puede ver y agregar evaluaciones, agregar feedback.

3. Employee: Solo puede ver sus propias evaluaciones y reportes, y agregar feedback.

## Autenticación
1. RequireAuth: Un componente de protección de rutas que verifica si el usuario está autenticado y si el token está vigente. Si el token ha expirado o el usuario no tiene el rol adecuado, redirige al usuario a la página de inicio de sesión.

## Mejoras Futuras
1. Notificaciones de Feedback: Implementar un sistema de notificaciones para informar a los empleados cuando reciban nuevo feedback.

2. Exportación de Reportes: Permitir que los reportes puedan exportarse en formatos PDF o Excel.

3. Historial de Evaluaciones: Implementar una página que muestre el historial de evaluaciones de cada empleado, con filtros por fecha y puntaje.

4. Mejorar la Interfaz de Usuario: Refinar los estilos de los componentes y mejorar la UX en dispositivos móviles.

## Descripción de las Carpetas Principales
- **`src/api`**: Contiene funciones para realizar peticiones HTTP al backend, centralizando la lógica de las llamadas API y facilitando su reutilización en los componentes.
  
- **`src/components`**: Incluye componentes React reutilizables que se usan en distintas partes de la aplicación, como botones, formularios, encabezados, y otros componentes de UI.

- **`src/consts`**: Define constantes globales utilizadas a lo largo del proyecto, como rutas de API o mensajes predeterminados.

- **`src/hooks`**: Contiene hooks personalizados que facilitan la interacción con la store de Redux y otros hooks React personalizados específicos de la aplicación.

- **`src/middlewares`**: Middlewares que gestionan tareas como la autenticación.

- **`src/pages`**: Páginas principales como Dashboard, Employees, etc.

- **`src/redux`**: Configuración de Redux, incluyendo los slices, thunks y la store. Organiza el estado global de la aplicación y centraliza la lógica para modificarlo.

- **`src/types`**: Define tipos y interfaces TypeScript para garantizar la consistencia de los datos en toda la aplicación.

- **`src/utils`**: Funciones auxiliares y utilidades que son independientes de la UI y pueden reutilizarse en diferentes contextos.

- **`src/App.tsx`**: Componente raíz de la aplicación que configura las rutas y envuelve la aplicación con los proveedores necesarios.

- **`src/index.css`**: Archivo CSS que contiene estilos globales para toda la aplicación.

- **`src/main.tsx`**: Punto de entrada de la aplicación donde se monta el componente raíz `App` en el DOM.

## tests
```bash
npm run test
```