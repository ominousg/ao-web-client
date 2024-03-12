## Indexación en el AOWeb (borrador, falta ajustar el workflow)

En pocas palabras: se indexea tal cual como si estuvieses trabajando con el cliente convencional de Alkon 13.x, y después usamos uno de los scripts creados por [Horacio Martinez](https://github.com/horaciomartinez), por ejemplo: [traductor_indices.py](placeholder)

El script se encarga de transformar los archivos .ini (aka los archivos .ind desindexados) en formato JSON para que PixiJS pueda usarlos con la siguiente estructura:

_graficos.json_

```
{
    "offX": 1273,
    "height": 32,
    "grafico": "a1",
    "css": 1,
    "width": 32,
    "id": 1,
    "offY": 1664
},
```

_cascos.json_

```
{
        "down": 4311,
        "left": 4314,
        "right": 4312,
        "id": 1,
        "up": 4315
},
```

### Herramientas

Descargar el [AO Alkon 13.3 con sus recursos](https://github.com/Comunidad-Winter/Argentum-Online) + [IndexHiPr0](https://www.4shared.com/zip/11XJRoXQ/IndexHiPr0.html) o [IndexHiPr0 12.1](https://www.4shared.com/zip/F2NO-xE-/IndexHiPr0-v0121.html) + [Des-indexador universal (DIU)](https://www.4shared.com/zip/RNZVGzGt/des-indexador_universal__diu_.html) + [Indexador Destruction AO (Opción 1)](https://www.4shared.com/get/aOPKaTr7iq/Destruction-Ao_Index_Dater.html), [Opción 2 con códigos](https://www.4shared.com/postDownload/7nxeik_ujq/DestructionAOIndexDater_171008.html) si entran a la Opción 1, se puede ver abajo del botón descarga la carpeta que incluye los códigos.

Idealmente se usaría uno solo (por ej el IndexHiPr0), pero por un tema de bugs y falta de tiempo vamos a usarlos a todos con objetivos diferentes. El workflow puede ser mejorado.

### Para que se usa cada uno:

- IndexHiPr0: para des-indexar índices específicos, como los cascos.
- DIU: para des-indexar e indexar el graficos.ind-ini.
- Indexador Destruction AO: para visualizar los grhs y sus animaciones + ajustar altura/anchura/posición de un grh.

### Tutoriales

Se encuentran en la carpeta "tutoriales". Las páginas fueron guardadas usando la extensión [Save Page WE](https://addons.mozilla.org/en-US/firefox/addon/save-page-we/)

### Planes a futuro

En el largo plazo la idea es reemplazar estas herramientas por indexadores mas usados en el mundo gamedev, por ejemplo [TexturePacker](https://www.codeandweb.com/texturepacker) o [FreeTexturePacker](https://github.com/odrick/free-tex-packer), adaptándolo al manejo de índices .json que tiene el AOWeb.
