import '../model/episode_model.dart';

abstract class EpisodeService {
  Future<List<EpisodeModel>> getAllEpisodes(int page);
}
