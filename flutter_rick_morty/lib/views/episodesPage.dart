import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

class EpidosdesPage extends StatefulWidget{
  const EpidosdesPage({Key? key}) : super(key: key);

  @override
  State<EpidosdesPage> createState() => _EpidosdesPageState();

}

class _EpidosdesPageState extends State<EpidosdesPage> {
  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: Text("Hello Episodes"),
    );
  }
}