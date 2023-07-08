# Fruver APP
Esta aplicación está desarrollada por Luis Danilo Juajinoy Gálvez para el módulo Desarrollo de Software de Última Generación.

## ¿Cómo ejecutar el proyecto?

### Backend
Será necesario ejecutar los siguientes pasos para levantar la aplicación backend

1. Puede optar por las siguientes opciones
    1. MySQL manual
        1. Poner en funcionamiento un motor de base de datos MySQL con las configuraciones:
            * **host**: localhost
            * **puerto**: 3306
            * **usuario**: admin
            * **contraseña**: Admin123
            * **base de datos**: fruverdb
        2. Ejecutar el script de inicialización de la base de datos ubicado en ```/db/scripts/init.sql```.

    2. Utilizar el contenedor de **docker** incluido en este repositorio, el cual pondrá en funcionamiento e inicializará la base de datos necesaria para la ejecución de la aplicación

    ```bash
    # Ejecutado en la raiz del repositorio
    docker-compose up
    ```

2. Con el motor de base de datos anterior puede ejecutar los siguientes comandos en una terminal

```bash
# Ejecutado en la raiz del repositorio
cd backend/
# Si desea usar npm
npm install
npm run dev
# Si desea usar yarn
yarn
yarn dev
```
Una vez ejecutado los comandos deberá ver una pantalla similar a la mostrada a continuación
![Alt text](image.png)
