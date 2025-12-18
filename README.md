App Creator QR es una app para utilizar tanto en dispositivos moviles como en PC. 

En el caso de usar la app en un dispositivo móvil te permitirá compartir tu QR o guardarlo en la galeria. En el caso de utilizar un PC te lo descagará.

Para crear la aplicación debes tener instalado Node.js en tu equipo. Si no lo tienes instalado puedes hacerlo siguiendo las instrucciones del sitio web de Node.js.

Luego instala el CLI de Angular e Ionic globalmente:

npm install -g @angular/cli

npm install -g @ionic/cli

Hecho esto entramos en nuestro IDE y ejecutamos ionic start. Marcamos las opciones según van apareciendo y nombramos nuestro proyecto.

Ejecutamos npx cap init. Esto creará el archivo capacitor.config.ts y configurará todo para Capacitor.

En home.ts preparamos todos los imports:
<img width="1198" height="317" alt="image" src="https://github.com/user-attachments/assets/86baa0a3-0387-4d53-8aed-55cbfdfd22d5" />

En el constructor se preparan las herramientas que se usarán más adelante para carga y detección de plataforma.

loadingController: muestra un indicador de progreso durante operaciones asíncronas.


addIcons: registra los iconos de Ionic para que <ion-icon> los reconozca.

<img width="584" height="135" alt="image" src="https://github.com/user-attachments/assets/4554d593-d959-45ce-8449-de13b22b9e41" />

qrText almacena el contenido que se convertirá en código QR y se enlaza con [(ngModel)].
<img width="214" height="31" alt="image" src="https://github.com/user-attachments/assets/87443aa3-ba0c-4eaa-8edc-2b6d103ec5e4" />

El método captureScreen convierte el SVG del QR en un canvas y decide la ruta de salida según la plataforma:
document.getElementById('qrImage') obtiene el contenedor del QR.
html2canvas genera un canvas a partir de ese elemento.
Se comprueba Capacitor.isNativePlatform() para elegir la estrategia.
La lógica está contenida en un solo método, lo que simplifica pruebas y mantenimiento.

<img width="709" height="354" alt="image" src="https://github.com/user-attachments/assets/f4a70f9d-dcac-458e-8a71-89b4343206af" />

Con downloadImage en navegadores se usa un enlace temporal para descargar el PNG del QR.
Se crea un elemento <a> dinámicamente.
canvas.toDataURL() produce el PNG base64.
link.click() dispara la descarga del archivo.
No requiere APIs nativas y funciona en cualquier navegador moderno

<img width="448" height="152" alt="image" src="https://github.com/user-attachments/assets/bd316059-5159-4903-adc5-05eca68e5f8b" />

En el caso de shareImage en dispositivos nativos se guarda el archivo en caché y se invoca el cuadro de compartir del sistema.
Se elimina el prefijo data: del base64 antes de escribirlo.
Filesystem.writeFile guarda el archivo en el directorio de caché.
Share.share muestra el diálogo nativo con la ruta del archivo.
Filesystem.deleteFile limpia el archivo temporal.
El flujo respeta las guías de Capacitor para compartir archivos y mantiene limpio el almacenamiento.

<img width="768" height="761" alt="image" src="https://github.com/user-attachments/assets/430630db-aa0f-4bec-8cbd-802f469b4359" />

Ahora toca la parte de html.


Para Android: npx cap add android.
Para iOS: npx cap add ios. 

Construye tu aplicación web: Ejecuta ionic build para generar los archivos web que se copiarán a las carpetas nativas.
Sincroniza los cambios: Usa npx cap sync para copiar los archivos de tu aplicación web (build) a los proyectos nativos de Android e iOS. 
4. Ejecuta en dispositivos
Abre los proyectos nativos:
Para Android: npx cap open android
Para iOS: npx cap open ios
Ejecuta desde Android Studio/Xcode: Abre el proyecto nativo generado (Android Studio o Xcode) y compila y ejecuta tu aplicación en un emulador o dispositivo físico. 





