import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/views/charactersPage.dart';
import 'package:flutter_rick_morty/widgets/character_card.dart';
import 'package:flutter_rick_morty/widgets/loading_characters.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_rick_morty/features/domain/entities/character_entity.dart';

class CharactersView extends StatelessWidget {
  List<CharacterEntity> characters;
  bool isLoading;

  CharactersView({Key? key, required this.isLoading, required this.characters}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SliverPadding(
        padding: const EdgeInsets.all(20),
        sliver: SliverGrid(
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            childAspectRatio: 0.48,
            mainAxisSpacing: 10.0,
            crossAxisSpacing: 10.0,
            crossAxisCount: 2,
          ),
          delegate: SliverChildBuilderDelegate(
            (BuildContext context, int index) {
              if (index < characters.length) {
                return CharacterCard(characters[index]);
              } else {
                Timer(const Duration(milliseconds: 48), () {
                  scrollController.jumpTo(scrollController.position.maxScrollExtent);
                });
                return const LoadingCharacters();
              }
            },
            childCount: characters.length + (isLoading ? 2 : 0),
          ),
        ));
  }
}
