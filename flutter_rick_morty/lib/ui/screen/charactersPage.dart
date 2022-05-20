// ignore_for_file: file_names
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_rick_morty/repository/service/character_service_impl.dart';
import 'package:flutter_rick_morty/ui/widgets/character_body.dart';
import 'package:flutter_rick_morty/bloc/character_bloc.dart';

final ScrollController scrollController = ScrollController();

class CharactersPage extends StatefulWidget{
  const CharactersPage({Key? key}) : super(key: key);

  @override
  State<CharactersPage> createState() => _CharactersPageState();
}

class _CharactersPageState extends State<CharactersPage> {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
      CharacterBloc(characterRepository: CharacterServiceImplementation())
        ..add(const CharacterFetchEvent()),
      child: Scaffold(
        appBar: AppBar(
          title: AutoSizeText(
            'WikiRick Characters',
            style: Theme.of(context).textTheme.headline6,
            maxLines: 1,
          ),
        ),
        body: const CharacterBody(),
      ),
    );
  }
}