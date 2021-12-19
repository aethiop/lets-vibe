import React from "react";
import { useAuth } from "../contexts/auth";
import AuthNavigation from "../navigators/AuthNavigation";
import MainNavigation from "../navigators/MainNavigation";

export default function Main() {
	const user = useAuth();
	return user.key ? AuthNavigation() : MainNavigation();
}
