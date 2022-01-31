import React, {
	createContext,
	useContext,
	useMemo,
	useState,
	useEffect,
} from "react";

import { useGunSetState, useAuth } from "./useGun";

export const AuthContext = createContext();
