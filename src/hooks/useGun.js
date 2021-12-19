import Gun from "gun/gun";
import SEA from "gun/sea";

const useGun = () => {
	const gun = Gun({
		peers: ["http://localhost:8765/gun"],
	});
	//App namespace
	const app = gun.get("jot");
	const user = gun.user().recall({ sessionStorage: true });
	return { gun, app, user, SEA };
};
export default useGun;
