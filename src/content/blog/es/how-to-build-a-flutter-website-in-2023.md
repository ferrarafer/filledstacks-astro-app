---
title: Cómo construir un sitio Web Flutter en 2023
description: Guía para crear y desplegar un sitio Web con Flutter en 2023.
published: 2023-02-28
updated: 2023-02-28
postSlug: how-to-build-a-flutter-website-in-2023
author: Dane Mackier
ogImage: /assets/blog/tutorials/085/thumbnail.jpeg
featured: false
draft: false
tags:
  - flutter web
categories:
  - tutorial
lang: es
---

Este tutorial le enseñará los conceptos básicos de la construcción de un sitio Web con Flutter y desplegarlo a Firebase. Esta es la parte 1 de una serie de 4 partes, la serie que cubriremos:

## Contenido

**Parte 1. Una Página de Presentación Básica**

- Creando la app usando Stacked
- Introducción a una UI adaptable
- Cómo estructurar los archivos del proyecto
- Introducción a los formularios
- Despliegue de una aplicación Web en Flutter

Parte 2: Diseño de la interfaz de usuario

- Crear encabezados y pies de página persistentes
- Crear un Menú o Barra de Herramientas usando navegación anidada

Parte 3: Gestión de rutas

- Url de navegación específica
- Navegación hacia atrás y hacia adelante usando botones de retroceso
- Conceptos básicos de protección de rutas

Parte 4: Mejorar la experiencia Web con Flutter

- Animaciones de carga al inicio
- Animaciones de introducción cuando se carga la página
- Efectos Hover para aumentar la interactividad

## Introducción

Construyo nuestras aplicaciones y las aplicaciones de nuestros clientes utilizando Stacked, es un meta-framework que proporciona patrones de producción con puntos de vista concretos a su código base. Su código se mantiene testeable, mantenible y escalable para grandes equipos. Para empezar instalamos `stacked_cli` ejecutando.

```shell
dart pub global activate stacked_cli
```

Cuando finalice la instalación crearemos nuestro proyecto web utilizando la plantilla web dedicada.

```shell
stacked create app filledstacks_academy --template=web
```

_**Advertencia**: Stacked no controla donde se instala. Si `stacked` no es reconocido comprueba tu ruta e intenta instalar otros paquetes dart para ver si funciona._

## Resumen del proyecto

Stacked te proporciona una plantilla en la que la mayor parte de la configuración ya está hecha. Para evitar hacer una inmersión profunda en todo de inmediato vamos a abordar las partes que necesitamos para lograr el objetivo que nos ocupa.

### Diseños adaptables

Para mostrar esto vamos a empezar por ejecutar la aplicación. En tu terminal ejecuta lo siguiente.

```shell
flutter run -d chrome
```

Ahora cambia el tamaño de la ventana de Chrome y verás que la interfaz de usuario cambia entre el escritorio (la interfaz de usuario del contador), la tableta y el móvil. Si abres `home_view.dart` verás el widget responsable de esto, `ScreenTypeLayout.builder`. Te permite construir diferentes interfaces de usuario basadas en el tamaño de pantalla actual definido como móvil, tablet y escritorio.

Mi objetivo es siempre tener código escalable, lo que significa que yo y mi equipo tenemos un patrón a seguir para producir código de alta calidad, de manera consistente. El paquete `responsive_builder` es el único paquete que se centra en la creación de una interfaz de usuario fácilmente comprensible, sin tener múltiples comprobaciones y lógica condicional dispersa por todas partes.

## Construir una página de aterrizaje

Con este breve resumen podemos empezar a construir la interfaz de usuario de escritorio (Diseño de abajo).

![FilledStacks Academy Desktop UI](/assets/blog/tutorials/085/01-desktop-ui.jpeg)

Vamos a dividir el diseño de la siguiente manera.

![FilledStacks Academy Desktop UI Breakdown](/assets/blog/tutorials/085/02-desktop-ui-breakdown.jpeg)

### Diseños de interfaz de usuario

Abre `home_view.desktop.dart` donde puedes quitar el cuerpo del Scaffold. Establece el cuerpo como una Fila, el primer hijo (Lado izquierdo de la pantalla) es una `Columna` y el último hijo es una Imagen (Usaremos un contenedor por ahora).

