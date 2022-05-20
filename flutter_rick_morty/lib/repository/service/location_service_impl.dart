// ignore_for_file: depend_on_referenced_packages

import 'package:flutter_rick_morty/repository/api_constants.dart';
import 'package:flutter_rick_morty/repository/model/location_model.dart';
import 'location_service.dart';
import 'package:dio/dio.dart';

class LocationServiceImplementation extends LocationService {
  static final Dio _dio = Dio();

  @override
  Future<List<LocationModel>> getAllLocations(int page) async {
    try {
      List<Map<String, dynamic>> allEntities = [];

      // Get object info and pagination.
      var response = await _dio.get('${ApiConstants.baseURL}'
          '${ApiConstants.locationEndpoint}'
          '${ApiConstants.pageEndpoint}$page');

      allEntities
          .addAll(List<Map<String, dynamic>>.from(response.data["results"]));

      return List<LocationModel>.from(
          allEntities.map((x) => LocationModel.fromJson(x)));
    } on DioError catch (exc) {
      if (exc.response != null) {
        if (exc.response!.statusCode == 404) {
          throw Exception("You have reached the end of the location list.");
        } else {
          throw Exception("${exc.response!.statusCode}: ${exc.response!.statusMessage}");
        }
      } else {
        throw Exception("Couldn't fetch location. Is the device online?");
      }
    }
  }
}