// ignore_for_file: library_private_types_in_public_api

import 'package:flutter/material.dart';
import 'package:animations/animations.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_rick_morty/ui/widgets/widget_utils.dart';
import '../../bloc/location_bloc.dart';
import '../../repository/model/location_model.dart';
import '../screen/location_details.dart';
import 'location_image_widget.dart';

class LocationBody extends StatefulWidget {
  const LocationBody({Key? key}) : super(key: key);

  @override
  _LocationBodyState createState() => _LocationBodyState();
}

class _LocationBodyState extends State<LocationBody> {
  final List<LocationModel> _locations = [];
  final ScrollController _scrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    final Size size = MediaQuery.of(context).size;
    return Center(
      child: BlocConsumer<LocationBloc, LocationState>(
        listener: (context, locationState) {
          // Loading Data.
          if (locationState is LocationLoadingState) {
            ScaffoldMessenger.of(context).clearSnackBars();
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: WidgetUtils.buildInfoText(
                  text: locationState.message,
                  context: context,
                  size: size,
                  color: Colors.black,
                  textAlign: TextAlign.center,
                ),
              ),
            );
            // Get Data, end of the list.
          } else if (locationState is LocationSuccessState &&
              locationState.location.isEmpty) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: WidgetUtils.buildInfoText(
                  text: 'No more locations',
                  context: context,
                  size: size,
                  color: Colors.black,
                  textAlign: TextAlign.center,
                ),
              ),
            );
            // Get Data Error.
          } else if (locationState is LocationErrorState) {
            ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(
                content: WidgetUtils.buildInfoText(
                  text: locationState.error,
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
        builder: (context, locationState) {
          // Loading Data
          if (locationState is LocationInitial ||
              locationState is LocationLoadingState && _locations.isEmpty) {
            return WidgetUtils.buildCircularProgressIndicator(context);
            // Add the fetched data to the list.
          } else if (locationState is LocationSuccessState) {
            _locations.addAll(locationState.location);
            ScaffoldMessenger.of(context).clearSnackBars();
            // Error View.
          } else if (locationState is LocationErrorState &&
              _locations.isEmpty) {
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
                    BlocProvider.of<LocationBloc>(context)
                        .add(const LocationFetchEvent());
                  },
                  icon: const Icon(
                    Icons.refresh,
                  ),
                ),
                // Show text error.
                const SizedBox(height: 15),
                WidgetUtils.buildInfoText(
                  text: locationState.error,
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
                    !BlocProvider.of<LocationBloc>(context).isFetching) {
                  BlocProvider.of<LocationBloc>(context).fetch();
                }
              }),
            itemBuilder: (context, index) {
              return _buildOpenContainer(index, size);
            },
            separatorBuilder: (context, index) => const SizedBox(height: 10),
            itemCount: _locations.length,
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

  // Tile that shows the list of locations.
  _buildClosed(int index, Size size) {
    return Card(
      child: ListTile(
        // episode Image Avatar.
        leading: const LocationImageWidget(
          locationImage: 'assets/images/drawer.jpg',
        ),
        // episode Name.
        title: WidgetUtils.buildInfoText(
          text: _locations[index].name,
          context: context,
          size: size,
          maxLines: 1,
        ),
      ),
    );
  }

  // Shows the Detail Screen of the selected location.
  _buildOpen(int index) {
    return LocationDetails(location: _locations[index]);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }
}