```dart
@override
Widget build(BuildContext context, HomeViewModel viewModel) {
    return Scaffold(
    // Fila exterior
    body: Row(
        mainAxisSize: MainAxisSize.max,
        children: [
            // Lado izquierdo de la pantalla
            Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [],
            ),
            // Lado derecho de la pantalla
            Container(width: 450, color: Colors.amber)
        ],
    ));
}
```

Ahora que tenemos el diseño podemos empezar a añadir nuestra interfaz de usuario real. A continuación se muestra un desglose por widget de la interfaz de usuario que vamos a construir.

![Flutter Desktop UI Breakdown](/assets/blog/tutorials//085/03-desktop-widget-breakdown.jpg)

Cada rectángulo muestra un widget separado con su tipo en la etiqueta a su lado. Puede copiar lo siguiente y pegarlo dentro de los hijos de la `Columna`.

```dart
// Icono de la Academia
const Text(
    'FilledStacks Academy',
    style: TextStyle(
        fontSize: 15,
        fontWeight: FontWeight.w800,
    ),
),

// Espacio
const Spacer(flex: 2),

// Título
GradientText(
    'MASTER\nFLUTTER',
    style: const TextStyle(
        fontWeight: FontWeight.w800,
        fontSize: 80,
        height: 0.95,
    ),
    colors: const [Color(0xff0CFF60), Color(0xff0091FB)],
    ),
    const Text(
    'ON THE WEB',
    style: TextStyle(
        fontWeight: FontWeight.w800,
        fontSize: 80,
        height: 0.95,
    ),
),

// Subtítulo
Row(
    children: [
        const Text(
        'Build amazing software, the right way.',
        style: TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 20,
        ),
        ),
        GradientText(
        ' Sign up to be notified',
        style: const TextStyle(
            fontWeight: FontWeight.w600,
            fontSize: 20,
        ),
        colors: const [Color(0xff0CFF60), Color(0xff0091FB)],
        )
    ],
),

verticalSpaceMedium,

// Flecha
Padding(
    padding: const EdgeInsets.symmetric(horizontal: 100),
    child: SvgPicture.asset('assets/sign-up-arrow.svg'),
),

verticalSpaceSmall,

Row(
    children: [
        // Campo de texto
        Container(
            child: const TextField(
                decoration: InputDecoration.collapsed(
                hintText: 'Enter your Email',
                hintStyle: TextStyle(
                    color: Color(0xff989898),
                ),
                filled: true,
                fillColor: Color(0xFF232323),
                ),
            ),
            width: kdDesktopMaxContentWidth * 0.3,
            padding: const EdgeInsets.symmetric(
                horizontal: 20, vertical: 20),
            decoration: BoxDecoration(
                color: const Color(0xFF232323),
                borderRadius: BorderRadius.circular(8),
            ),
        ),

        horizontalSpaceSmall,

        // Bóton de notificación
        Container(
            padding: const EdgeInsets.symmetric(
                horizontal: 20,
                vertical: 16,
            ),
            alignment: Alignment.center,
            decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(8),
            ),
            child: const Text(
                'Notify Me',
                style: TextStyle(
                    color: Colors.black,
                    fontWeight: FontWeight.w700,
                    fontSize: 20),
            ),
        )
    ],
),

const Spacer(flex: 3)
```

Ahora tenemos que hacer algunas cosas para que esto funcione.

1. Ir al error de `kdDesktopMaxContentWidth` en el TextField e importar las constantes de la aplicación. _En el error pulsa `Cmd`+`.` o `ctrl`+`.` y selecciona la opción importar._
2. Instalar **Simple Gradient Text** ejecutando `flutter pub add simple_gradient_text` e importa. Usando el consejo de #1.
3. Instalar **Flutter SVG** ejecutando `flutter pub add flutter_svg` e importar. Usar el consejo de #1.
4. Descargar [este](https://firebasestorage.googleapis.com/v0/b/filledstacks.appspot.com/o/tutorials%2F085%2Fsign-up-arrow.svg?alt=media&token=b89bc714-c01a-43ba-bee1-2e34f3639632) archivo SVG (Abrir enlace y luego guardar desde el navegador). A continuación, crear una nueva carpeta en el directorio raíz llamada `assets` y poner el archivo allí.
5. Abrir el archivo `pubspec.yaml` y añadir la carpeta assets.

```yaml
---
flutter:
  # The following line ensures that the Material Icons font is
  # included with your application, so that you can use the icons in
  # the material Icons class.
  uses-material-design: true

  # To add assets to your application, add an assets section, like this:
  assets:
    - assets/
```

En tu terminal ejecuta `flutter run -d chrome` y verás una aplicación Web muy fea 😂.

![Flutter widgets without Styling](/assets/blog/tutorials/085/04-ui-layout-complete.jpg)

La construcción de la interfaz de usuario en un tutorial no es mi favorito, siempre trato de mantenerlo lo más compacto posible. Sólo quedan unos estilos más de interfaz de usuario y luego podemos pasar a cosas más divertidas como diseños adaptables.

### Estilo de la interfaz de usuario

Vamos a configurar todos los colores antes de continuar. Abre `app_colors.dart`, _en VS Code presiona `Cmd`+`p` y escribe `app_colors` luego presiona enter_. Actualizaremos el archivo a lo siguiente.

```dart
import 'package:flutter/material.dart';

const Color kcPrimaryColor = Color(0xFF9600FF);
const Color kcPrimaryColorDark = Color(0xFF300151);
const Color kcBlack = Color(0xff0A0A0A);
const Color kcDarkGreyColor = Color(0xFF1A1B1E);
const Color kcMediumGrey = Color(0xFF232323);
const Color kcLightGrey = Color(0xff989898);
const Color kcVeryLightGrey = Color(0xFFE3E3E3);
const Color kcBackgroundColor = kcBlack;

const List<Color> kgTitle = [kcTitleGradientLeft, kcTitleGradientRight];
const Color kcTitleGradientLeft = Color(0xff0CFF60);
const Color kcTitleGradientRight = Color(0xff0091FB);
```

No me gusta lo verborrágico que es Flutter Theme, así que uso constantes para almacenar mis colores. La convención que utilizo es una "k" delante, lo que indica una constante. En todas mis códigos base puedo escribir `k` y aparecerán todas mis constantes. La letra siguiente indica el tipo de constante. He aquí algunos ejemplos.

- `kc`: Color
- `kg`: Gradient
- `kts`: TextStyle
- `kd`: double

Y otras me las invento a medida que las necesito. Esto crea una constante como `kcLightGrey` que se traduce como "una constante de tipo color que es gris claro". Para conseguir que la captura de pantalla se vea mejor sólo hay unas pocas cosas que tenemos que hacer.

1. Establecer el color de fondo
2. Colocar el contenido en el centro de la vista
3. Restringir la anchura del contenido
4. Utilizar la fuente correcta (OpenSans)

1-3 se hace con pequeñas actualizaciones de la función de construcción.

```dart
return Scaffold(
      // #1
      backgroundColor: kcBackgroundColor,
      // #2
      body: Center(
        // #3
        child: SizedBox(
          width: kdDesktopMaxContentWidth,
          height: kdDesktopMaxContentHeight,
          child: Row(
            mainAxisSize: MainAxisSize.max,
            children: [
                ...
            ]
          ),
        ),
      ),
);
```

En cuanto al #4, empezaremos añadiendo google fonts.

```shell
flutter pub add google_fonts
```

Nuestra primera actualización es el tema principal en `main.dart`. Vamos a establecerlo a openSans y blanco como color por defecto.

```dart
MaterialApp(
    title: 'FilledStacks Academy',
    theme: Theme.of(context).copyWith(
        primaryColor: kcBackgroundColor,
        focusColor: kcPrimaryColor,
        // Usar openSansTextTheme
        textTheme: GoogleFonts.openSansTextTheme().apply(
            bodyColor: Colors.white,
        ),
    ),
   ...
);
```

Para mantener las cosas organizadas queremos crear un conjunto de estilos compartidos. Crea un nuevo archivo `lib/ui/common/shared_styles.dart` donde pondremos nuestros valores de estilos compartidos.

```dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

TextStyle get ktsTitleText => GoogleFonts.openSans(
      fontSize: 80,
      height: 0.95,
      fontWeight: FontWeight.w800,
    );

TextStyle get ktsBodyRegular => GoogleFonts.openSans(
      fontSize: 15,
    );

TextStyle get ktsBodyLarge => GoogleFonts.openSans(
      fontSize: 20,
    );

```

Ahora podemos reemplazar los `estilos` que suministramos anteriormente por los que acabamos de crear. Tu código debería ser como el siguiente.

```dart
// Icono de la academia
Text(
    'FilledStacks Academy',
    style: ktsBodyRegular.copyWith(fontWeight: FontWeight.w800),
),

// Título
GradientText(
    'MASTER\nFLUTTER',
    style: ktsTitleText,
    colors: const [Color(0xff0CFF60), Color(0xff0091FB)],
),
Text(
    'ON THE WEB',
    style: ktsTitleText,
),

 // Subtítulo
Row(
    children: [
        Text(
        'Build amazing software, the right way.',
        style:
            ktsBodyLarge.copyWith(fontWeight: FontWeight.w600),
        ),
        GradientText(
        ' Sign up to be notified',
        style:
            ktsBodyLarge.copyWith(fontWeight: FontWeight.w600),
        colors: const [Color(0xff0CFF60), Color(0xff0091FB)],
        )
    ],
),

```

Y con esto concluye la parte de estilo. La última parte de la interfaz de usuario para completar es la adición de la imagen. Podemos reemplazar el contenedor amarillo con

```dart
ClipRRect(
    borderRadius: BorderRadius.circular(20),
    child: Image.asset(
        'assets/master-web-hero-image.png',
        width: kdDesktopMaxContentWidth * 0.4,
        height: double.infinity,
        fit: BoxFit.cover,
    ),
)
```

Descargar [la imagen heroica](https://firebasestorage.googleapis.com/v0/b/filledstacks.appspot.com/o/tutorials%2F085%2Fmaster-web-hero-image.png?alt=media&token=724f8444-03c1-4cd1-8e8f-bd2b0de4a691) y colocarla en la carpeta assets donde está la flecha. Ahora, cuando ejecutes la aplicación, deberías ver una interfaz de usuario que coincida con nuestro diseño original. ¡Muy fácil! Sigamos.

![Flutter Web original design](/assets/blog/tutorials//085/01-desktop-ui.jpeg)

## Interfaz de usuario adaptable

Este es el diseño de la interfaz de usuario para móviles

![Mobile UI Layout](/assets/blog/tutorials//085/05-mobile-design.jpeg)

Como se puede ver los widgets son los mismos, pero en un diseño diferente. Así que vamos a empezar por refactorizar cada uno de los widgets que hemos añadido en su propio archivo para que podamos reutilizarlos. Crearemos una nueva carpeta en `lib/ui/view/home/` llamada `widgets`. _Yo almaceno todos mis widgets que sólo se utilizan en vistas individuales en una carpeta llamada widgets para que sea fácil saber su alcance y dónde se va a utilizar._

### Widgets sólo para la vista de inicio

Los primeros widgets que vamos a refactorizar son los que, por ahora, sólo se utilizarán en la `HomeView`. Empezando por el título, crea un nuevo archivo `home_title.dart`.

```dart
class HomeTitle extends StatelessWidget {
  const HomeTitle({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GradientText(
          'MASTER\nFLUTTER',
          style: ktsTitleText,
          colors: const [Color(0xff0CFF60), Color(0xff0091FB)],
        ),
        Text(
          'ON THE WEB',
          style: ktsTitleText,
        ),
      ],
    );
  }
}
```

Luego moveremos el subtítulo a su propio archivo llamado `home_subtitle.dart`

```dart
class HomeSubtitle extends StatelessWidget {
  const HomeSubtitle({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(
          'Build amazing software, the right way.',
          style: ktsBodyLarge.copyWith(fontWeight: FontWeight.w600),
        ),
        GradientText(
          ' Sign up to be notified',
          style: ktsBodyLarge.copyWith(fontWeight: FontWeight.w600),
          colors: const [Color(0xff0CFF60), Color(0xff0091FB)],
        )
      ],
    );
  }
}
```

El siguiente es `home_notify_button.dart`

```dart
class HomeNotifyButton extends StatelessWidget {
  final Function()? onTap;
  const HomeNotifyButton({Key? key, this.onTap}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Vamos a añadir un detector de gestos ahora para que no sea necesario más tarde
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: 20,
          vertical: 16,
        ),
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
        ),
        child: const Text(
          'Notify Me',
          style: TextStyle(
              color: Colors.black, fontWeight: FontWeight.w700, fontSize: 20),
        ),
      ),
    );
  }
}

```

El último es el widget de imagen. Crea un archivo llamado `home_image.dart` y agrega el siguiente código ahí.

```dart
class HomeImage extends StatelessWidget {
  const HomeImage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(20),
      child: Image.asset(
        'assets/master-web-hero-image.png',
        width: kdDesktopMaxContentWidth * 0.4,
        height: double.infinity,
        fit: BoxFit.cover,
      ),
    );
  }
}
```

### Widgets comunes

El último conjunto de widgets son widgets que se utilizarán en toda la aplicación y no sólo en la vista de inicio. Estos widgets van en `lib/ui/widgets/common/`. El primero es `academy_icon.dart`.

```dart
class AcademyIcon extends StatelessWidget {
  const AcademyIcon({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      'FilledStacks Academy',
      style: ktsBodyRegular.copyWith(fontWeight: FontWeight.w800),
    );
  }
}
```

Y el último es nuestro `input_field.dart`

```dart
class InputField extends StatelessWidget {
  final TextEditingController? controller; // Esto es extra, pero lo necesitaremos muy pronto.
  const InputField({Key? key, this.controller}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      child: TextField(
        controller: controller,
        decoration: const InputDecoration.collapsed(
          hintText: 'Enter your Email',
          hintStyle: TextStyle(
            color: Color(0xff989898),
          ),
          filled: true,
          fillColor: Color(0xFF232323),
        ),
      ),
      width: kdDesktopMaxContentWidth * 0.3,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 20),
      decoration: BoxDecoration(
        color: const Color(0xFF232323),
        borderRadius: BorderRadius.circular(8),
      ),
    );
  }
}
```

Esto debería dejar a `home_view.desktop.dart` con un aspecto mucho más ordenado 👌

```dart
Row(
    mainAxisSize: MainAxisSize.max,
    children: [
        Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
            const AcademyIcon(),
            const Spacer(flex: 2),
            const HomeTitle(),
            const HomeSubtitle(),

            // Arrow
            verticalSpaceMedium,
            Padding(
                padding: const EdgeInsets.symmetric(horizontal: 100),
                child: SvgPicture.asset('assets/sign-up-arrow.svg'),
            ),
            verticalSpaceSmall,

            Row(
                children: const [
                    InputField(),
                    horizontalSpaceSmall,
                    HomeNotifyButton()
                ],
            ),
            const Spacer(flex: 3)
        ],
        ),
        const HomeImage()
    ],
),
```

### UI adaptable

Ahora que todos los widgets están refactorizados, están listos para su reutilización en la interfaz de usuario móvil. Mirando este diseño vemos que ahora es una sola `Columna`.

![Flutter Mobile Design Layout Breakdown](/assets/blog/tutorials//085/06-mobile-layout-breakdown.jpeg)

Podemos abrir `home_view.mobile.dart` y organizar los widgets en el orden en que aparecen en el diseño.

```dart
class HomeViewMobile extends ViewModelWidget<HomeViewModel> {
  const HomeViewMobile({super.key});

  @override
  Widget build(BuildContext context, HomeViewModel viewModel) {
    return Scaffold(
        backgroundColor: kcBackgroundColor,
        body: ListView(
          padding: const EdgeInsets.symmetric(
            horizontal: 40,
            vertical: 50,
          ),
          children: const [
            AcademyIcon(),
            verticalSpaceLarge,
            HomeTitle(),
            verticalSpaceTiny,
            HomeSubtitle(),
            verticalSpaceLarge,
            InputField(),
            verticalSpaceMedium,
            HomeNotifyButton(),
            verticalSpaceMedium,
            HomeImage(),
          ],
        ));
  }
}
```

Como queremos que la vista se desplace, en lugar de usar una columna, usaremos una `ListView`. Si ejecutas esto verás que la interfaz de usuario no se construye. Esto se debe a que `HomeImage` establece su altura con `double.infinity`, lo que significa que es infinita en la dirección de desplazamiento de la lista. Así que podemos entrar y hacer una modificación.

#### Capacidad de adaptación a nivel de widget

Este es nuestro primer encuentro con la capacidad de adaptación a nivel de widget. Lo que haremos es devolver 650 en móvil e infinito para escritorio. Para ello utilizaremos la función `getValueForScreenType` del paquete `responsive_builder` que nos permite devolver un valor basado en el tipo de pantalla.

```dart
class HomeImage extends StatelessWidget {
  const HomeImage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(20),
      child: Image.asset(
        'assets/master-web-hero-image.png',
        width: kdDesktopMaxContentWidth * 0.4,
        // Devuelve 650 para móvil y doble.infinito en escritorio
        height: getValueForScreenType<double>(
          context: context,
          mobile: 650,
          desktop: double.infinity,
        ),
        fit: BoxFit.cover,
      ),
    );
  }
}
```

Si estás ejecutando la aplicación, haz que la ventana del navegador sea lo más pequeña posible y verás que la interfaz de usuario tiene este aspecto.

![Mobile UI Preview](/assets/blog/tutorials//085/07-mobile-ui-preview-1.jpg)

Sólo se requieren cambios en 3 widget adaptables y esta interfaz de usuario estará lista.

1. Reducir el tamaño del título en el móvil para evitar ser envuelto
2. En el móvil se usa una `Columna` para el subtítulo en lugar de una `Fila`
3. El título debe centrar los elementos en lugar de alinearlos a la izquierda

#### Reducir el tamaño del título en el móvil

Esto lo podemos arreglar simplemente usando fontSize 60 en móvil y 80 en escritorio para el título.

```dart
class HomeTitle extends StatelessWidget {
  const HomeTitle({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        GradientText(
          'MASTER\nFLUTTER',
          // Utiliza 60 para móvil y 80 para escritorio <====== #1
          style: ktsTitleText.copyWith(
            fontSize: getValueForScreenType<double>(
              context: context,
              mobile: 60,
              desktop: 80,
            ),
          ),
          colors: const [Color(0xff0CFF60), Color(0xff0091FB)],
        ),
        Text(
          'ON THE WEB',
          // Utiliza 60 para móvil y 80 para escritorio <====== #1
          style: ktsTitleText.copyWith(
            fontSize: getValueForScreenType<double>(
              context: context,
              mobile: 60,
              desktop: 80,
            ),
          ),
        ),
      ],
    );
  }
}
```

#### Usar Columna en móvil y Fila en escritorio

Abra el archivo `home_subtitle.dart`. Todos los cambios a continuación estarán en su función de construcción. También es bastante sencillo resolver esté requisito con el responsive builder. Sabemos que los hijos deben ser exactamente los mismos por lo que podemos almacenarlos en una lista.

```dart
final children = [
    Text(
        'Build amazing software, the right way.',
        style: ktsBodyLarge.copyWith(fontWeight: FontWeight.w600),
    ),
    GradientText(
        ' Sign up to be notified',
        style: ktsBodyLarge.copyWith(fontWeight: FontWeight.w600),
        colors: const [Color(0xff0CFF60), Color(0xff0091FB)],
    )
];
```

Y para devolver un diseño diferente para móvil y escritorio usamos el mismo `ScreenTypeLayout.builder`.

```dart
return ScreenTypeLayout.builder(
    mobile: (_) => Column(children: children),
    desktop: (_) => Row(children: children),
);
```

#### Alinear al centro a los hijos en el Título

Actualizar el `crossAxisAlignment` para devolver `.start` en escritorio y `.center` en móvil.

```dart
class HomeTitle extends StatelessWidget {
  const HomeTitle({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: getValueForScreenType<CrossAxisAlignment>(
        context: context,
        mobile: CrossAxisAlignment.center,
        desktop: CrossAxisAlignment.start,
      ),
      children: [
        ...
      ]
    );
  }
}
```

Y eso es literalmente lo fácil que es hacer adaptable la interfaz de usuario, hasta un nivel por widget usando el paquete `responsive_builer`.

La última cosa que hay que hacer es asegurarse de que el diseño de la tableta muestra el diseño de escritorio. Ejecuta la aplicación `flutter run -d chrome` y si cambias el ancho de tu navegador entre escritorio y móvil verás que usa el antiguo diseño de tableta en el camino a móvil. Para arreglar esto podemos abrir `home_view.dart` y quitar el constructor de tabletas.

```dart
class HomeView extends StackedView<HomeViewModel> {
  const HomeView({super.key});

  @override
  Widget builder(
    BuildContext context,
    HomeViewModel viewModel,
    Widget? child,
  ) {
    return ScreenTypeLayout.builder(
      mobile: (_) => const HomeViewMobile(),
      // <====== No más contructor de Tabletas
      desktop: (_) => const HomeViewDesktop(),
    );
  }
  ...
}
```

Por defecto `responsive_builder` prefiere el diseño móvil, por lo que las cosas se verán extrañas cuando cambies el tamaño de tu ventana de escritorio a móvil. Para pedir a `responsive_builder` que prefiera el escritorio cuando no hay otro diseño, todo lo que tenemos que hacer es abrir `main.dart` y pasar `preferDesktop:true`. Ahora verás que a medida que redimensiones tu UI permanecerá en escritorio, incluso cuando alcance el tamaño de tablet, y sólo cambiará a móvil cuando llegue a ese punto.

## Introducción a los formularios

Tenemos un campo de texto pero no lo hemos conectado a nada. Quiero darte una visión rápida de cómo funcionan los formularios en Stacked:

1. Decir a Stacked qué valores de texto vas a capturar
2. Extender el Mixin de formulario generado
3. Habilita la vinculación bidireccional. Esto sincroniza el valor tecleado con el ViewModel automáticamente 🔥.
4. Usa los valores en tu `ViewModel` como una propiedad heredada.

Vamos a implementar un formulario para obtener el email de los usuarios rápidamente. Abre `home_view.dart` donde añadiremos la funcionalidad de nuestro formulario.

```dart
// #1: Decir a Stacked qué valores de texto va a capturar
@FormView(fields: [FormTextField(name: 'email')])
class HomeView extends StackedView<HomeViewModel>
    with $HomeView { // #2: Extender el mixin del formulario generado

    ...
    @override
    void onViewModelReady(HomeViewModel viewModel) {
        // #3: Activar el enlace bidireccional
        syncFormWithViewModel(viewModel);
    }
}
```

Cuando hayas terminado ejecuta `stacked generate` y verás que se genera un nuevo fichero `home_view.form.dart`. Aquí es donde se almacena todo el código del formulario. Puedes importar ese archivo y verás que la mayoría de los errores desaparecen. Lo último que hay que hacer es actualizar el ViewModel, esto lo hacemos de la siguiente manera:

1. Extendiendo desde un FormViewModel
2. Usando el valor de email como se menciona arriba en #4.

Abre `home_viewmodel.dart`, puedes reemplazar el código con lo siguiente.

```dart
// #1: Extender desde FormViewModel
class HomeViewModel extends FormViewModel {
  final _dialogService = locator<DialogService>();

  void captureEmail() {
    _dialogService.showCustomDialog(
      variant: DialogType.infoAlert,
      title: 'Thanks for Signing Up',
      // #2: Utilizar emailValue como una propiedad normal
      description: 'Check in $emailValue for a verification email',
    );
  }
}
```

Eso es todo para la configuración del formulario. Lo siguiente que hay que hacer es conectar el formulario a la interfaz de usuario. En Flutter un `TextField` o `FormField` requiere un `TextEditingController` para realizar un seguimiento de lo que un usuario ha introducido. Tenemos que configurar el controlador donde usamos nuestro widget `InputField`. Esto significa unas cuantas actualizaciones para llevarlo al widget `InputField`.

1. Pasar el controlador a los diseños de escritorio y móvil
2. Actualizar los diseños de escritorio y móvil para aceptar el controlador
3. Pasar el controlador al campo de entrada en esos diseños
4. Llamar a la función de captura de correo electrónico cuando se pulse el botón NotifyButton

#### Pasar el controlador a los diseños de escritorio y móvil

Abrimos `home_view.dart` donde ya podemos pasar el `emailController` a los dos layouts.

```dart
@FormView(fields: [FormTextField(name: 'email')])
class HomeView extends StackedView<HomeViewModel> with $HomeView {
  HomeView({super.key});

  @override
  Widget builder(
    BuildContext context,
    HomeViewModel viewModel,
    Widget? child,
  ) {
    return ScreenTypeLayout.builder(
      mobile: (_) => HomeViewMobile(controller: emailController), // #1
      desktop: (_) => HomeViewDesktop(controller: emailController), // #1
    );
  }

  ...
}
```

Luego tenemos que actualizar los widgets de diseño para aceptar el `TextEditingController` y pasarlo al widget `InputField`.

```dart
// #2: Actualizar los diseños de escritorio y móvil para aceptar el controlador
class HomeViewDesktop extends ViewModelWidget<HomeViewModel> {
  final TextEditingController? controller;
  const HomeViewDesktop({super.key, this.controller});

   @override
  Widget build(BuildContext context, HomeViewModel viewModel) {
    return Scaffold(
      body: Center(
        child: SizedBox(
          child: Row(
            children: [
              Column(
                children: [
                  ...
                  Row(
                    children: [
                      // #3: Pasar el controlador al campo de entrada
                      InputField(controller: controller),
                      ...
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}
// #2: Pasar el controlador al diseño móvil
class HomeViewMobile extends ViewModelWidget<HomeViewModel> {
  final TextEditingController? controller;
  const HomeViewMobile({super.key, this.controller});

  @override
  Widget build(BuildContext context, HomeViewModel viewModel) {
    return Scaffold(

        body: ListView(
          children: [
            ...
            // #3: Pasar el controlador al campo de entrada
            InputField(controller: controller),
            ...
          ],
        ),
    );
  }
}
```

Y lo último que hay que hacer es llamar a la función `captureEmail` cuando se pulse el `NotifyButton`. Actualice su diseño móvil y de escritorio a lo siguiente donde se utiliza el NotifyButton.

```dart
...
HomeNotifyButton(onTap: viewModel.captureEmail),
...
```

A continuación, lo que vamos a hacer es ejecutar `stacked generate` para actualizar el código generado la última vez, luego, ejecute la aplicación de nuevo utilizando `flutter run -d chrome`. Ahora escriba un correo electrónico o cualquier cosa, a continuación, pulse el botón "Notify Me". Deberías ver un diálogo emergente con el valor que has escrito como el de abajo.

![Final Flutter Dialog on Web Screenshot](/assets/blog/tutorials/085/08-final-dialog-screenshot.jpg)

### Interfaz de usuario adicional

El cursor del ratón no cambia cuando pasas el ratón por encima de un botón. Para solucionarlo, simplemente añade `.showCursorOnHover` al final de tu código `NotifyButton` en el widget.

```dart
class HomeNotifyButton extends StatelessWidget {
  final Function()? onTap;
  const HomeNotifyButton({Key? key, this.onTap}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
       ...
      ),
    ).showCursorOnHover; // <===== Hover extension
  }
}
```

Stacked tiene algunas extensiones que puedes consultar en `lib/extensions/hover_extensions.dart`.

## Desplegar en Firebase

Y lo último que hay que hacer es desplegar a Firebase. Esto se ha vuelto mucho más fácil de lo que solía ser. Si tienes las herramientas de Firebase instaladas haz:

1. Ejecutar `firebase init`
2. Seleccionar la opción `Hosting: Configurar archivos para Firebase`
3. Seleccionar un proyecto existente o crea uno nuevo
4. Establecer tu directorio público como `build/web`
5. Responder `Sí` a la pregunta de la aplicación de una sola página

Y ya está. Ahora ejecutamos `flutter build web` y luego `firebase deploy --only hosting` y ya está listo 🚀. El video estará pronto, asegúrate de [suscribirte en YouTube](https://www.youtube.com/c/filledstacks?sub_confirmation=1).
