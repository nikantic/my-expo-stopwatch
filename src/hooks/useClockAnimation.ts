import { useEffect } from "react";
import {
	useSharedValue,
	withTiming,
	withRepeat,
	Easing,
	cancelAnimation,
	useAnimatedProps,
} from "react-native-reanimated";
import { withPause } from "react-native-redash";
import { CLOCK_TYPES } from "../config/types";

const useClockAnimation = ({
	type,
	play,
	reset,
	length,
	duration,
}: {
	type: CLOCK_TYPES;
	play: boolean;
	reset: boolean;
	length: number;
	duration: number;
}) => {
	const animPaused = useSharedValue(true);
	const animStroke = useSharedValue(
		type === CLOCK_TYPES.STOPWATCH ? length : 0
	);
	const animProps = useAnimatedProps(() => {
		return {
			strokeDashoffset: animStroke.value,
		};
	}, [animStroke.value]);

	const initAnimation = () => {
		animStroke.value = withPause(
			withRepeat(
				withTiming(type === CLOCK_TYPES.STOPWATCH ? 0 : length, {
					duration,
					easing: Easing.linear,
				}),
				type === CLOCK_TYPES.STOPWATCH ? -1 : 1
			),
			animPaused
		);
	};

	const resetAnimation = () => {
		animPaused.value = !play;
		animStroke.value = withTiming(
			type === CLOCK_TYPES.STOPWATCH ? length : 0,
			{
				duration: 100,
			},
			initAnimation
		);
	};

	useEffect(() => {
		initAnimation();
		return () => cancelAnimation(animStroke);
	}, []);

	useEffect(() => {
		animPaused.value = !play;
	}, [play]);

	useEffect(() => {
		if (reset) {
			resetAnimation();
		}
	}, [reset]);

	return {
		animProps,
	};
};

export default useClockAnimation;