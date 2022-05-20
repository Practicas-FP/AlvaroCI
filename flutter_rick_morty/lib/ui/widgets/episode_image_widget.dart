import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/ui/widgets/widget_utils.dart';

class EpisodeImageWidget extends StatelessWidget {
  final String episodeImage;
  final double radiusImage;

  const EpisodeImageWidget({
    Key? key,
    required this.episodeImage,
    this.radiusImage = 30,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      radius: radiusImage,
      child: ClipOval(
        child: CachedNetworkImage(
          imageUrl: episodeImage,
          placeholder: (context, url) =>
              WidgetUtils.buildCircularProgressIndicator(context),
          errorWidget: (context, url, error) => CircleAvatar(
            radius: radiusImage,
            child: const ClipOval(
              child: Image(
                fit: BoxFit.cover,
                image: AssetImage('assets/images/drawer.jpg'),
              ),
            ),
          ),
        ),
      ),
      backgroundColor: Theme.of(context).colorScheme.primary,
    );
  }
}
