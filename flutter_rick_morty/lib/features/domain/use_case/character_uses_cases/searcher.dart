import 'package:dartz/dartz.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_rick_morty/features/domain/entities/character_entity.dart';
import 'package:flutter_rick_morty/features/domain/repository/character_repository.dart';
import 'package:flutter_rick_morty/features/data/repository/character_repository_impl.dart';
import 'package:flutter_rick_morty/features/domain/use_case/character_uses_cases/loader.dart';

class Searcher extends UseCase<List<CharacterEntity>, SearchCharacterParams> {
  final CharacterRepository searcherRepository;

  Searcher(this.searcherRepository);

  @override
  Future<Either<Failure, List<CharacterEntity>>> call(SearchCharacterParams params) async {
    return await searcherRepository.searchCharacter(params.name);
  }
}

class SearchCharacterParams extends Equatable {
  final String name;

  const SearchCharacterParams({required this.name});

  @override
  List<Object> get props => [name];
}