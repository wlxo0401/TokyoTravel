# Plantilla de planificador de viajes

<p align="center">
  <a href="README.md">English</a> ·
  <a href="README.ko.md">한국어</a> ·
  <a href="README.ja.md">日本語</a> ·
  <a href="README.zh-CN.md">简体中文</a> ·
  <a href="README.zh-TW.md">繁體中文</a> ·
  <b>Español</b> ·
  <a href="README.fr.md">Français</a>
</p>

Una app web estática de planificación de viajes que despliegas en GitHub Pages, sin herramientas de compilación.
**Úsala como punto de partida y da forma a tu propia plantilla de planificación con ayuda de la IA.**

> Este repositorio es solo un **ejemplo**. Los datos están rellenados para un viaje a Tokio en septiembre de 2026,
> pero nada es definitivo. Úsalo tal cual si te gusta, o reescribe el destino, la estructura,
> el diseño y las funciones a tu gusto para construir una plantilla mejor. Solo somos un punto de partida.

## Por qué existe

Parte de una observación: **planificas mucho antes de un viaje, pero no reescribes el plan durante el viaje.**
Los viajes nunca salen 100 % según lo previsto y las cosas cambian, pero no te sientas a rehacer el itinerario a mitad de camino.
Por eso esta app trata la planificación como dos fases separadas.

- **Antes del viaje — planificar**: construye el itinerario con la IA y carga lo que vas a necesitar
  (lugares, enlaces, candidatos). Haz push a GitHub y ya está en línea; comparte el enlace con tus compañeros de viaje.
- **Durante el viaje — consulta (solo lectura)**: aquí no editas el plan. Sirve para
  **consultar lo que preparaste y decidir rápido sobre la marcha.**
  - Ve la ruta de hoy de un vistazo con las pestañas por fecha
  - Sigue el recorrido del día en orden — llegada, barrios, equipaje, check-in — como un flujo flexible, no un horario rígido
  - Un toque para indicaciones en el mapa (Naver para los tramos en Corea, Google para los de Japón)
  - Consulta los trayectos entre paradas y las notas logísticas (consignas, equipaje) ahí mismo

El plan no se impone. En lugar de un horario fijo, mantén un orden flexible y una lista corta,
y ve eligiendo sobre la marcha. Eso es viajar.

## Puntos destacados

- Sin framework, sin bundler, sin backend. HTML/CSS/módulos ES puros.
- Datos e interfaz separados: toda la información del viaje vive en un único `data/trip.js`.
- Solo modo claro, mobile-first (también funciona en escritorio).

---

## Primeros pasos

### 1. Clonar y ejecutar en local

```bash
git clone https://github.com/<your-name>/<your-repo>.git
cd <your-repo>
python3 -m http.server 8000
# http://localhost:8000
```

Abrir `index.html` directamente en el navegador rompe la carga de módulos ES, así que sírvelo siempre
desde un servidor local. (Vale cualquier servidor estático: `npx serve`, etc., en lugar de `python3`.)

### 2. Hazla tu viaje

Lo más rápido es **dejárselo a la IA**. Abre todo el repositorio y di
«adapta este proyecto para mi viaje a ___»: recorrerá `data/trip.js` y, si hace falta,
también la maquetación, la estructura de pestañas y los estilos.

Las reglas de trabajo de este repositorio para asistentes de IA están en
[`CLAUDE.md`](CLAUDE.md): Claude Code lo lee automáticamente; indica ese archivo a otras herramientas.

### 3. Desplegar (GitHub Pages)

1. Repositorio → **Settings → Pages**
2. **Source: Deploy from a branch**, Branch: `main` / `/(root)`
3. Unos minutos después estará en línea en `https://<your-name>.github.io/<your-repo>/`
4. Comparte ese enlace con tus compañeros. A partir de ahí, solo haz push de tus cambios y se publican automáticamente.

El archivo `.nojekyll` omite el procesamiento de Jekyll. Todas las rutas de recursos son relativas, así que funciona en un despliegue bajo subruta.

## Precaución

> [!WARNING]
> **No introduzcas datos sensibles directamente.** `data/trip.js` se confirma en el
> repositorio y se publica de forma pública en GitHub Pages, y el historial de git lo
> conserva aunque lo borres después. Deja fuera los números de reserva, de pasaporte o
> DNI, los teléfonos, la dirección completa de casa y los códigos de acceso: comparte
> eso con tus compañeros por un canal privado. Los nombres de lugares, las zonas y las
> coordenadas del mapa no hay problema.
