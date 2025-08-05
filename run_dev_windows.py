import os
import subprocess
import threading
import sys
import datetime

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
BACKEND_APP_DIR = os.path.join(BACKEND_DIR, "cerveza_digital")
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend", "cerveza_digital")
VENV_DIR = os.path.join(BACKEND_DIR, "venv")
PYTHON_EXE = os.path.join(VENV_DIR, "Scripts", "python.exe")
NODE_MODULES_DIR = os.path.join(FRONTEND_DIR, "node_modules")
LOG_FILE = os.path.join(BASE_DIR, "setup_log.txt")


def log(message):
    timestamp = datetime.datetime.now().strftime("[%Y-%m-%d %H:%M:%S]")
    full_message = f"{timestamp} {message}"
    print(full_message)
    with open(LOG_FILE, "a", encoding="utf-8") as log_file:
        log_file.write(full_message + "\n")


def create_virtualenv():
    log("[BACKEND] No se encontró entorno virtual. Creando entorno...")
    subprocess.run(["python", "-m", "venv", "venv"], cwd=BACKEND_DIR)
    log("[BACKEND] Entorno virtual creado.")

    log("[BACKEND] Instalando dependencias desde requirements.txt...")
    subprocess.run([PYTHON_EXE, "-m", "pip", "install", "--upgrade", "pip"], cwd=BACKEND_DIR)
    subprocess.run([PYTHON_EXE, "-m", "pip", "install", "-r", "requirements.txt"], cwd=BACKEND_DIR)
    log("[BACKEND] Dependencias instaladas correctamente.")


def check_or_create_venv():
    if not os.path.exists(PYTHON_EXE):
        create_virtualenv()
    else:
        log("[BACKEND] Entorno virtual ya existe.")


def check_or_install_frontend():
    if not os.path.exists(NODE_MODULES_DIR):
        log("[FRONTEND] No se encontró node_modules. Instalando dependencias...")
        subprocess.run(["npm", "install"], cwd=FRONTEND_DIR, shell=True)
        log("[FRONTEND] Dependencias instaladas correctamente.")
    else:
        log("[FRONTEND] Dependencias de React ya instaladas.")


def run_backend():
    log("[BACKEND] Iniciando servidor Django...")
    subprocess.run([PYTHON_EXE, "manage.py", "runserver"], cwd=BACKEND_APP_DIR)


def run_frontend():
    log("[FRONTEND] Iniciando servidor React...")
    subprocess.run(["npm", "run", "dev"], cwd=FRONTEND_DIR, shell=True)


def main():
    log("========== INICIO DEL SCRIPT ==========")
    check_or_create_venv()
    check_or_install_frontend()

    t1 = threading.Thread(target=run_backend)
    t2 = threading.Thread(target=run_frontend)

    t1.start()
    t2.start()

    try:
        t1.join()
        t2.join()
    except KeyboardInterrupt:
        log("[INFO] Servidores detenidos manualmente.")
        sys.exit(0)


if __name__ == "__main__":
    main()
