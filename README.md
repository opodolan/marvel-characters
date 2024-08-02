
# Marvel Characters App

Esta aplicación permite buscar y listar personajes de Marvel, ver detalles de cada personaje y gestionarlos como favoritos.

## Configuración del Proyecto

### Requisitos

- Node.js >= 18
- npm

### Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/opodolan/marvel-characters.git
   cd marvel-characters
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configuración del archivo .env
Para que la aplicación funcione correctamente, necesitas configurar el archivo .env. Este archivo contiene las variables de entorno necesarias para la conexión con la API de Marvel.

Crear el archivo .env: Puedes basarte en el archivo .env.example

env
REACT_APP_PUBLIC_KEY: Tu clave pública de la API de Marvel.
REACT_APP_PRIVATE_KEY: Tu clave privada de la API de Marvel.
REACT_APP_BASE_URL: URL base de la API de Marvel.

Recargar el archivo: Después de hacer cambios en el archivo .env, es posible que necesites reiniciar la aplicación para que los nuevos valores sean aplicados.

### Ejecución

#### Modo Desarrollo

```bash
npm start
```

#### Modo Producción

```bash
npm run build
npm install -g serve
serve -s build
```

### Estructura del Proyecto

- `src/assets`: Archivos estáticos.
- `src/components`: Componentes reutilizables.
- `src/context`: Gestión del estado global.
- `src/pages`: Vistas principales de la aplicación.
- `src/services`: Lógica para interactuar con la API de Marvel.
- `src/styles`: Estilos globales y específicos.
- `src/utils`: Utilidades generales.

### Funcionalidad

- **Vista Principal**: Listado de personajes con búsqueda y gestión de favoritos.
- **Detalle de Personaje**: Información detallada de cada personaje y sus cómics.

### API

Las peticiones se realizan a la API de Marvel: `http://gateway.marvel.com/v1/public`.

### Testing

Los tests se encuentran en la carpeta `__tests__`. Ejecutar los tests con:

```bash
npm test
```

### Despliegue

Puedes desplegar la aplicación en cualquier servicio que soporte aplicaciones React. Asegúrate de configurar las variables de entorno necesarias para la API de Marvel.

### Contribuir

Si deseas contribuir, por favor haz un fork del repositorio y crea una nueva rama para tus características o correcciones de errores. Luego, envía una solicitud de extracción.
            