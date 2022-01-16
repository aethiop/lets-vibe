import React, { useState } from "react";
import {
	Box,
	Text,
	Pressable,
	SimpleGrid,
	Center,
	ActionSheet,
} from "native-base";
import { Icon } from "../atoms/Icon";
import { Card } from "../atoms/Card";
import { Folder } from "./Folder";
import { File } from "./File";

export const Tree = (props) => {
	const { items, navigation } = props;

	return (
		<>
			<SimpleGrid
				flex={1}
				minChildWidth={60}
				justifyContent={"flex-start"}
				alignContent={"flex-start"}
				spacing={4}
			>
				{items.map((item, key) => {
					const {
						name,
						parent,
						parentPath,
						children,
						path,
						soul,
						type,
					} = item;
					const icon = type === "folder" ? "folder" : "document";

					return type === "folder" ? (
						<Folder
							key={soul}
							soul={soul}
							navigation={navigation}
							icon={icon}
							iconColor="#77A8F1"
						/>
					) : (
						<File
							key={soul}
							soul={soul}
							icon={icon}
							iconColor="#82de8c"
						/>
					);
				})}
			</SimpleGrid>
		</>
	);
};
