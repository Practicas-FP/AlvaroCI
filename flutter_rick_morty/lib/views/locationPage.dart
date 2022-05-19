import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class LocationPage extends StatefulWidget{
  const LocationPage({Key? key}) : super(key: key);

  @override
  State<LocationPage> createState() => _LocationPageState();

}

class _LocationPageState extends State<LocationPage> {
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Text("Hello Locations"),
    );
  }
}