# flutter_web_preloader

[![Powered by Mason](https://img.shields.io/endpoint?url=https%3A%2F%2Ftinyurl.com%2Fmason-badge)](https://github.com/felangel/mason)

A brick that creates a smart web entrypoint for Flutter and preloads any type of asset before starting an app.

_Generated by [mason][1] 🧱_

## Flutter Web Preloader

This brick will override the default `web/index.html` that is created with a web Flutter project.

The `index.html` file generated by this brick will add additional JavaScript code
in order to preload assets used by the Flutter app. This ensures that when the app is
presented to the user, the assets are already cached by the browser and prevents
the application from loading piece by piece.

While the assets are being preloaded, a progress bar will be presented
to the user.

To customize the progress bar, look for the `div` with the id `progress-indicator` in the generated
`web/index.html`, its style can be changed so it can have the desired look.

## Variables

 - `project_title`: The title of the project (defaults to the value on the `pubspec.yaml`).
 - `project_description`: The project description (defaults to the `name` attribute in the `pubspec.yaml`).
 - `batch_size`: How match assets will be loaded at the same time (defaults to `20`).
 - `canvaskit`: If the app uses `canvaskit` mode or not (defaults to `true`).



[1]: https://github.com/felangel/mason
