import 'package:flutter/material.dart';

class AppController extends ChangeNotifier {
  static AppController instance = AppController();

  bool isDarkTheme = false;

  changeTheme() {
    if(isDarkTheme = !isDarkTheme){
      isDarkTheme = true;
    }else{
      isDarkTheme = false;
    }
    notifyListeners();
  }
}