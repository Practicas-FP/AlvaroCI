import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/ui/screen/signInPage.dart';
import 'package:firebase_core/firebase_core.dart';
import 'app_controller.dart';
import 'package:flutter_rick_morty/environments/firebase_options.dart';
import 'package:flutter_rick_morty/main_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp(
    options: DefaultFirebaseOptions.currentPlatform,
  );
  runApp(const AppWidget());
}

class AppWidget extends StatelessWidget {
  const AppWidget({Key? key}) : super(key: key);

  @override
  Widget build(context) {
    return AnimatedBuilder(
      animation: AppController.instance,
      builder: (context, child) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
              primarySwatch: Colors.blue,
              brightness: AppController.instance.isDarkTheme
                  ? Brightness.dark
                  : Brightness.light),
          home: StreamBuilder(
              stream: FirebaseAuth.instance.authStateChanges(),
              builder: (context, snapshot)
              {
                if(snapshot.hasData){
                  return const MainPage();
                }else{
                  return const LoginPage();
                }
              }
          ),
        );
      },
    );
  }
}