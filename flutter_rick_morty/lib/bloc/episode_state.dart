part of 'episode_bloc.dart';

@immutable
abstract class EpisodeState {
  const EpisodeState();
}

class EpisodeInitial extends EpisodeState {}

class EpisodeLoadingState extends EpisodeState {
  final String message;

  const EpisodeLoadingState({
    required this.message,
  });
}

class EpisodeSuccessState extends EpisodeState {
  final List<EpisodeModel> episode;

  const EpisodeSuccessState({
    required this.episode,
  });
}

class EpisodeErrorState extends EpisodeState {
  final String error;

  const EpisodeErrorState({
    required this.error,
  });
}
