import 'package:flutter/material.dart';
import 'package:animations/animations.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_rick_morty/ui/widgets/widget_utils.dart';
import 'package:flutter_rick_morty/repository/model/character_model.dart';
import 'package:flutter_rick_morty/bloc/character_bloc.dart';
import 'package:flutter_rick_morty/ui/widgets/character_image_widget.dart';
import 'package:flutter_rick_morty/ui/screen/character_details.dart';

import '../../bloc/episode_bloc.dart';
import '../../repository/model/episode_model.dart';
import '../screen/episode_details.dart';
import 'episode_image_widget.dart';

class EpisodeBody extends StatefulWidget {
  const EpisodeBody({Key? key}) : super(key: key);

  @override
  _EpisodeBodyState createState() => _EpisodeBodyState();
}

class _EpisodeBodyState extends State<EpisodeBody> {
  final List<EpisodeModel> _episodes = [];
  final ScrollController _scrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return Center(
      child: BlocConsumer<EpisodeBloc, EpisodeState>(
        listener: (context, episodeState) {
          // Loading Data.
          if (episodeState is EpisodeLoadingState) {
            ScaffoldMessenger.of(context).clearSnackBars();
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: WidgetUtils.buildInfoText(
                  text: episodeState.message,
                  context: context,
                  size: size,
                  color: Colors.black,
                  textAlign: TextAlign.center,
                ),
              ),
            );
            // Get Data, end of the list.
          } else if (episodeState is EpisodeSuccessState &&
              episodeState.episode.isEmpty) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: WidgetUtils.buildInfoText(
                  text: 'No more episodes',
                  context: context,
                  size: size,
                  color: Colors.black,
                  textAlign: TextAlign.center,
                ),
              ),
            );
            // Get Data Error.
          } else if (episodeState is EpisodeErrorState) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: WidgetUtils.buildInfoText(
                  text: episodeState.error,
                  context: context,
                  size: size,
                  color: Colors.black,
                  textAlign: TextAlign.center,
                ),
              ),
            );
          }
          return;
        },
        builder: (context, episodeState) {
          // Loading Data
          if (episodeState is EpisodeInitial ||
              episodeState is EpisodeLoadingState && _episodes.isEmpty) {
            return WidgetUtils.buildCircularProgressIndicator(context);
            // Add the fetched data to the list.
          } else if (episodeState is EpisodeSuccessState) {
            _episodes.addAll(episodeState.episode);
            ScaffoldMessenger.of(context).clearSnackBars();
            // Error View.
          } else if (episodeState is EpisodeErrorState &&
              _episodes.isEmpty) {
            return Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                // Reload recuest.
                IconButton(
                  iconSize: size.width / 5,
                  color: Theme.of(context).colorScheme.secondary,
                  splashColor: Theme.of(context).colorScheme.background,
                  tooltip: "Try to fetch the data.",
                  onPressed: () {
                    BlocProvider.of<EpisodeBloc>(context)
                        .add(const EpisodeFetchEvent());
                  },
                  icon: const Icon(
                    Icons.refresh,
                  ),
                ),
                // Show text error.
                const SizedBox(height: 15),
                WidgetUtils.buildInfoText(
                  text: episodeState.error,
                  context: context,
                  size: size,
                  textAlign: TextAlign.center,
                ),
              ],
            );
          }
          return ListView.separated(
            controller: _scrollController
              ..addListener(() {
                if (_scrollController.offset ==
                        _scrollController.position.maxScrollExtent &&
                    !BlocProvider.of<EpisodeBloc>(context).isFetching) {
                  BlocProvider.of<EpisodeBloc>(context).fetch();
                }
              }),
            itemBuilder: (context, index) {
              return _buildOpenContainer(index, size);
            },
            separatorBuilder: (context, index) => const SizedBox(height: 10),
            itemCount: _episodes.length,
          );
        },
      ),
    );
  }

  _buildOpenContainer(int index, Size size) {
    return Padding(
      padding: const EdgeInsets.all(3.0),
      child: OpenContainer(
        transitionDuration: const Duration(milliseconds: 500),
        transitionType: ContainerTransitionType.fadeThrough,
        closedBuilder: (context, action) => _buildClosed(index, size),
        openBuilder: (context, action) => _buildOpen(index),
        closedColor: Theme.of(context).colorScheme.primary,
        middleColor: Theme.of(context).colorScheme.background,
      ),
    );
  }

  // Tile that shows the list of characters.
  _buildClosed(int index, Size size) {
    return Card(
      child: ListTile(
        // episode Image Avatar.
        leading: EpisodeImageWidget(
          episodeImage: 'assets/images/drawer.jpg',
        ),
        // episode Name.
        title: WidgetUtils.buildInfoText(
          text: _episodes[index].name,
          context: context,
          size: size,
          maxLines: 1,
        ),
      ),
    );
  }

  // Shows the Detail Screen of the selected character.
  _buildOpen(int index) {
    return EpisodeDetails(episode: _episodes[index]);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }
}
