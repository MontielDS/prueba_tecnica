# Sistema de Gestión de PQRS

Proyecto desarrollado como solución para la gestión de solicitudes, peticiones, quejas, reclamos y sugerencias (PQRS).

El sistema está compuesto por:

* **Backend:** Django y Django REST Framework.
* **Frontend:** Next.js, React y TypeScript.
* **Base de datos:** SQLite.

## Tecnologías utilizadas

### Backend

* Python 3.13
* Django 6.1
* Django REST Framework 3.18.0
* django-cors-headers 4.9.0
* SQLite

### Frontend

* Node.js 20 o superior
* Next.js 16.3.4
* React 19.2.8
* TypeScript 5

---

# Requisitos previos

Antes de ejecutar el proyecto es necesario tener instalado:

* Python 3.13 o superior.
* Node.js 20 o superior.
* npm.

Puedes verificar las versiones instaladas con los siguientes comandos:

```bash
python --version
node --version
npm --version
```

---

# Instalación y ejecución del Backend

## 1. Ubicarse en la carpeta del proyecto

Desde una terminal, ubicarse en la carpeta principal del proyecto.

```bash
cd prueba_sol_cielo
```

## 2. Crear un entorno virtual

```bash
python -m venv venv
```

## 3. Activar el entorno virtual

### En Windows

```bash
venv\Scripts\activate
```

### En Linux o macOS

```bash
source venv/bin/activate
```

## 4. Instalar las dependencias

Ubicarse en la carpeta del backend:

```bash
cd backend_pqrs
```

Instalar las dependencias:

```bash
pip install -r requirements.txt
```

## 5. Ejecutar las migraciones

Ejecutar las migraciones de la base de datos:

```bash
python manage.py makemigrations
```

Luego:

```bash
python manage.py migrate
```

## 6. Ejecutar el servidor Backend

```bash
python manage.py runserver
```

El backend estará disponible en:

```text
http://127.0.0.1:8000/
```

---

# Instalación y ejecución del Frontend

Abrir otra terminal y ubicarse en la carpeta principal del proyecto.

## 1. Ubicarse en la carpeta del frontend

```bash
cd frontend_pqrs
```

## 2. Instalar las dependencias

```bash
npm install
```

## 3. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:3000/
```

---

# Ejecución completa del proyecto

Para ejecutar correctamente el sistema deben estar activos los dos servicios:

### Terminal 1 - Backend

```bash
cd backend_pqrs
```

Activar el entorno virtual:

```bash
venv\Scripts\activate
```

Ejecutar:

```bash
python manage.py runserver
```

### Terminal 2 - Frontend

```bash
cd frontend_pqrs
```

Ejecutar:

```bash
npm run dev
```

Posteriormente, ingresar desde el navegador a:

```text
http://localhost:3000/
```

---

# Estructura del proyecto

```text
prueba_sol_cielo/
│
├── backend_pqrs/
│   ├── pqrs_app/
│   ├── migrations/
│   ├── manage.py
│   ├── settings.py
│   ├── urls.py
│   └── requirements.txt
│
├── frontend_pqrs/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── package-lock.json
│
├── db.sqlite3
│
└── README.md
```

---

# Funcionalidades principales

El sistema permite:

* Radicar solicitudes PQRS.
* Generar un código para identificar cada solicitud.
* Consultar el estado de una solicitud mediante su código.
* Visualizar las solicitudes registradas desde el panel de administración.
* Consultar el detalle de cada solicitud.

---

# Autor

Proyecto desarrollado por **Santiago Montiel**.
