// ignore_for_file: file_names
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../../bloc/location_bloc.dart';
import '../../repository/service/location_service_impl.dart';
import '../widgets/location_body.dart';

class LocationPage extends StatefulWidget{
  const LocationPage({Key? key}) : super(key: key);

  @override
  State<LocationPage> createState() => _LocationPageState();

}

class _LocationPageState extends State<LocationPage> {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
      LocationBloc(locationRepository: LocationServiceImplementation())
        ..add(const LocationFetchEvent()),
      child: Scaffold(
        appBar: AppBar(
          title: AutoSizeText(
            'WikiRick Locations',
            style: Theme.of(context).textTheme.headline6,
            maxLines: 1,
          ),
        ),
        body: const LocationBody(),
      ),
    );
  }
}