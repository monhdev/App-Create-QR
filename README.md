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
platform: identifica si el código corre en un dispositivo nativo o en el navegador.
addIcons: registra los iconos de Ionic para que <ion-icon> los reconozca.







Para Android: npx cap add android.
Para iOS: npx cap add ios. 

Construye tu aplicación web: Ejecuta ionic build para generar los archivos web que se copiarán a las carpetas nativas.
Sincroniza los cambios: Usa npx cap sync para copiar los archivos de tu aplicación web (build) a los proyectos nativos de Android e iOS. 
4. Ejecuta en dispositivos
Abre los proyectos nativos:
Para Android: npx cap open android
Para iOS: npx cap open ios
Ejecuta desde Android Studio/Xcode: Abre el proyecto nativo generado (Android Studio o Xcode) y compila y ejecuta tu aplicación en un emulador o dispositivo físico. 

