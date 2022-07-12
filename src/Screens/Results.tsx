import React, { useContext, useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	FlatList,
	TouchableWithoutFeedback,
} from "react-native";
import Button from "../components/Button";

import ResultsItem from "../components/ResultsItem";
import COLORS from "../config/colors";
import AppContext from "../config/context";
import { BUTTON_TYPES } from "../config/types";

export default function Results() {
	const { saved, controls } = useContext(AppContext);
	const [sorted, setSorted] = useState(false);
	const normalSaved =
		saved &&
		[...saved].map((item, index) => {
			return {
				position: index,
				start: item,
				time: index - 1 < 0 ? item : saved[index] - saved[index - 1],
			};
		});
	const fastestSaved =
		normalSaved && [...normalSaved].sort((a, b) => a.time - b.time);

	return (
		<View style={styles.container}>
			<View style={styles.tableGroup}>
				<View style={styles.header}>
					<View style={styles.position}>
						<Text style={styles.headerText}>Pos</Text>
					</View>
					<View style={[styles.time, !sorted && styles.active]}>
						<TouchableWithoutFeedback onPress={() => setSorted(false)}>
							<Text style={styles.headerText}>Start</Text>
						</TouchableWithoutFeedback>
					</View>
					<View style={[styles.time, sorted && styles.active]}>
						<TouchableWithoutFeedback onPress={() => setSorted(true)}>
							<Text style={styles.headerText}>Time</Text>
						</TouchableWithoutFeedback>
					</View>
				</View>
				<FlatList
					showsVerticalScrollIndicator={false}
					data={sorted ? fastestSaved : normalSaved}
					renderItem={({ item }) => (
						<ResultsItem
							start={item.start}
							time={item.time}
							index={item.position}
						/>
					)}
					keyExtractor={(item) => item.position.toString()}
				/>
			</View>
			<View style={styles.buttonGroup}>
				<View style={styles.button}>
					<Button
						type={BUTTON_TYPES.TEXT}
						color={COLORS.MAIN}
						size={50}
						onPress={() => setSorted((sorted) => !sorted)}
						text="Sort"
					/>
				</View>
				<View style={styles.button}>
					<Button
						type={BUTTON_TYPES.TEXT}
						color={COLORS.INACTIVE}
						size={50}
						onPress={() => controls.openModal && controls.openModal(false)}
						text="Close"
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 5,
		maxWidth: 500,
		width: "80%",
	},
	tableGroup: {
		flex: 3,
	},
	buttonGroup: {
		flex: 1,
		flexDirection: "row",
	},
	button: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		marginTop: 10,
	},
	headerText: {
		color: COLORS.GRAY,
		fontSize: 16,
		textAlign: "center",
		textTransform: "uppercase",
	},
	position: {
		flex: 1,
		borderWidth: 1,
		width: 50,
		paddingHorizontal: 7,
		paddingVertical: 5,
	},
	time: {
		flex: 2,
		borderWidth: 1,
		borderBottomWidth: 2,
		paddingHorizontal: 7,
		paddingVertical: 5,
	},
	active: {
		borderBottomColor: COLORS.MAIN,
		borderBottomWidth: 2,
	},
});
