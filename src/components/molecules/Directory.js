import React from "react";
import { useFile } from "../../contexts/file";
// create directory from filecontext
export const Directory = () => {
	const { userDirectory } = useFile();
	console.log(userDirectory);
	return (
		<div>
			{/* <Text>Directory</Text>
            <ul>
                {userDirectory.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul> */}
		</div>
	);
};
