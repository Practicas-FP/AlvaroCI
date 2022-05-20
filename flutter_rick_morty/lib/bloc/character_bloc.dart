import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import 'package:flutter_rick_morty/repository/model/character_model.dart';
import 'package:flutter_rick_morty/repository/service/character_service.dart';
part 'character_event.dart';
part 'character_state.dart';

class CharacterBloc extends Bloc<CharacterEvent, CharacterState> {
  final CharacterService characterRepository;
  int page = 1;
  bool isFetching = false;

  CharacterBloc({
    required this.characterRepository,
  }) : super(CharacterInitial());

  void fetch() {
    isFetching = true;
    add(const CharacterFetchEvent());
  }

  @override
  Stream<CharacterState> mapEventToState(CharacterEvent event) async* {
    if (event is CharacterFetchEvent) {
      try {
        yield const CharacterLoadingState(message: 'Loading Characters');
        isFetching = true;
        final response = await characterRepository.getAllCharacters(page);
        isFetching = false;
        yield CharacterSuccessState(
          character: response.toList(),
        );
        page++;
      } on Exception catch (exc) {
        isFetching = false;
        yield CharacterErrorState(
          error: exc.toString().replaceAll("Exception: ", ""),
        );
      }
    }
  }
}
