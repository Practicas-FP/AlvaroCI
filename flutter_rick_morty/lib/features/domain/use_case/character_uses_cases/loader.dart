import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_rick_morty/features/domain/entities/character_entity.dart';
import 'package:flutter_rick_morty/features/domain/repository/character_repository.dart';
import 'package:flutter_rick_morty/features/data/repository/character_repository_impl.dart';

class Loader extends UseCase<List<CharacterEntity>, PageCharacterParams> {
  final CharacterRepository loaderRepository;

  Loader(this.loaderRepository);

  @override
  Future<Either<Failure, List<CharacterEntity>>> call(PageCharacterParams params) async {
    return await loaderRepository.loadAllCharacters(params.page);
  }
}

class PageCharacterParams extends Equatable {
  final int page;

  const PageCharacterParams({required this.page});

  @override
  List<Object> get props => [page];
}


abstract class UseCase<Type, Params> {
  Future<Either<Failure, Type>> call(Params params);
}