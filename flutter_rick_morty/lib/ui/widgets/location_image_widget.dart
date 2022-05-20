import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/ui/widgets/widget_utils.dart';

class LocationImageWidget extends StatelessWidget {
  final String locationImage;
  final double radiusImage;

  const LocationImageWidget({
    Key? key,
    required this.locationImage,
    this.radiusImage = 30,
  }) : super(key: key);
  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      radius: radiusImage,
      backgroundColor: Theme.of(context).colorScheme.primary,
      child: ClipOval(
        child: CachedNetworkImage(
          imageUrl: locationImage,
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
    );
  }
}
