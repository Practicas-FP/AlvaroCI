import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/repository/model/character_model.dart';
import 'package:flutter_rick_morty/ui/widgets/character_image_widget.dart';
import 'package:flutter_rick_morty/ui/widgets/widget_utils.dart';

import '../../repository/model/episode_model.dart';
import '../../repository/model/location_model.dart';
import '../widgets/episode_image_widget.dart';

class LocationDetails extends StatelessWidget {
  final LocationModel location;
  const LocationDetails({Key? key, required this.location}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    final double sizeBoxHeight = size.height / 120;
    return Scaffold(
      body: SafeArea(
        child: Container(
          color: Theme.of(context).colorScheme.background,
          child: Stack(
            children: [
              Column(
                children: [
                  Container(
                    decoration: const BoxDecoration(
                      image: DecorationImage(
                        image: AssetImage('assets/images/detail_view.jpg'),
                        fit: BoxFit.fill,
                      ),
                    ),
                    child: _buildEpisodeImage('assets/images/drawer.jpg', size),
                  ),
                  SizedBox(
                    height: size.height / 12,
                  ),

                  // location Name.
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0),
                    child: AutoSizeText(
                      location.name,
                      style: Theme.of(context).textTheme.headline6?.copyWith(
                        fontSize: size.width / 9,
                      ),
                      maxLines: 1,
                    ),
                  ),

                  SizedBox(height: sizeBoxHeight),

                  AutoSizeText(
                    'Locations Details',
                    style: Theme.of(context).textTheme.subtitle1?.copyWith(
                      fontSize: size.width / 14,
                      decoration: TextDecoration.underline,
                      decorationThickness: 2,
                      decorationColor:
                      Theme.of(context).colorScheme.secondary,
                    ),
                  ),

                  // Gender Info.
                  WidgetUtils.buildIndicatorText('Name:', context, size),
                  WidgetUtils.buildInfoText(
                    text: location.name,
                    context: context,
                    size: size,
                    maxLines: 1,
                  ),

                  // Species Info.
                  SizedBox(height: sizeBoxHeight),
                  WidgetUtils.buildIndicatorText('Type:', context, size),
                  WidgetUtils.buildInfoText(
                    text: location.type,
                    context: context,
                    size: size,
                    maxLines: 1,
                  ),

                  // Last known location Info.
                  SizedBox(height: sizeBoxHeight),
                  WidgetUtils.buildIndicatorText(
                      'Dimension:', context, size),
                  WidgetUtils.buildInfoText(
                    text: location.dimension,
                    context: context,
                    size: size,
                    maxLines: 1,
                  ),
                ],
              ),
              const Positioned(
                top: 5,
                left: 5,
                child: BackButton(color: Colors.white),
              ),
            ],
          ),
        ),
      ),
    );
  }

  }
  _buildEpisodeImage(
      String episodeImage,
      Size size,
      ) {
    return SizedBox(
      width: double.infinity,
      height: size.height / 3.2,
      child: Container(
        alignment: const Alignment(0.0, 2.5),
        child: EpisodeImageWidget(
          episodeImage: episodeImage,
          radiusImage: size.height / 10,
        ),
      ),
    );
  }
