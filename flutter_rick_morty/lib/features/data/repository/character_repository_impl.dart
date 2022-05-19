import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';

import 'package:flutter_rick_morty/features/data/data_sources/character_local_data_source.dart';
import 'package:flutter_rick_morty/features/data/data_sources/character_remote_data_source.dart';
import 'package:flutter_rick_morty/features/data/models/character_model.dart';
import 'package:flutter_rick_morty/features/domain/entities/character_entity.dart';
import 'package:flutter_rick_morty/features/domain/repository/character_repository.dart';
import 'package:flutter_rick_morty/features/network_info.dart';

class CharacterRepositoryImpl implements CharacterRepository {
  final CharacterRemoteDataSource remoteDataSource;
  final CharacterLocalDataSource localDataSource;
  final NetworkInfo networkInfo;

  CharacterRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required this.networkInfo,
  });

  @override
  Future<Either<Failure, List<CharacterEntity>>> loadAllCharacters(int page) async {
    return _getCharacters(() {
      return remoteDataSource.loadAllCharacters(page);
    });
  }

  @override
  Future<Either<Failure, List<CharacterEntity>>> searchCharacter(String name) {
    return _getCharacters(() {
      return remoteDataSource.searchCharacter(name);
    });
  }

  Future<Either<Failure, List<CharacterModel>>> _getCharacters(Function() getCharacters) async {
    if (await networkInfo.isConnected) {
      try {
        final remoteCharacters = await getCharacters();
        localDataSource.charactersToCache(remoteCharacters);
        return Right(remoteCharacters);
      } catch(e) {
        return Left(ServerFailure());
      }
    } else {
      try {
        final localCharacters = await localDataSource.getCharacterFromCache();
        return Right(localCharacters);
      } catch(e) {
        return Left(CacheFailure());
      }
    }
  }
}
abstract class Failure extends Equatable {
  @override
  List<Object> get props => [];
}

class ServerFailure extends Failure {}

class CacheFailure extends Failure {}