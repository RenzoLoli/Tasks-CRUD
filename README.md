# Tasks-CRUD

<!--toc:start-->

- [Tasks-CRUD](#tasks-crud)
  - [Autor](#autor)
  - [Descripción](#descripción)
  - [Información Tecnica](#información-tecnica)
    - [Tecnologías](#tecnologías)
    - [Arquitectura y Estrategias](#arquitectura-y-estrategias)
      - [Arquitectura de capas](#arquitectura-de-capas)
      - [Patron CQRS](#patron-cqrs)
      - [Patron Repository](#patron-repository)
      - [RESTful API](#restful-api)
  - [Scope Local](#scope-local)
    - [Requerimientos Local](#requerimientos-local)
    - [Instalación Local](#instalación-local)
    - [Ejecución de desarrollo](#ejecución-de-desarrollo)
    - [Ejecución de producción](#ejecución-de-producción)
  - [Scope Docker](#scope-docker)
    - [Requerimientos Docker](#requerimientos-docker)
    - [Ejecución Docker](#ejecución-docker)
  - [Rutas de acceso](#rutas-de-acceso)
    - [Rutas](#rutas)
  - [Recursos](#recursos)
    - [TaskStatus](#taskstatus)
    - [TimeFormat](#timeformat)
    - [TaskResource](#taskresource)
    - [CreateTaskResource](#createtaskresource)
    - [UpdateTaskResource](#updatetaskresource)
    - [MessageResource](#messageresource)
    - [ErrorResource](#errorresource)
    - [GetAllTasks](#getalltasks)
  - [Ejemplos](#ejemplos)
    - [Crear una tarea con fecha de vencimiento](#crear-una-tarea-con-fecha-de-vencimiento)
    - [Crear una tarea sin fecha de vencimiento](#crear-una-tarea-sin-fecha-de-vencimiento)
    - [Actualizar tarea por estado](#actualizar-tarea-por-estado)
    - [Actualizar tarea por titulo](#actualizar-tarea-por-titulo)
    - [Actualizar tarea por titulo y descripcion](#actualizar-tarea-por-titulo-y-descripcion)
    - [Actualizar tarea por fecha de vencimiento](#actualizar-tarea-por-fecha-de-vencimiento)
    - [Borrar una tarea](#borrar-una-tarea)
    - [Enlistar todas las tareas](#enlistar-todas-las-tareas)
    - [Enlistar las tareas con filtro de titulo](#enlistar-las-tareas-con-filtro-de-titulo)
    - [Enlistar las tareas con filtro de estado](#enlistar-las-tareas-con-filtro-de-estado)
    - [Enlistar las tareas con filtros de titulo y estado](#enlistar-las-tareas-con-filtros-de-titulo-y-estado)
    - [Obtener una tarea por id](#obtener-una-tarea-por-id)
    <!--toc:end-->

## Autor

- [RenzoLoli](https://github.com/RenzoLoli)

## Descripción

En este proyecto se implementa un sistema de gestión de tareas utilizando Node.js, Express.js y MongoDB.

## Información Tecnica

### Tecnologías

- [Node.js](https://nodejs.org/es/)
  - Entorno de ejecución para JavaScript
  - Tecnologia ampliamente utilizada en el mundo del desarrollo web
  - (Requisito del sistema)
- [Express.js](https://expressjs.com/)
  - Framework de Node.js para crear aplicaciones web
  - Contiene una colección de módulos y funciones que facilitan el desarrollo de aplicaciones web
  - (Requisito del sistema)
- [Awilix](https://github.com/jeffijoe/awilix)
  - Contenedor de dependencias
  - Injection de dependencias
  - Facilita la configuración e integración de dependencias
  - Se uso para manejar la conexion a la base de datos, los servicios y los repositorios
- [DotEnv](https://github.com/motdotla/dotenv)
  - Se utiliza para cargar variables de entorno desde un archivo .env
  - Se utilizo para el [Scope Local](#scope-local)
- [Mongoose](https://mongoosejs.com/)
  - Facilita la creación de modelos y operaciones CRUD
- [Winston](https://github.com/winstonjs/winston)
  - Se especializa en el manejo de logs tanto en consola como en streams externos
  - Se eligió para facilitar la configuracion del sistema de logs
- [MongoDB](https://www.mongodb.com/)
  - (Requisito del sistema)
  - Base de datos NoSQL
  - Mayormente elegido por tener una gran velocidad de lectura y escritura por sobre SQL
- [Docker](https://www.docker.com/)
  - Plataforma de contenedores de aplicaciones
  - Se eligió para facilitar la ejecuión en distintos entornos
- [Docker Compose](https://docs.docker.com/compose/)
  - Herramienta para definir y ejecutar aplicaciones de Docker
  - Se eligió para poder unir los contenedores de mongodb y el contenedor de node en un solo sistema

### Arquitectura y Estrategias

#### Arquitectura de capas

- Se eligió una arquitectura que se acomode a un sistema pequeño pero escalable
- Se hizo una estructura en base a esta arquitectura intentando generar
  carpetas que encierren las capas de Controlador, Modelo, Servicio y Repositorio

#### Patron CQRS

- Se eligió este patrón para poder manejar las operaciones de manera eficiente

#### Patron Repository

- Se eligió este patrón para manejar la persistencia de datos con una capa más de abstracción

#### RESTful API

- Nace de las políticas REST que a su vez se basa en el protocolo HTTP
- Esta implementación ayuda a encapsular y manipular la lógica de entrada y salida como recursos,
  tipos de peticiones y respuestas

## Scope Local

### Requerimientos Local

- [Node.js](https://nodejs.org/es/)
  - Versión 18.20.1
- [NPM](https://www.npmjs.com/)
  - Versión 9.2.0
- [MongoDB](https://www.mongodb.com/docs/manual/installation/)
  - Puede ser instalado en una máquina local o en la nube
- **Environment Variables:** (.env)
  - API_PORT: Number
  - API_HOST: Address
  - API_MONGODB_URI: Uri

### Instalación Local

```bash
git clone https://github.com/RenzoLoli/Tasks-CRUD.git
cd Tasks-CRUD
npm install
```

### Ejecución de desarrollo

```bash
npm run dev
```

### Ejecución de producción

```bash
npm start
```

## Scope Docker

### Requerimientos Docker

- [Docker](https://docs.docker.com/engine/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- **Environment Variables:** (Actualizar docker-compose.yml) -> NO NOCESARIO
  - API_PORT: Number
  - API_HOST: Address
  - API_MONGODB_URI: Uri

### Ejecución Docker

```bash
git clone https://github.com/RenzoLoli/Tasks-CRUD.git
cd Tasks-CRUD
docker-compose up
```

## Rutas de acceso

#### Rutas

- **GetAllTasks:** GET /tasks/
  - **Query:** [GetAllTasks](#getalltasks)
  - **Response:** [Array\<TaskResource\>](#taskresource) 200
  - **Errors:** [ErrorResource](#errorresource) 404, 500
- **GetTaskById:** GET /tasks/:id
  - **Response:** [TaskResource](#taskresource) 200
  - **Errors:** [ErrorResource](#errorresource) 400, 404, 500
- **CreateTask:** POST /tasks/
  - **Body:** [CreateTaskResource](#createtaskresource)
  - **Response:** [TaskResource](#taskresource) 201
  - **Errors:** [ErrorResource](#errorresource) 400, 500
- **UpdateTask:** PUT /tasks/:id
  - **Body:** [UpdateTaskResource](#updatetaskresource)
  - **Response:** [TaskResource](#taskresource) 200
  - **Errors:** [ErrorResource](#errorresource) 400, 500
- **DeleteTask:** DELETE /tasks/:id
  - **Response:** [MessageResource](#messageresource) 200
  - **Errors:** [ErrorResource](#errorresource) 500

## Recursos

#### TaskStatus

```typescript
type TaskStatus = "pendiente" | "en progreso" | "completada";
```

#### TimeFormat

```typescript
type TimeFormat = "yyyy/MM/dd";
```

#### TaskResource

```json
{
  "id": "[Identificador unico, string]",
  "titulo": "[cadena entre 2 y 50 caracteres, string]",
  "descripcion": "[cadena entre 2 y 400 caracteres, string]",
  "estado": "[estado de la tarea, TaskStatus]",
  "fechaCreacion": "[fecha de creacion de la tarea, TimeFormat]",
  "fechaVencimiento": "[fecha de vencimiento de la tarea, TimeFormat, opcional]"
}
```

#### CreateTaskResource

```json
{
  "titulo": "[cadena entre 2 y 50 caracteres, string]",
  "descripcion": "[cadena entre 2 y 400 caracteres, string]",
  "fechaVencimiento": "[fecha de vencimiento de la tarea, TimeFormat, opcional]"
}
```

#### UpdateTaskResource

```json
{
  "titulo": "[cadena entre 2 y 50 caracteres, string, opcional]",
  "descripcion": "[cadena entre 2 y 400 caracteres, string, opcional]",
  "fechaVencimiento": "[fecha de vencimiento de la tarea, TimeFormat, opcional]"
}
```

#### MessageResource

```json
{
  "message": "[mensaje de respuesta, string]"
}
```

#### ErrorResource

```json
{
  "message": "[mensaje de respuesta, string]"
}
```

#### GetAllTasks

```json
{
  "titulo": "[titulo de la tarea, string, opcional]",
  "estado": "[estado de la tarea, TaskStatus, opcional]"
}
```

## Ejemplos

### Crear una tarea con fecha de vencimiento

```bash
curl -X POST -H "Content-Type: application/json" -d '{"titulo":"Estudiar", "descripcion":"Estudiar para el examen de matematicas", "fechaVencimiento":"2024/12/06"}' http://127.0.0.1:8000/tasks
```

```json
{
  "id": "...",
  "titulo": "Estudiar",
  "descripcion": "Estudiar para el examen de matematicas",
  "estado": "pendiente",
  "fechaCreacion": "31/10/2024",
  "fechaVencimiento": "6/12/2024"
}
```

### Crear una tarea sin fecha de vencimiento

```bash
curl -X POST -H "Content-Type: application/json" -d '{"titulo":"Investigar sobre Angular", "descripcion":"Aumentar mis conocimientos sobre Frontend"}' http://127.0.0.1:8000/tasks
```

```json
{
  "id": "...",
  "titulo": "Investigar sobre Angular",
  "descripcion": "Aumentar mis conocimientos sobre Frontend",
  "estado": "pendiente",
  "fechaCreacion": "31/10/2024"
}
```

### Actualizar tarea por estado

- Inserte el id de la tarea en el path de la URL
- Este endpoint devuelve el recurso antes de actualizarse

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"estado":"completada"}' http://127.0.0.1:8000/tasks/{id}
```

```json
{
  "id": "6723a372b65162492c46addf",
  "titulo": "Investigar sobre Angular",
  "descripcion": "Aumentar mis conocimientos sobre Frontend",
  "estado": "pendiente",
  "fechaCreacion": "31/10/2024"
}
```

### Actualizar tarea por titulo

- Inserte el id de la tarea en el path de la URL

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"titulo":"Investigar sobre Vue"}' http://127.0.0.1:8000/tasks/{id}
```

```json
{
  "id": "6723a372b65162492c46addf",
  "titulo": "Investigar sobre Angular",
  "descripcion": "Aumentar mis conocimientos sobre Frontend",
  "estado": "completada",
  "fechaCreacion": "31/10/2024"
}
```

### Actualizar tarea por titulo y descripcion

- Inserte el id de la tarea en el path de la URL

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"titulo":"Investigar sobre Actix", "descripcion":"Aumentar mis conocimientos sobre Backend"}' http://127.0.0.1:8000/tasks/{id}
```

```json
{
  "id": "6723a372b65162492c46addf",
  "titulo": "Investigar sobre Vue",
  "descripcion": "Aumentar mis conocimientos sobre Frontend",
  "estado": "completada",
  "fechaCreacion": "31/10/2024"
}
```

### Actualizar tarea por fecha de vencimiento

- Inserte el id de la tarea en el path de la URL

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"fechaVencimiento":"2024/12/06"}' http://127.0.0.1:8000/tasks/{id}
```

```json
{
  "id": "6723a372b65162492c46addf",
  "titulo": "Investigar sobre Actix",
  "descripcion": "Aumentar mis conocimientos sobre Backend",
  "estado": "completada",
  "fechaCreacion": "31/10/2024"
}
```

### Enlistar todas las tareas

```bash
curl -X GET http://127.0.0.1:8000/tasks
```

```json
[
  {
    "id": "...",
    "titulo": "Estudiar",
    "descripcion": "Estudiar para el examen de matematicas",
    "estado": "pendiente",
    "fechaCreacion": "31/10/2024",
    "fechaVencimiento": "6/12/2024"
  },
  {
    "id": "...",
    "titulo": "Investigar sobre Actix",
    "descripcion": "Aumentar mis conocimientos sobre Backend",
    "estado": "completada",
    "fechaCreacion": "31/10/2024",
    "fechaVencimiento": "6/12/2024"
  }
]
```

### Enlistar las tareas con filtro de titulo

```bash
curl -X GET http://127.0.0.1:8000/tasks?titulo=Estudiar
```

```json
[
  {
    "id": "6723a305b65162492c46addd",
    "titulo": "Estudiar",
    "descripcion": "Estudiar para el examen de matematicas",
    "estado": "pendiente",
    "fechaCreacion": "31/10/2024",
    "fechaVencimiento": "6/12/2024"
  }
]
```

### Enlistar las tareas con filtro de estado

```bash
curl -X GET http://127.0.0.1:8000/tasks?estado=completada
```

```json
[
  {
    "id": "6723a372b65162492c46addf",
    "titulo": "Investigar sobre Actix",
    "descripcion": "Aumentar mis conocimientos sobre Backend",
    "estado": "completada",
    "fechaCreacion": "31/10/2024",
    "fechaVencimiento": "6/12/2024"
  }
]
```

### Enlistar las tareas con filtros de titulo y estado

```bash
curl -X GET http://127.0.0.1:8000/tasks?titulo=%20sobre%20Actix&estado=completada
```

```json
[
  {
    "id": "6723a372b65162492c46addf",
    "titulo": "Investigar sobre Actix",
    "descripcion": "Aumentar mis conocimientos sobre Backend",
    "estado": "completada",
    "fechaCreacion": "31/10/2024",
    "fechaVencimiento": "6/12/2024"
  }
]
```

### Obtener una tarea por id

- Inserte el id de la tarea en el path de la URL

```bash
curl -X GET http://127.0.0.1:8000/tasks/{id}
```

```json
{
  "id": "6723a372b65162492c46addf",
  "titulo": "Investigar sobre Actix",
  "descripcion": "Aumentar mis conocimientos sobre Backend",
  "estado": "completada",
  "fechaCreacion": "31/10/2024",
  "fechaVencimiento": "6/12/2024"
}
```

### Borrar una tarea

- Inserte el id de la tarea en el path de la URL

```bash
curl -X DELETE http://127.0.0.1:8000/tasks/{id}
```

```json
``
{"message":"Tarea eliminada"}
```
