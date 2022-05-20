part of 'location_bloc.dart';

@immutable
abstract class LocationState {
  const LocationState();
}

class LocationInitial extends LocationState {}

class LocationLoadingState extends LocationState {
  final String message;

  const LocationLoadingState({
    required this.message,
  });
}

class LocationSuccessState extends LocationState {
  final List<LocationModel> location;

  const LocationSuccessState({
    required this.location,
  });
}

class LocationErrorState extends LocationState {
  final String error;

  const LocationErrorState({
    required this.error,
  });
}
