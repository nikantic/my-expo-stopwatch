import React, { useState } from "react";
import { View, StyleSheet, Modal, Text } from "react-native";

import COLORS from "../config/colors";

export default function ModalWrapper({
	open,
	heading,
	children,
}: {
	open: boolean;
	heading: string;
	children: JSX.Element;
}) {
	return (
		<Modal transparent animationType="slide" visible={open}>
			<View style={styles.modalView}>
				<Text style={styles.heading}>{heading}</Text>
				<View style={styles.childrenView}>{children}</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	modalView: {
		position: "absolute",
		width: "101%",
		left: -1,
		height: "60%",
		backgroundColor: COLORS.BLACK,
		borderTopLeftRadius: 30,
		borderTopEndRadius: 30,
		bottom: 0,
		alignItems: "center",
		flex: 1,
		borderColor: COLORS.INACTIVE,
		borderStyle: "solid",
		borderWidth: 1,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	heading: {
		marginVertical: 20,
		fontSize: 22,
		color: COLORS.WHITE,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.GRAY,
	},
	childrenView: {
		flex: 1,
	},
});