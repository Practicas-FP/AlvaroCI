import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_rick_morty/features/domain/entities/character_entity.dart';
import 'package:flutter_rick_morty/features/domain/use_case/character_uses_cases/loader.dart';
part 'characters_list_state.dart';

class CharactersListCubit extends Cubit<CharactersListState> {
  final Loader loader;

  CharactersListCubit({required this.loader}) : super(CharactersListInitial());

  var page = 1;

  Future<void> loadCharacters() async {
    final currentState = state;

    var oldCharacterList = <CharacterEntity>[];

    if (currentState is CharactersListLoading) {
      return;
    }

    if (currentState is CharactersListLoaded) {
      oldCharacterList = currentState.characterList;
    }

    emit(CharactersListLoading(oldCharacterList, isFirstFetch: page == 1));

    final responseFromRepository = await loader(PageCharacterParams(page: page));
    responseFromRepository.fold(
      (failure) => emit( CharactersListError(errorMessage:("failure"))),
      (character) {
          page++;
        final characters = (state as CharactersListLoading).oldCharacterList;
        characters.addAll(character);
          emit(
            CharactersListLoaded(characters),

          );
      },
    );
  }
}
