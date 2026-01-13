# Instrucciones para el Icono de la PWA

Para que la aplicación funcione correctamente como PWA y muestre el icono en dispositivos móviles:

1.  Necesitas una imagen cuadrada (png) de alta resolución (preferiblemente 512x512px).
2.  Renombra esta imagen a `icon.png`.
3.  Coloca el archivo en la carpeta `public/` de este proyecto.

La ruta final debe ser: `public/icon.png`.

El archivo `src/app/manifest.ts` ya está configurado para buscar el icono en esta ubicación y usarlo para diferentes tamaños (192x192 y 512x512).
