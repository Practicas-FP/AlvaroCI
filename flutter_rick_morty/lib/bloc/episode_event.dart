part of 'episode_bloc.dart';

@immutable
abstract class EpisodeEvent {
  const EpisodeEvent();
}

class EpisodeFetchEvent extends EpisodeEvent {
  const EpisodeFetchEvent();
}
