# Unidades de Medida en CSS

## Tabla de Unidades de Medida

| **Unidad** | **Descripción**| **Ejemplo de Uso**   |
|------------|-----------------------------------------------------------------|----------------------|
| `px`       | Píxeles. Unidad relativa al número de píxeles en la pantalla.    | `width: 100px;`      |
| `%`        | Porcentaje relativo al elemento padre.                          | `width: 50%;`        |
| `em`       | Unidad relativa al tamaño de la fuente del elemento padre.      | `font-size: 2em;`    |
| `rem`      | Unidad relativa al tamaño de la fuente raíz (html).             | `font-size: 1.5rem;` |
| `vw`       | Unidad relativa al 1% del ancho de la ventana del navegador.    | `width: 80vw;`       |
| `vh`       | Unidad relativa al 1% de la altura de la ventana del navegador. | `height: 90vh;`      |
| `vmin`     | Relativa al valor menor entre el ancho o altura de la ventana.  | `font-size: 10vmin;` |
| `vmax`     | Relativa al valor mayor entre el ancho o altura de la ventana.  | `font-size: 10vmax;` |
| `cm`       | Centímetros, una unidad física.                                 | `width: 10cm;`       |
| `mm`       | Milímetros, una unidad física.                                  | `height: 50mm;`      |
| `in`       | Pulgadas, una unidad física.                                    | `width: 4in;`        |
| `pt`       | Puntos tipográficos (1/72 de pulgada).                          | `font-size: 12pt;`   |
| `pc`       | Picas, equivalente a 12 puntos tipográficos.                    | `font-size: 1pc;`    |

## Cuadro Comparativo de Unidades Relativas y Absolutas en CSS

| **Tipo de Unidad** | **Descripción**                                    | **Ejemplos de Unidades** |
|--------------------|----------------------------------------------------|--------------------------|
| **Unidades Relativas** | Son aquellas que dependen de un contexto, como el tamaño del contenedor, la ventana del navegador o el tamaño de la fuente raíz. | `em`, `rem`, `%`, `vw`, `vh`, `vmin`, `vmax` |
| **Unidades Absolutas** | Son aquellas que tienen un valor fijo, independientemente del contexto. Se basan en unidades físicas o métricas tradicionales. | `px`, `cm`, `mm`, `in`, `pt`, `pc` |

## Consideraciones Adicionales

- Las **unidades relativas** son útiles para diseñar interfaces responsivas, ya que se adaptan a diferentes tamaños de pantalla.
- Las **unidades absolutas** se utilizan cuando se necesita una precisión constante, sin importar el tamaño del contenedor o dispositivo.
