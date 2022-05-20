// ignore_for_file: depend_on_referenced_packages

import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import 'package:flutter_rick_morty/repository/model/location_model.dart';
import '../repository/service/location_service.dart';
part 'location_event.dart';
part 'location_state.dart';

class LocationBloc extends Bloc<LocationEvent, LocationState> {
  final LocationService locationRepository;
  int page = 1;
  bool isFetching = false;

  LocationBloc({
    required this.locationRepository,
  }) : super(LocationInitial());

  void fetch() {
    isFetching = true;
    add(const LocationFetchEvent());
  }

  @override
  Stream<LocationState> mapEventToState(LocationEvent event) async* {
    if (event is LocationFetchEvent) {
      try {
        yield const LocationLoadingState(message: 'Loading Locations');
        isFetching = true;
        final response = await locationRepository.getAllLocations(page);
        isFetching = false;
        yield LocationSuccessState(
          location: response.toList(),
        );
        page++;
      } on Exception catch (exc) {
        isFetching = false;
        yield LocationErrorState(
          error: exc.toString().replaceAll("Exception: ", ""),
        );
      }
    }
  }
}
