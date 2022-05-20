import '../model/location_model.dart';

abstract class LocationService {
  Future<List<LocationModel>> getAllLocations(int page);
}
