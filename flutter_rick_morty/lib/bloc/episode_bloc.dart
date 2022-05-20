// ignore_for_file: depend_on_referenced_packages

import 'package:bloc/bloc.dart';
import 'package:meta/meta.dart';
import 'package:flutter_rick_morty/repository/model/episode_model.dart';
import '../repository/service/episode_service.dart';
part 'episode_event.dart';
part 'episode_state.dart';

class EpisodeBloc extends Bloc<EpisodeEvent, EpisodeState> {
  final EpisodeService episodeRepository;
  int page = 1;
  bool isFetching = false;

  EpisodeBloc({
    required this.episodeRepository,
  }) : super(EpisodeInitial());

  void fetch() {
    isFetching = true;
    add(const EpisodeFetchEvent());
  }

  @override
  Stream<EpisodeState> mapEventToState(EpisodeEvent event) async* {
    if (event is EpisodeFetchEvent) {
      try {
        yield const EpisodeLoadingState(message: 'Loading Episodes');
        isFetching = true;
        final response = await episodeRepository.getAllEpisodes(page);
        isFetching = false;
        yield EpisodeSuccessState(
          episode: response.toList(),
        );
        page++;
      } on Exception catch (exc) {
        isFetching = false;
        yield EpisodeErrorState(
          error: exc.toString().replaceAll("Exception: ", ""),
        );
      }
    }
  }
}
