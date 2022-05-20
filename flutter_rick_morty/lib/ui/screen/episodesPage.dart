// ignore_for_file: file_names
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import '../../bloc/episode_bloc.dart';
import '../../repository/service/episode_service_impl.dart';
import '../widgets/episode_body.dart';

class EpisodesPage extends StatefulWidget{
  const EpisodesPage({Key? key}) : super(key: key);

  @override
  State<EpisodesPage> createState() => _EpisodesPageState();
}

class _EpisodesPageState extends State<EpisodesPage> {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) =>
      EpisodeBloc(episodeRepository: EpisodeServiceImplementation())
        ..add(const EpisodeFetchEvent()),
      child: Scaffold(
        appBar: AppBar(
          title: AutoSizeText(
            'WikiRick Episodes',
            style: Theme.of(context).textTheme.headline6,
            maxLines: 1,
          ),
        ),
        body: const EpisodeBody(),
      ),
    );
  }
}