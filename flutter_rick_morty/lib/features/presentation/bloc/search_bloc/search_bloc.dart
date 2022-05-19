import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutter_rick_morty/features/domain/entities/character_entity.dart';
import 'package:flutter_rick_morty/features/domain/use_case/character_uses_cases/searcher.dart';
part 'search_event.dart';
part 'search_state.dart';



class SearchBloc extends Bloc<SearchEvent, SearchState> {
  final Searcher searcher;

  SearchBloc({required this.searcher}) : super(SearchInitial()) {
    on<Search>(_onSearch);
  }

  _onSearch(Search event, Emitter<SearchState> emit) async {
    emit(SearchLoading());
    final responseFromRepository = await searcher(SearchCharacterParams(name: event.name));
    emit(
      responseFromRepository.fold(
        (failure) => const SearchError(errorMessage: ("failure")),
        (character) => SearchLoaded(characters: character),
      ),
    );
  }
}

