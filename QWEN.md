# Django Asistencias Project - Context for Qwen Code

## Project Overview

This is a Django-based web application for managing employee attendance and schedules. The system tracks employees, their assigned schedules, work locations (branches), and shift types. It's designed to help organizations efficiently manage workforce scheduling and attendance tracking.

### Key Technologies
- **Backend**: Django 5.2.4 (Python)
- **Database**: PostgreSQL
- **Frontend**: HTML templates with CSS/JavaScript
- **Deployment**: Docker with Docker Compose (Nginx + Gunicorn)
- **Dependencies**: 
  - django
  - psycopg[binary] (PostgreSQL adapter)
  - pyyaml (for data fixtures)
  - gunicorn (WSGI server)

## Project Structure

```
django-asistencias/
├── compose.yml              # Docker Compose configuration
├── Dockerfile               # Docker image definition
├── nginx.conf               # Nginx reverse proxy configuration
├── src/                     # Main Django application
│   ├── asistencias/         # Django project settings
│   ├── core/                # Main application with models and business logic
│   ├── templates/           # HTML templates
│   ├── static/              # CSS, JavaScript, and image assets
│   ├── staticfiles/         # Collected static files (generated)
│   ├── media/               # Uploaded media files
│   ├── manage.py            # Django management script
│   ├── requirements.txt     # Python dependencies
│   ├── entrypoint.sh        # Docker entrypoint script
│   ├── assign_users.py      # Script for user management
│   └── initial_data_numerado.yaml  # Initial data fixture
```

## Core Functionality

### Data Models
1. **Empleado** (Employee): Stores employee information including names, codes, and user account linkage
2. **Sucursal** (Branch/Location): Different work locations
3. **TipoTurno** (Shift Type): Different shift patterns (e.g., Monday-Friday, specific day combinations)
4. **Horario** (Schedule): Time-based schedules with entry/exit times
5. **DiaSemana** (Weekday): Days of the week reference data
6. **AsignacionHorario** (Schedule Assignment): Links employees to their schedules, locations, and shift types

### Authentication & Authorization
- Custom login system that authenticates users by email
- Role-based access with "Admin" and "Manager" groups
- Employees can be linked to Django User accounts

### User Interface
- Login page with email/password authentication
- Separate dashboards for Admin and Manager roles
- Responsive design with Font Awesome icons

## Development Setup

### Prerequisites
- Docker and Docker Compose
- Python 3.13+ (for local development)
- PostgreSQL (when running locally without Docker)

### Running with Docker (Recommended)
1. Create a `.env` file with database credentials:
   ```
   POSTGRES_DB=asistencias
   POSTGRES_USER=postgres
   POSTGRES_PASSWORD=your_password
   DB_HOST=db
   DB_PORT=5432
   ```
2. Run `docker-compose up` to start all services

### Local Development
1. Install dependencies: `pip install -r src/requirements.txt`
2. Set environment variables for database connection
3. Run migrations: `python src/manage.py migrate`
4. Collect static files: `python src/manage.py collectstatic`
5. Start development server: `python src/manage.py runserver`

## Deployment Architecture

The application is containerized with Docker and uses a three-service architecture:
1. **web**: Django application served by Gunicorn
2. **nginx**: Reverse proxy serving static files and routing requests
3. **db**: PostgreSQL database

## Key Commands

### Development
- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Apply database migrations
- `python manage.py collectstatic` - Collect static files
- `python manage.py loaddata initial_data.yaml` - Load initial data
- `python assign_users.py` - Create and assign users to employees

### Docker
- `docker-compose up` - Start all services
- `docker-compose down` - Stop all services
- `docker-compose exec web python manage.py migrate` - Run migrations in container

## Custom Scripts

### assign_users.py
A utility script to create Django users and link them to employees. It:
1. Creates a Django User account
2. Assigns the user to the "Manager" group
3. Links the user to an existing Employee record

## Data Management

The system includes comprehensive initial data fixtures with:
- All 7 days of the week
- Multiple branch locations
- Various shift types
- Numerous schedule templates
- Employee records with schedule assignments

Data is loaded using Django fixtures in YAML format.

## Configuration

### Django Settings
- Language: Spanish (Mexico) - `es-mx`
- Time Zone: America/Mexico_City
- Static files served from `/static/`
- Media files served from `/media/`
- Database configured via environment variables

### Environment Variables
- `POSTGRES_DB`: Database name
- `POSTGRES_USER`: Database user
- `POSTGRES_PASSWORD`: Database password
- `DB_HOST`: Database host
- `DB_PORT`: Database port