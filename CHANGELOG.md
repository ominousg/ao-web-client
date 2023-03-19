# Changelog: ao-web-client

- 08/01/2023: Agregando animación vertical del texto over head. [(8ff70b7)](https://github.com/ominousg/ao-web-client/commit/8ff70b78662c7aede9d128eed5d62907ce92a03e)
- 10/01/2023: Implementando preloader de mapas. [(3724dda)](https://github.com/ominousg/ao-web-client/commit/3724ddab6711dc4c94308e79ed1f47e6c0657434)
- 11/01/2023: Efecto fade-out al estar bajo techo y fade-in al salir, similar a AlphaBlending. [(6da8193)](https://github.com/ominousg/ao-web-client/commit/6da81936f480b179f327823f42d5a8ed60f7b4dc)
- 22/01/2023: Agregando comandos de GM. [(ffe8544)](https://github.com/ominousg/ao-web-client/commit/ffe85441a80496c3bc20ee0711503a66c5edfc03)
- 04/02/2023: Migración de RequireJS a Webpack. Ahora se pueden usar e instalar dependencias con npm. Se cambió el estilo de importación AMD (define) por ESM (import). Trasladando HTML de los popups a sus archivos .js [(158eedf)](https://github.com/ominousg/ao-web-client/commit/158eedf105d7244c5d29019565f30cabd12a7fec)
- 04/02/2023: Implementando contador de FPS usando [performance.now()](https://developer.mozilla.org/es/docs/Web/API/Performance/now). El límite máximo de FPS lo setea el navegador según la frecuencia de refresco (Hz) del monitor. [(f9c356a)](https://github.com/ominousg/ao-web-client/commit/f9c356a45e135b9f6ed847cc60c9378ba16afad2)
- 19/03/2023: El popup.js no usaba la altura y anchura especificadas por el objeto options en los archivos de cada popup. El popup de estadísticas no mostraba el valor real de los skills. Ahora los popups de carpintería y herrería tienen el estilo (CSS) mejorado, se muestran los gráficos de los items, y se puede construir mas de un item a la vez. [(placeholder)](https://github.com/ominousg/ao-web-client/commit/placeholder)
