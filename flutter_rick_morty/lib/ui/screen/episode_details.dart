import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_rick_morty/ui/widgets/widget_utils.dart';
import '../../repository/model/episode_model.dart';
import '../widgets/episode_image_widget.dart';

class EpisodeDetails extends StatelessWidget {
  final EpisodeModel episode;
  const EpisodeDetails({Key? key, required this.episode}) : super(key: key);

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

                  // episode Name.
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 8.0),
                    child: AutoSizeText(
                      episode.name,
                      style: Theme.of(context).textTheme.headline6?.copyWith(
                        fontSize: size.width / 9,
                      ),
                      maxLines: 1,
                    ),
                  ),

                  SizedBox(height: sizeBoxHeight),

                  AutoSizeText(
                    'Episode Details',
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
                    text: episode.name,
                    context: context,
                    size: size,
                    maxLines: 1,
                  ),

                  // Species Info.
                  SizedBox(height: sizeBoxHeight),
                  WidgetUtils.buildIndicatorText('Air date:', context, size),
                  WidgetUtils.buildInfoText(
                    text: episode.airDate,
                    context: context,
                    size: size,
                    maxLines: 1,
                  ),

                  // Last known location Info.
                  SizedBox(height: sizeBoxHeight),
                  WidgetUtils.buildIndicatorText(
                      'Episode:', context, size),
                  WidgetUtils.buildInfoText(
                    text: episode.episode,
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
