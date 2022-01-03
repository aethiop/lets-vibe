import React from "react";
import {
	NavigationHelpersContext,
	useNavigationBuilder,
	TabRouter,
	TabActions,
	createNavigatorFactory,
} from "@react-navigation/native";
import {
	Box,
	VStack,
	Icon,
	HStack,
	Stagger,
	Text,
	useDisclose,
	Pressable,
	useColorModeValue,
	useColorMode,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { PrimaryButton, TransparentButton } from "../atoms/Button";
import { Heading } from "../molecules/Heading";
import { useAuth, useGunState } from "../../hooks/useGun";
import { Container } from "../atoms/Container";

function MenuNavigator({ initialRoute, children, screenOptions }) {
	const { isOpen, onToggle } = useDisclose();
	const { state, navigation, descriptors, NavigationContent } =
		useNavigationBuilder(TabRouter, {
			children,
			screenOptions,
			initialRoute,
		});

	return (
		<NavigationContent>

			<Box
				flex={1}
				_dark={{ bg: "#121212" }}
				_light={{ bg: "light.100" }}
			>
				{state.routes.map((route, i) => {
					const { render, options } = descriptors[route.key];
					return (
						<Container
							key={route.key}
							display={i === state.index ? "flex" : "none"}
							flex={1}
							title={options.title}
							pub={options.pub}
							navigation={navigation}
							icon="notifications-outline"
						>
							{render()}
						</Container>
					);
				})}
				<Box safeAreaBottom position="absolute" bottom={3} left={4}>
					<Box>
						<Box alignItems={"flex-start"} mb={4} ml={2}>
							<Stagger
								visible={isOpen}
								initial={{
									opacity: 0,
									scale: 0,
									translateY: 34,
								}}
								animate={{
									translateY: 0,
									scale: 1,
									opacity: 1,
									transition: {
										type: "spring",
										mass: 0.8,
										stagger: {
											offset: 30,
											reverse: true,
										},
									},
								}}
								exit={{
									translateY: 34,
									scale: 0.8,
									opacity: 0,
									transition: {
										duration: 100,
										stagger: {
											offset: 30,
											reverse: true,
										},
									},
								}}
							>
								{state.routes.map((route, i) => {
									const { key, name } = route;
									const { options } = descriptors[key];
									const isCurrent = i === state.index;

									return (
										<Pressable
											key={key}
											colorScheme={useColorModeValue(
												"gray",
												"white"
											)}
											onPress={() => {
												const event = navigation.emit({
													type: "tabPress",
													target: route.key,
													canPreventDefault: true,
												});

												if (!event.defaultPrevented) {
													navigation.dispatch({
														...TabActions.jumpTo(
															route.name
														),
														target: state.key,
													});
												}
											}}
										>
											<HStack
												py={2}
												borderRadius={"full"}
												bg={
													isCurrent
														? useColorModeValue(
																"#121212",
																"#fff"
														  )
														: "transparent"
												}
												alignItems="center"
												space={4}
												px={4}
											>
												<Ionicons
													name={options.icon}
													size={18}
													color={
														isCurrent
															? useColorModeValue(
																	"#fff",
																	"#121212"
															  )
															: useColorModeValue(
																	"#121212",
																	"#fff"
															  )
													}
												/>
												<Text
													fontWeight={"bold"}
													fontSize={"sm"}
													color={
														isCurrent
															? useColorModeValue(
																	"#fff",
																	"#121212"
															  )
															: isCurrent
															? useColorModeValue(
																	"#fff",
																	"#121212"
															  )
															: useColorModeValue(
																	"#121212",
																	"#fff"
															  )
													}
												>
													{name}
												</Text>
											</HStack>
										</Pressable>
									);
								})}
							</Stagger>
						</Box>
						{state.routes.map((route, i) => {
							const { key, name } = route;
							const { options } = descriptors[key];
							const isCurrent = i === state.index;
							console.log(state.routes)
							if (isCurrent) {
								return (
									<TransparentButton
										key={key}
										icon={options.icon}
										rightIcon={
											state.routes.length > 1 ? (<Icon
												as={
													<Ionicons
														name={"chevron-up"}
													/>
												}
												size="sm"
												color={useColorModeValue(
													"#121212",
													"white"
												)}
											/>) : null
										}
										onPress={onToggle}
									>
										{name}
									</TransparentButton>
								);
							}
						})}
					</Box>
				</Box>
			</Box>
		</NavigationContent>
	);
}
export const createMenuNavigator = createNavigatorFactory(MenuNavigator);
