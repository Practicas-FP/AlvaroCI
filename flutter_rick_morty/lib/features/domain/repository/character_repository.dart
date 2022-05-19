import 'package:dartz/dartz.dart';
import 'package:flutter_rick_morty/features/data/repository/character_repository_impl.dart';
import 'package:flutter_rick_morty/features/domain/entities/character_entity.dart';

abstract class CharacterRepository {
  Future<Either<Failure, List<CharacterEntity>>> loadAllCharacters(int page);
  Future<Either<Failure, List<CharacterEntity>>> searchCharacter(String name);
}