import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_rick_morty/widgets/characters_grid.dart';
import 'package:flutter_rick_morty/widgets/loading_grid.dart';
import 'package:flutter_rick_morty/widgets/server_error_message.dart';
import 'package:flutter_rick_morty/features/domain/entities/character_entity.dart';
import 'package:flutter_rick_morty/features/presentation/bloc/characters_list/characters_list_cubit.dart';
import 'package:flutter_rick_morty/views/charactersPage.dart';

class CharactersClass extends StatelessWidget {
  const CharactersClass({Key? key}) : super(key: key);

  void setupScrollController(BuildContext context) {
    scrollController.addListener(() {
      if (scrollController.position.atEdge) {
        if (scrollController.position.pixels != 0) {
          context.read<CharactersListCubit>().loadCharacters();
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    setupScrollController(context);

    return BlocBuilder<CharactersListCubit, CharactersListState>(builder: (context, state) {
      List<CharacterEntity> characters = [];

      bool isLoading = false;

      if (state is CharactersListLoading && state.isFirstFetch) {
        return const LoadingGrid();
      } else if (state is CharactersListLoading) {
        characters = state.oldCharacterList;
        isLoading = true;
      } else if (state is CharactersListLoaded) {
        characters = state.characterList;
      } else if (state is CharactersListError) {
        return ServerErrorMessage(errorMessage: state.errorMessage);
      }
      return CharactersView(isLoading: isLoading, characters: characters,);
    });
  }
}
