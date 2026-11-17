# KRON – prototipo web

Sistema de memoria digital personal con IA (Seminario de Diseño Sistémico, INACAP). Idioma de la interfaz y de los comentarios: español.

## Estructura
- `index.html`: dos pantallas (`#land` ingreso/registro y `#app` aplicación).
- `styles.css`: tokens de color en `:root` (pizarra `--pz`, salvia `--sal`, oro `--oro`, naranja `--nar`).
- `app.js`: datos de ejemplo (`S`, `D`), navegación (`go`), asistente (`ask`, reglas `R`), voz, autenticación simulada.
- `assets/`: logos (blanco y color), isotipo y fondo de ingreso.

## Reglas de seguridad (respetar al editar)
- Nunca usar `innerHTML` con texto del usuario ni de datos externos; usar `textContent` (ver helper `el`).
- El login actual es SIMULADO. No guardar contraseñas en localStorage ni en el código.
- La promesa "zero-knowledge" exige cifrado en el dispositivo (AES-256-GCM, clave derivada con Argon2id/PBKDF2). Nada de claves en el servidor.
- La clave de recuperación se genera con `crypto.getRandomValues`; no usar `Math.random` para nada de seguridad.
- Los datos de emociones son sensibles: requieren consentimiento explícito y permitir exportar y eliminar.
- No agregar scripts de terceros sin versión fija.

## Pendiente
1. Reemplazar miniaturas de color por imágenes reales de Emma (carpeta `assets/demo/`).
2. Pantalla de recuperación de acceso con la clave generada.
3. Backend de autenticación (sesiones con expiración, límite de intentos).
4. Cifrado en cliente con Web Crypto y búsqueda por emoción sobre datos locales.

## Chat con Kron (agente-amigo)
- En la página publicada el chat usa `window.claude.use('sample')` (persona en `persona()`); sin IA cae a reglas (`R`).
- Para producción: llamar a un modelo desde un servidor propio; NUNCA poner API keys en el cliente. Enviar solo lo necesario (no archivos ni fotos).
- Voz: `speechSynthesis` (salida) y `SpeechRecognition` (entrada, modo conversación con el micrófono).
- Fotos/audio de ejemplo son generados (canvas y Web Audio); las subidas por el usuario se muestran y reproducen reales.

## Compartir y legal
- Compartir = correo o enlace, siempre solo lectura, con vencimiento y revocación (Ajustes > Accesos compartidos). Solo exige aceptar responsabilidad sobre plataformas externas (WhatsApp, etc.).
- Los enlaces del prototipo son simulados. En producción: token aleatorio de 192 bits guardado en servidor, vencimiento y permiso verificados del lado servidor, límite de intentos.
- Textos legales en `LEGAL` (app.js): son un borrador de ejemplo y deben ser revisados por un abogado.

## Cuenta y recuperación
- Registro: nombre, correo, contraseña y código de 6 dígitos (simulado). Al terminar se genera la clave de verificación, que sirve SOLO para recuperar la cuenta y puede enviarse al correo a petición.
- Login: «¿Olvidaste tu contraseña?» (código al correo) y «Recuperar cuenta» (correo + clave). En producción todo esto debe validarse en servidor, con límite de intentos y sin revelar si un correo existe.

## Chatbot de Kron
- Vista «Chat con Kron» (sec `chat`): historial `LOG`, indicador de escritura, sugerencias y chips «Abrir» para acciones. Responde dudas de KRON usando `FACTS` (IA) o `FAQ` (reglas, sin IA).
- Mantener `FACTS` y `FAQ` alineados con la app. No enviar archivos al modelo, solo texto y nombres de carpetas.

- Micrófono: `micClick` revisa el permiso (Permissions API), explica para qué se usa, pide `getUserMedia` solo con el botón «Permitir micrófono» y guía al usuario si está bloqueado.

## Diseño adaptable
- Escritorio >1024px: menú lateral completo. Tablet 601–1024px: menú de iconos (con `title`). Celular ≤600px: barra superior + menú deslizable (`#menu`, `#scrim`, `closeMenu()` en `go()`), ventanas como hojas inferiores y campos de 16px para evitar el zoom de iOS.
- Probar siempre en 390×844, 820×1180, 1024×768 y 1440×900 (sin desborde horizontal).

## Permisos
- `PERMS` define cada permiso (fotos, videos, música, documentos, descargas, compartir, micrófono, emociones, IA). Estados: concedido, denegado, «solo esta vez» (`ONCE`, solo sesión) o sin decidir. Solo se guardan en `localStorage` los concedidos/denegados.
- `ensure(keys)` se llama antes de subir, adjuntar (+), descargar, compartir, usar el micrófono y conversar con IA; `gate()` bloquea las secciones sin permiso. Ajustes > Permisos permite cambiarlos o restablecerlos.
- El micrófono además pide su propio permiso al navegador (`micGrant`). Pedir solo lo que la app usa.
