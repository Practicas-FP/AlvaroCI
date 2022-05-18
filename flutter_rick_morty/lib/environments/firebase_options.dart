import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      throw UnsupportedError(
        'DefaultFirebaseOptions have not been configured for web - '
        'you can reconfigure this by running the FlutterFire CLI again.',
      );
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
        return android;
      case TargetPlatform.iOS:
        return ios;
      case TargetPlatform.macOS:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for macos - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.windows:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for windows - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      case TargetPlatform.linux:
        throw UnsupportedError(
          'DefaultFirebaseOptions have not been configured for linux - '
          'you can reconfigure this by running the FlutterFire CLI again.',
        );
      default:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions android = FirebaseOptions(
    apiKey: 'AIzaSyAaeaESE71HMlkIjPu5CJr4oNVaJP8Pg4U',
    appId: '1:172211510066:android:5213da20b65539af34d52b',
    messagingSenderId: '172211510066',
    projectId: 'rick-y-morty-a7274',
    storageBucket: 'rick-y-morty-a7274.appspot.com',
  );

  static const FirebaseOptions ios = FirebaseOptions(
    apiKey: 'AIzaSyAnhBVPNtT0gQaxRUPZOoz976Hd5WQaSbU',
    appId: '1:172211510066:ios:873245466732d89034d52b',
    messagingSenderId: '172211510066',
    projectId: 'rick-y-morty-a7274',
    storageBucket: 'rick-y-morty-a7274.appspot.com',
    iosClientId: '172211510066-66f7mop8230l6deburh028iailq0fun5.apps.googleusercontent.com',
    iosBundleId: 'com.RickMorty.flutterRickMorty',
  );
}
