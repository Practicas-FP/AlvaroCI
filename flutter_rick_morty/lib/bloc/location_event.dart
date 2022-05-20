part of 'location_bloc.dart';

@immutable
abstract class LocationEvent {
  const LocationEvent();
}

class LocationFetchEvent extends LocationEvent {
  const LocationFetchEvent();
}
