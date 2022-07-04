import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, StyleProp, ViewStyle } from "react-native";

import COLORS from "../config/colors";
import useCounter from "../hooks/useCounter";
import { formatNumber } from "../helpers/helpers";
import BigClock from "./BigClock";
import { CLOCK_TYPES } from "../config/types";

export default function Counter({
	play,
	reset,
	style,
}: {
	play: boolean;
	reset: boolean;
	style?: ViewStyle;
}) {
	const counter = useCounter();
	const formattedTime = `${formatNumber(counter.time.minutes)} : ${formatNumber(
		counter.time.seconds
	)} : ${formatNumber(counter.time.miliseconds)}`;

	useEffect(() => {
		play ? counter.controls.start() : counter.controls.stop();
	}, [play]);

	useEffect(() => {
		if (reset) {
			counter.controls.reset();
		}
	}, [reset]);

	return (
		<View style={style}>
			<Text style={styles.text}>{formattedTime}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	text: {
		color: COLORS.WHITE,
		fontSize: 27,
		fontFamily: "monospace",
	},
});
